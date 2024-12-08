const { admin, db } = require('./firebase');

async function deleteCollection(collectionPath, batchSize = 100) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();

  if (snapshot.empty) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

async function clearTestData() {
  try {
    // Delete collections and their subcollections
    await deleteCollection('rooms');
    await deleteCollection('users');
    await deleteCollection('categories');
    await deleteCollection('permissions');
    console.log('Test data cleared successfully.');
  } catch (error) {
    console.error('Error clearing test data:', error);
  }
}

// Run the script
clearTestData().catch(console.error);
