const { admin, db } = require('./firebase');

// Create a Room
async function createRoom(roomId, users, categories) {
    await db.collection('rooms').doc(roomId).set({
        users, // Array of user email references
        categories, // Array of category document references
    });
    console.log(`Room ${roomId} created.`);
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

// Sample Data Population
async function populateSampleData() {
    const roomId = "room1";
    const categoryId = "category1";
    const channelId = "channel1";
    const messageId = "message1";
    const userEmail = "user@example.com";

    await createUser(userEmail, "John Doe", "https://example.com/photo.jpg", [roomId]);
    await createRoom(roomId, [userEmail], [categoryId]);
    await createCategory(categoryId, "General", [channelId]);
    await createChannel(categoryId, channelId, "General Chat", [messageId]);
    await createMessage(categoryId, channelId, messageId, userEmail, admin.firestore.FieldValue.serverTimestamp(), "Hello World!");
    await createPermission("permission1", "Admin Access");
}

// Run the script
populateSampleData().catch(console.error);
