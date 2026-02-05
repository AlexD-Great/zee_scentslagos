const express = require('express');
const router = express.Router();
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/', getWishlist);
router.post('/items', addToWishlist);
router.delete('/items/:productId', removeFromWishlist);

module.exports = router;
