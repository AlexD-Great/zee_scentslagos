const { db } = require('../config/firebase');

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.uid;
        const doc = await db.collection('wishlists').doc(userId).get();

        if (!doc.exists) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(doc.data());
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Failed to fetch wishlist' });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId } = req.body;

        // Verify product exists and get basic data
        const productDoc = await db.collection('products').doc(productId).get();
        if (!productDoc.exists) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productData = productDoc.data();

        const wishlistItem = {
            id: productId,
            name: productData.name,
            price: productData.price,
            image: productData.images?.[0] || null,
            addedAt: new Date().toISOString()
        };

        const wishlistRef = db.collection('wishlists').doc(userId);
        const doc = await wishlistRef.get();

        let items = [];
        if (doc.exists) {
            items = doc.data().items || [];
            // Prevent duplicates
            if (items.some(item => item.id === productId)) {
                return res.status(200).json({ message: 'Item already in wishlist', items });
            }
        }

        items.push(wishlistItem);
        await wishlistRef.set({ items, updatedAt: new Date().toISOString() });

        res.status(200).json({ message: 'Added to wishlist', items });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Failed to add to wishlist' });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId } = req.params;

        const wishlistRef = db.collection('wishlists').doc(userId);
        const doc = await wishlistRef.get();

        if (!doc.exists) return res.status(200).json({ items: [] });

        let items = doc.data().items || [];
        items = items.filter(item => item.id !== productId);

        await wishlistRef.update({ items, updatedAt: new Date().toISOString() });

        res.status(200).json({ message: 'Removed from wishlist', items });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ message: 'Failed to remove from wishlist' });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist
};
