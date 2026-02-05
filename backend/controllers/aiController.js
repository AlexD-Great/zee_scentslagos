const axios = require('axios');
const { db } = require('../config/firebase');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const getRecommendations = async (req, res) => {
    try {
        const { history, currentCart } = req.body;

        // 1. Fetch all available products to serve as potential recommendations
        const productsSnapshot = await db.collection('products').where('inStock', '==', true).get();
        const allProducts = [];
        productsSnapshot.forEach(doc => {
            const data = doc.data();
            allProducts.push({ id: doc.id, name: data.name, category: data.category, notes: data.notes, description: data.description });
        });

        if (allProducts.length === 0) {
            return res.status(200).json({ recommendations: [] });
        }

        // 2. Construct Prompt
        const inventoryString = JSON.stringify(allProducts.map(p => ({ id: p.id, name: p.name, notes: p.notes })));
        const userContext = currentCart && currentCart.length > 0
            ? `User has these items in cart: ${JSON.stringify(currentCart.map(c => c.name))}.`
            : 'User is browsing.';

        const prompt = {
            contents: [{
                parts: [{
                    text: `You are a perfume expert.
          Inventory: ${inventoryString}
          Context: ${userContext}
          
          Recommend 3 perfumes from the Inventory that would complement the user's taste or current cart.
          Return ONLY a JSON array of the 3 product IDs. Example: ["id1", "id2", "id3"].
          Do not include markdown formatting or explanations.`
                }]
            }]
        };

        // 3. Call Gemini API
        const response = await axios.post(GEMINI_URL, prompt, {
            headers: { 'Content-Type': 'application/json' }
        });

        const candidate = response.data.candidates[0].content.parts[0].text;

        // Clean up response if it contains markdown code blocks
        const cleanJson = candidate.replace(/```json/g, '').replace(/```/g, '').trim();
        const recommendedIds = JSON.parse(cleanJson);

        // 4. Fetch full product details for recommendations
        const recommendations = allProducts.filter(p => recommendedIds.includes(p.id));

        res.status(200).json({ recommendations });

    } catch (error) {
        console.error('AI Recommendation error:', error.response?.data || error.message);
        // Fallback: return 3 random products
        res.status(200).json({ recommendations: [] });
    }
};

module.exports = {
    getRecommendations
};
