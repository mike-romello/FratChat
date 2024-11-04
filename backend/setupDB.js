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