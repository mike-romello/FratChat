// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN0qdEQAKWmMnh7G0df5njSjaKSTyYgfI",
  authDomain: "fratchat-9f156.firebaseapp.com",
  projectId: "fratchat-9f156",
  storageBucket: "fratchat-9f156.firebasestorage.app",
  messagingSenderId: "261943926955",
  appId: "1:261943926955:web:0cc999cfd9a2b7c56b57ee",
  measurementId: "G-4YQ4X5N2XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// setupDB.js script for Node.js using pg module (PostgreSQL)
const fs = require('fs');
const { Client } = require('pg');

// Load environment variables from env.json
const env = JSON.parse(fs.readFileSync('./env.json', 'utf-8'));

// Create a PostgreSQL client
const client = new Client({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

// Function to run setup.sql
async function setupDatabase() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to the database successfully.');

    // Read setup.sql file
    const sql = fs.readFileSync('./setup.sql', 'utf-8');

    // Execute the SQL script
    await client.query(sql);
    console.log('Database setup completed successfully.');
  } catch (err) {
    console.error('Error setting up the database:', err);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Database connection closed.');
  }
}

// Run the setup function
setupDatabase();