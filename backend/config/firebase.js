const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

if (!admin.apps.length) {
    try {
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

        // Check if path is provided and exists
        if (!serviceAccountPath) {
            console.warn('FIREBASE_SERVICE_ACCOUNT_PATH not set in .env');
        } else {
            const absolutePath = path.resolve(serviceAccountPath);
            if (fs.existsSync(absolutePath)) {
                const serviceAccount = require(absolutePath);
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount)
                });
                console.log('Firebase Admin Initialized');
            } else {
                console.error(`Firebase Service Account file not found at: ${absolutePath}`);
            }
        }

    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
