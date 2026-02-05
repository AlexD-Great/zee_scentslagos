const { db } = require('../config/firebase');
const admin = require('../config/firebase');

const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviewsSnapshot = await db.collection('reviews')
            .where('productId', '==', productId)
            .orderBy('createdAt', 'desc')
            .get();

        const reviews = [];
        reviewsSnapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};

const createReview = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId } = req.params;
        const { rating, comment, userName } = req.body;

        const review = {
            userId,
            productId,
            userName: userName || 'Anonymous',
            rating: Number(rating),
            comment,
            createdAt: new Date().toISOString()
        };

        // Add review
        const reviewRef = await db.collection('reviews').add(review);

        // Update product rating stats
        const productRef = db.collection('products').doc(productId);

        await db.runTransaction(async (t) => {
            const doc = await t.get(productRef);
            if (!doc.exists) return;

            const data = doc.data();
            const currentCount = data.reviewCount || 0;
            const currentRating = data.rating || 0;

            const newCount = currentCount + 1;
            const newRating = ((currentRating * currentCount) + rating) / newCount;

            t.update(productRef, {
                reviewCount: newCount,
                rating: Number(newRating.toFixed(1))
            });
        });

        res.status(201).json({ id: reviewRef.id, ...review });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review' });
    }
};

const updateReview = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        const reviewRef = db.collection('reviews').doc(reviewId);
        const doc = await reviewRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await reviewRef.update({
            rating: Number(rating),
            comment,
            updatedAt: new Date().toISOString()
        });

        // Note: Recalculating average rating efficiently usually requires aggregation or keeping a running total.
        // For simplicity in this demo, we aren't deeply recalculating the average on update, 
        // but a production app should trigger a generic "recalculate product stats" function here.

        res.status(200).json({ message: 'Review updated' });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Failed to update review' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { reviewId } = req.params;

        const reviewRef = db.collection('reviews').doc(reviewId);
        const doc = await reviewRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const reviewData = doc.data();
        if (reviewData.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await reviewRef.delete();

        // Decrement product stats
        const productRef = db.collection('products').doc(reviewData.productId);
        await db.runTransaction(async (t) => {
            const pDoc = await t.get(productRef);
            if (!pDoc.exists) return;

            const data = pDoc.data();
            const currentCount = data.reviewCount || 1;
            const currentRating = data.rating || 0;

            if (currentCount <= 1) {
                t.update(productRef, { reviewCount: 0, rating: 0 });
            } else {
                const newCount = currentCount - 1;
                // Reverse engineering the average: (Total - Removed) / NewCount
                const newRating = ((currentRating * currentCount) - reviewData.rating) / newCount;
                t.update(productRef, {
                    reviewCount: newCount,
                    rating: Number(newRating.toFixed(1))
                });
            }
        });

        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
};

module.exports = {
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview
};
