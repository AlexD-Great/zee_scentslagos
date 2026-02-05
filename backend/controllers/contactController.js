const { db } = require('../config/firebase');

const sendMessage = async (req, res) => {
    try {
        // Contact form can be public, no auth required usually, 
        // but if we were strictly following the "Features" list, often these are protected or have captcha.
        // For now assuming public.
        const { name, email, message } = req.body;

        if (!message || !email) {
            return res.status(400).json({ message: 'Email and Message are required' });
        }

        const newMessage = {
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
            read: false
        };

        await db.collection('messages').add(newMessage);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
};

module.exports = {
    sendMessage
};
