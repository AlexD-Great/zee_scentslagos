const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api', require('./routes/reviewRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.use('/api/ai', require('./routes/aiRoutes'));
app.get('/', (req, res) => {
    res.send('Zee Scents Backend is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
