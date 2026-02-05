const { db } = require('../config/firebase');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const orderData = req.body;

        const newOrder = {
            ...orderData,
            userId,
            createdAt: new Date().toISOString(),
            status: 'pending',
            history: [
                { status: 'pending', timestamp: new Date().toISOString(), note: 'Order placed' }
            ]
        };

        const docRef = await db.collection('orders').add(newOrder);

        // Clear cart after order creation if it came from cart
        await db.collection('carts').doc(userId).delete();

        res.status(201).json({ id: docRef.id, ...newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.user.uid;
        const ordersSnapshot = await db.collection('orders')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        const orders = [];
        ordersSnapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { id } = req.params;

        const doc = await db.collection('orders').doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = doc.data();
        // Security check: ensure order belongs to user
        if (order.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to order' });
        }

        res.status(200).json({ id: doc.id, ...order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

const trackOrder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { id } = req.params;

        const doc = await db.collection('orders').doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = doc.data();
        if (order.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json({
            status: order.status,
            history: order.history || [],
            estimatedDelivery: order.estimatedDelivery
        });
    } catch (error) {
        console.error('Error tracking order:', error);
        res.status(500).json({ message: 'Failed to track order' });
    }
}

const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { id } = req.params;

        const orderRef = db.collection('orders').doc(id);
        const doc = await orderRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = doc.data();
        if (order.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({ message: 'Order cannot be cancelled' });
        }

        const update = {
            status: 'cancelled',
            history: [...(order.history || []), {
                status: 'cancelled',
                timestamp: new Date().toISOString(),
                note: 'Cancelled by user'
            }]
        };

        await orderRef.update(update);
        res.status(200).json({ message: 'Order cancelled successfully', status: 'cancelled' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Failed to cancel order' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    trackOrder,
    cancelOrder
};
