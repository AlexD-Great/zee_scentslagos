const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    trackOrder,
    cancelOrder
} = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.get('/:id/track', trackOrder);
router.post('/:id/cancel', cancelOrder);

module.exports = router;
