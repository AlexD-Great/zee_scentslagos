const { db } = require('../config/firebase');

const getCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const cartRef = db.collection('carts').doc(userId);
        const doc = await cartRef.get();

        if (!doc.exists) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(doc.data());
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId, quantity } = req.body;

        // Fetch product details to store snapshot in cart
        const productDoc = await db.collection('products').doc(productId).get();
        if (!productDoc.exists) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productData = productDoc.data();
        const cartItem = {
            id: productId, // Use product ID as item ID for simplicity in merging
            product: {
                id: productId,
                name: productData.name,
                price: productData.price,
                images: productData.images || []
            },
            quantity: parseInt(quantity),
            price: productData.price
        };

        const cartRef = db.collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        let items = [];
        if (cartDoc.exists) {
            items = cartDoc.data().items || [];
            const existingItemIndex = items.findIndex(item => item.product.id === productId);

            if (existingItemIndex > -1) {
                items[existingItemIndex].quantity += quantity;
            } else {
                items.push(cartItem);
            }
        } else {
            items = [cartItem];
        }

        await cartRef.set({ items, updatedAt: new Date().toISOString() });
        res.status(200).json(cartItem); // Return the added/updated item
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { itemId } = req.params;
        const { quantity } = req.body;

        const cartRef = db.collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        if (!cartDoc.exists) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let items = cartDoc.data().items || [];
        const itemIndex = items.findIndex(item => item.product.id === itemId || item.id === itemId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                items[itemIndex].quantity = quantity;
            } else {
                items.splice(itemIndex, 1);
            }
            await cartRef.update({ items, updatedAt: new Date().toISOString() });
            res.status(200).json({ message: 'Cart updated', items });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }

    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Failed to update cart' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { itemId } = req.params;

        const cartRef = db.collection('carts').doc(userId);
        const cartDoc = await cartRef.get();

        if (!cartDoc.exists) return res.status(200).json({ items: [] });

        let items = cartDoc.data().items || [];
        items = items.filter(item => item.product.id !== itemId && item.id !== itemId);

        await cartRef.update({ items, updatedAt: new Date().toISOString() });
        res.status(200).json({ message: 'Item removed', items });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Failed to remove item' });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        await db.collection('carts').doc(userId).delete();
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
