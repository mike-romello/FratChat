const { admin, db } = require('./firebase');

async function clearMessages() {
  try {
    console.log("Starting to clear all messages...");

    // Query all channels in Firestore using a collection group query
    const channelsSnapshot = await db.collectionGroup('channels').get();

    if (channelsSnapshot.empty) {
      console.log("No channels found.");
      return;
    }

    // Iterate over all channels
    for (const channelDoc of channelsSnapshot.docs) {
      const channelRef = channelDoc.ref;

      // Access the 'messages' subcollection of the current channel
      const messagesSnapshot = await channelRef.collection('messages').get();

      if (messagesSnapshot.empty) {
        console.log(`No messages found in channel ${channelDoc.id}`);
        continue;
      }

      console.log(`Deleting messages from channel: ${channelDoc.id}`);

      // Delete all messages in the current channel
      const batch = db.batch();
      messagesSnapshot.docs.forEach((messageDoc) => {
        batch.delete(messageDoc.ref);
      });

      // Commit the batch
      await batch.commit();
      console.log(`Messages cleared from channel: ${channelDoc.id}`);
    }

    console.log("All messages have been cleared successfully.");
  } catch (error) {
    console.error("Error clearing messages:", error);
  }
}

// Run the script
clearMessages().catch(console.error);
