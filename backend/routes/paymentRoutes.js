const express = require('express');
const router = express.Router();
const {
    initializePaystack,
    verifyPaystack,
    generateReceipt
} = require('../controllers/paymentController');

router.post('/paystack/initialize', initializePaystack);
router.get('/paystack/verify/:reference', verifyPaystack);
router.get('/receipt/:orderId', generateReceipt);

module.exports = router;
