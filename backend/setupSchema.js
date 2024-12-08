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
        channelID: channelId, // Add channelID for easier querying
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

// Modify an existing user to add a room
async function modifyUserToAddRoom(email, roomId) {
    try {
        const userRef = db.collection('users').doc(email);

        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            console.log(`User with email ${email} does not exist.`);
            return;
        }

        const userData = userDoc.data();
        const myRooms = userData.myRooms || [];

        if (!myRooms.includes(roomId)) {
            myRooms.push(roomId);
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
    const roomId = "teamRoom1";
    const roomDisplayName = "Phi Psi";
    const categoryId1 = "generalCategory";
    const categoryId2 = "announcementsCategory";
    const categoryId3 = "randomCategory";
    const userEmail = "user@example.com";
    const me = "salcasalena@gmail.com";

    const channelId1 = "generalChat";
    const channelId2 = "teamUpdates";
    const channelId3 = "importantInfo";
    const channelId4 = "randomTalk";
    const channelId5 = "funMemes";

    const messageId1 = "msg1";

    await createUser(userEmail, "John Doe", "https://example.com/photo.jpg", [roomId]);
    await createRoom(roomId, roomDisplayName, [userEmail, me], [categoryId1, categoryId2, categoryId3]);

    await createCategory(categoryId1, "General", [channelId1, channelId2]);
    await createCategory(categoryId2, "Announcements", [channelId3]);
    await createCategory(categoryId3, "Random", [channelId4, channelId5]);

    await createChannel(categoryId1, channelId1, "General Chat", [messageId1]);
    await createChannel(categoryId1, channelId2, "Team Updates", []);
    await createChannel(categoryId2, channelId3, "Important Info", []);
    await createChannel(categoryId3, channelId4, "Random Talk", []);
    await createChannel(categoryId3, channelId5, "Fun Memes", []);

    await createMessage(
        categoryId1,
        channelId1,
        messageId1,
        userEmail,
        admin.firestore.FieldValue.serverTimestamp(),
        "Welcome to the General Chat!"
    );

    await createPermission("permission1", "Admin Access");
    await modifyUserToAddRoom(me, roomId);

    console.log("Sample data populated successfully.");
}

// Run the script
populateSampleData().catch(console.error);
