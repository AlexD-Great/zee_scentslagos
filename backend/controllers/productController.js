const { db } = require('../config/firebase');

const getProducts = async (req, res) => {
    try {
        const productsRef = db.collection('products');
        const snapshot = await productsRef.get();

        if (snapshot.empty) {
            return res.status(200).json({ products: [] });
        }

        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('products').doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Basic validation
        if (!productData.name || !productData.price) {
            return res.status(400).json({ message: 'Name and Price are required' });
        }

        const docRef = await db.collection('products').add({
            ...productData,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ id: docRef.id, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        await db.collection('products').doc(id).update(updates);

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection('products').doc(id).delete();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
