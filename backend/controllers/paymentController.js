const axios = require('axios');
const { db } = require('../config/firebase');
const PDFDocument = require('pdfkit');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const initializePaystack = async (req, res) => {
    try {
        const { email, amount, metadata } = req.body;

        // Convert amount to kobo (Paystack expects amount in lowest currency unit)
        const amountInKobo = amount * 100;

        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amountInKobo,
                metadata,
                callback_url: 'http://localhost:5173/checkout/success' // Frontend callback
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Paystack initialization error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Payment initialization failed' });
    }
};

const verifyPaystack = async (req, res) => {
    try {
        const { reference } = req.params;

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const { status, data } = response.data;

        if (status && data.status === 'success') {
            // Create Order in Firestore
            const orderData = {
                reference,
                amount: data.amount / 100,
                email: data.customer.email,
                items: data.metadata?.items || [],
                status: 'paid',
                paymentMethod: 'paystack',
                createdAt: new Date().toISOString()
            };

            const orderRef = await db.collection('orders').add(orderData);

            // Decrement Inventory (TODO: Implement atomic transaction for inventory)

            res.status(200).json({
                message: 'Payment verification successful',
                orderId: orderRef.id,
                data
            });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Paystack verification error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Payment verification error' });
    }
};

const generateReceipt = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderDoc = await db.collection('orders').doc(orderId).get();

        if (!orderDoc.exists) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orderDoc.data();

        const doc = new PDFDocument();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=receipt-${orderId}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(25).text('Zee Scents Lagos', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text('Purchase Receipt', { align: 'center' });
        doc.moveDown();

        // Order Details
        doc.fontSize(12).text(`Order ID: ${orderId}`);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
        doc.text(`Email: ${order.email}`);
        doc.text(`Payment Reference: ${order.reference}`);
        doc.moveDown();

        // Items Table Header
        doc.text('Items:', { underline: true });
        doc.moveDown();

        // Items
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                doc.text(`${item.name} x ${item.quantity} - ₦${itemTotal.toLocaleString()}`);
            });
        }

        doc.moveDown();
        doc.fontSize(14).text(`Total Amount: ₦${order.amount.toLocaleString()}`, { bold: true });

        // Footer
        doc.moveDown(2);
        doc.fontSize(10).text('Thank you for shopping with Zee Scents Lagos!', { align: 'center' });

        doc.end();

    } catch (error) {
        console.error('Receipt generation error:', error);
        res.status(500).json({ message: 'Error generating receipt' });
    }
};

module.exports = {
    initializePaystack,
    verifyPaystack,
    generateReceipt
};
