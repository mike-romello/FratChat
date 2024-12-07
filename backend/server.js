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

// GET: Getting User's Rooms
app.get("/my-rooms", async (req, res) => {
  const userkey = req.query.userkey;

  if (!userkey) {
    return res.status(400).json({ success: false, error: "Userkey (email) is required." });
  }

  try {
    // Look up the user in Firestore by email (userkey)
    const userDoc = await db.collection("users").doc(userkey).get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    // Get the user's room primary keys (pks)
    const userData = userDoc.data();
    const roomPks = userData.myRooms || []; // Default to an empty array if no rooms

    res.status(200).json({ success: true, rooms: roomPks });
  } catch (error) {
    console.error("Error fetching user's rooms:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Fetch room information by primary key (pk)
app.get("/rooms", async (req, res) => {
  const roomPk = req.query.pk;

  if (!roomPk) {
    return res.status(400).json({ success: false, error: "Room primary key (pk) is required." });
  }

  try {
    // Look up the room in Firestore by pk
    const roomDoc = await db.collection("rooms").doc(roomPk).get();

    if (!roomDoc.exists) {
      return res.status(404).json({ success: false, error: "Room not found." });
    }

    // Get room data
    const roomData = roomDoc.data();

    // Extract displayName, users, and categories
    const { displayName, users = [], categories = [] } = roomData;

    res.status(200).json({
      success: true,
      room: {
        roomID: roomPk,
        displayName,
        users,
        categories,
      },
    });
  } catch (error) {
    console.error("Error fetching room information:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});




// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}, allowing CORS for http://localhost:4200`);
});
