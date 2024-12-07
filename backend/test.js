const { admin, db } = require("./firebase"); // Adjust the path as needed

// Fetch Users
async function fetchUsers() {
  try {
    const usersSnapshot = await db.collection("users").get();
    usersSnapshot.forEach((doc) => {
      console.log(`User ID: ${doc.id}`);
      console.log(doc.data());
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Fetch Rooms
async function fetchRooms() {
  try {
    const roomsSnapshot = await db.collection("rooms").get();
    roomsSnapshot.forEach((doc) => {
      console.log(`Room ID: ${doc.id}`);
      console.log(doc.data());
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

// Fetch Categories
async function fetchCategories() {
  try {
    const categoriesSnapshot = await db.collection("categories").get();
    categoriesSnapshot.forEach((doc) => {
      console.log(`Category ID: ${doc.id}`);
      console.log(doc.data());
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Run Fetch Functions
(async () => {
  console.log("Fetching users...");
  await fetchUsers();
  console.log("Fetching rooms...");
  await fetchRooms();
  console.log("Fetching categories...");
  await fetchCategories();
})();
