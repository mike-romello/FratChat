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

// GET: Fetch categories for a specific room
// GET: Fetch categories for a specific room
app.get("/categories", async (req, res) => {
  const roomPk = req.query.roomKey;

  if (!roomPk) {
    return res.status(400).json({ success: false, error: "Room primary key (roomKey) is required." });
  }

  try {
    // Look up the room in Firestore by pk
    const roomDoc = await db.collection("rooms").doc(roomPk).get();

    if (!roomDoc.exists) {
      return res.status(404).json({ success: false, error: "Room not found." });
    }

    // Get the list of category pks from the room data
    const roomData = roomDoc.data();
    const categoryPks = roomData.categories || [];

    if (categoryPks.length === 0) {
      return res.status(200).json({ success: true, categories: [] }); // No categories in the room
    }

    // Fetch category data for each category PK
    const categoryPromises = categoryPks.map(async (categoryPk) => {
      const categoryDoc = await db.collection("categories").doc(categoryPk).get();
      if (categoryDoc.exists) {
        const categoryData = categoryDoc.data();
        const channels = categoryData.channels || []; // List of channel IDs

        // Fetch channel display names for each channel ID
        const channelDetails = await Promise.all(
          channels.map(async (channelId) => {
            const channelDoc = await db
              .collection("categories")
              .doc(categoryPk)
              .collection("channels")
              .doc(channelId)
              .get();

            if (channelDoc.exists) {
              const channelData = channelDoc.data();
              return {
                channelId,
                displayName: channelData.channelName || "Unnamed Channel",
              };
            }
            return { channelId, displayName: "Unknown Channel" }; // Default if channel is missing
          })
        );

        return {
          pk: categoryPk,
          displayName: categoryData.categoryName || "Unnamed Category",
          channels: channelDetails, // Includes both channelId and displayName
        };
      } else {
        console.warn(`Category with pk ${categoryPk} not found.`);
        return null;
      }
    });

    // Resolve all category promises
    const categories = (await Promise.all(categoryPromises)).filter((category) => category !== null);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Fetch all messages for a specific channel
app.get('/messages', async (req, res) => {
  const channelKey = req.query.channelKey;

  if (!channelKey) {
    return res.status(400).json({ success: false, error: 'Channel key (channelKey) is required.' });
  }

  try {
    // Query the specified channel
    const channelQuery = await db.collectionGroup('channels')
      .where('channelID', '==', channelKey)
      .get();

    if (channelQuery.empty) {
      return res.status(404).json({ success: false, error: 'Channel not found.' });
    }

    const channelRef = channelQuery.docs[0].ref;

    // Get all messages for the specified channel
    const messagesSnapshot = await channelRef.collection('messages').get();
    const messages = messagesSnapshot.docs.map((doc) => {
      const messageData = doc.data();

      // Debugging log to identify the issue
      console.log('Message data:', messageData);

      return {
        id: doc.id,
        userPk: messageData.userPk || null, // Default to null if undefined
        content: messageData.content || null, // Default to null if undefined
        timestamp: messageData.timestamp?.toDate?.() || null, // Safely handle Firestore Timestamp
      };
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// POST: Add a new message to a channel
app.post('/messages', async (req, res) => {
  const channelKey = req.query.channelKey; // Query parameter for the channel key
  const { userPk, content } = req.body; // Extract message fields from the body

  if (!channelKey) {
    return res.status(400).json({ success: false, error: 'Channel key (channelKey) is required.' });
  }

  if (!userPk || !content) {
    return res.status(400).json({ success: false, error: 'User key (userPk) and content are required in the request body.' });
  }

  try {
    // Verify the channel exists
    const channelQuery = await db.collectionGroup('channels')
      .where('channelID', '==', channelKey)
      .get();

    if (channelQuery.empty) {
      return res.status(404).json({ success: false, error: 'Channel not found.' });
    }

    // Generate a unique message ID
    const messageID = db.collection('dummy').doc().id; // Firestore auto-generated ID

    // Reference to the first matched channel document
    const channelRef = channelQuery.docs[0].ref;

    // Prepare the new message
    const newMessage = {
      userPk,
      content,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Always use Firestore server timestamp
    };

    // Save the message
    await channelRef.collection('messages').doc(messageID).set(newMessage);

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'Message created successfully.',
      messageID,
    });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}, allowing CORS for http://localhost:4200`);
});
