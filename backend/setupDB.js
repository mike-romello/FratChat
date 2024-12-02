const express = require('express');
const { admin, db } = require('./firebase');
const app = express();

app.use(express.json());

app.post('/save-user', async (req, res) => {
    const { uid, email, displayName } = req.body;

    try {
        await db.collection('users').doc(uid).set({
            email,
            displayName,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});
