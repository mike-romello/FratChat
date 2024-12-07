let axios = require("axios");
let express = require("express");
let { admin, db } = require("./firebase"); // Assuming firebase.js is in the same directory
let app = express();
let apiFile = require("./env.json");
let port = 3000;
let hostname = "localhost";
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:4200',
}));
app.use(express.json());
app.use(express.static("public"));

// POST: Create an account
app.post("/accounts", async (req, res) => {
  const { displayName, email, photoURL } = req.body;

  if (!displayName || !email || !photoURL) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  try {
    const userDoc = await db.collection("users").doc(email).get();

    if (userDoc.exists) {
      console.log(`Account already exists for email: ${email}`);
      return res.status(200).json({ success: false, message: "Account already exists." });
    }

    await db.collection("users").doc(email).set({
      displayName,
      email,
      photoURL,
      myRooms: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Account created successfully for email: ${email}`);
    res.status(201).json({ success: true, message: "Account created successfully." });
  } catch (error) {
    console.error("Error handling POST /accounts:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Get account details
app.get("/accounts", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, error: "Email query parameter is required." });
  }

  try {
    const userDoc = await db.collection("users").doc(email).get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const userData = userDoc.data();

    res.status(200).json({
      success: true,
      data: {
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        roomPks: userData.myRooms || [],
      },
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}, allowing CORS for http://localhost:4200`);
});
