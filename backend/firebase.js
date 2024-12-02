const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your downloaded key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://(default).firebaseio.com" // Replace with your Firebase project URL
});

const db = admin.firestore(); // Use Firestore for data storage
module.exports = { admin, db };
