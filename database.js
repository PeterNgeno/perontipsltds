const admin = require("firebase-admin");

// Ensure that the correct path to firebase.json is used
const serviceAccount = require(path.resolve(__dirname, "../../firebase.json")); // Adjust the path as needed

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://perontipsltd-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
module.exports = { db };
