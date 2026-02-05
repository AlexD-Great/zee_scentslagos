const express = require('express');
const router = express.Router();
const {
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/products/:productId/reviews', getReviewsByProduct);

// Protected routes
router.post('/products/:productId/reviews', verifyToken, createReview);
router.put('/reviews/:reviewId', verifyToken, updateReview);
router.delete('/reviews/:reviewId', verifyToken, deleteReview);

module.exports = router;
