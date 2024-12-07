const { admin, db } = require('./firebase');

// Create a Room
async function createRoom(roomId, displayName, users, categories) {
    await db.collection('rooms').doc(roomId).set({
        displayName, // Display name for the room
        users, // Array of user email references
        categories, // Array of category document references
    });
    console.log(`Room ${roomId} created with display name "${displayName}".`);
}

// Create a User
async function createUser(email, displayName, photoURL, myRooms) {
    await db.collection('users').doc(email).set({
        displayName,
        photoURL,
        myRooms, // Array of room document references
    });
    console.log(`User ${email} created.`);
}

// Create a Category
async function createCategory(categoryId, categoryName, channels) {
    await db.collection('categories').doc(categoryId).set({
        categoryName,
        channels, // Array of channel document references
    });
    console.log(`Category ${categoryId} created.`);
}

// Create a Channel
async function createChannel(categoryId, channelId, channelName, messages) {
    const categoryRef = db.collection('categories').doc(categoryId);
    await categoryRef.collection('channels').doc(channelId).set({
        channelName,
        messages, // Array of message document references
    });
    console.log(`Channel ${channelId} created under Category ${categoryId}.`);
}

// Create a Message
async function createMessage(categoryId, channelId, messageId, user, timestamp, content) {
    const channelRef = db.collection('categories').doc(categoryId).collection('channels').doc(channelId);
    await channelRef.collection('messages').doc(messageId).set({
        user, // User email reference
        timestamp,
        content,
    });
    console.log(`Message ${messageId} created in Channel ${channelId}.`);
}

// Create a Permission
async function createPermission(permissionId, permissionName) {
    await db.collection('permissions').doc(permissionId).set({
        permissionName,
    });
    console.log(`Permission ${permissionId} created.`);
}

async function modifyUserToAddRoom(email, roomId) {
    try {
        // Reference to the user document
        const userRef = db.collection('users').doc(email);

        // Get the current user data
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            console.log(`User with email ${email} does not exist.`);
            return;
        }

        // Get the current list of rooms and add the new room if not already present
        const userData = userDoc.data();
        const myRooms = userData.myRooms || [];

        if (!myRooms.includes(roomId)) {
            myRooms.push(roomId); // Add the room
            await userRef.update({ myRooms });
            console.log(`Room ${roomId} added to user ${email}.`);
        } else {
            console.log(`Room ${roomId} already exists for user ${email}.`);
        }
    } catch (error) {
        console.error('Error updating user record:', error);
    }
}

// Sample Data Population
async function populateSampleData() {
    const me = "salcasalena@gmail.com";
    const roomId = "room1";
    const roomDisplayName = "Team Room";
    const categoryId = "category1";
    const channelId = "channel1";
    const messageId = "message1";
    const userEmail = "user@example.com";

    await createUser(userEmail, "John Doe", "https://example.com/photo.jpg", [roomId]);
    await createRoom(roomId, roomDisplayName, [userEmail, me], [categoryId]);
    await createCategory(categoryId, "General", [channelId]);
    await createChannel(categoryId, channelId, "General Chat", [messageId]);
    await createMessage(categoryId, channelId, messageId, userEmail, admin.firestore.FieldValue.serverTimestamp(), "Hello World!");
    await createPermission("permission1", "Admin Access");
    await modifyUserToAddRoom(me, roomId);
}

// Run the script
populateSampleData().catch(console.error);
