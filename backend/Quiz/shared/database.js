const admin = require("firebase-admin");
const path = require("path");

// Correct path to firebase.json
const serviceAccount = require(path.resolve(__dirname, '../../firebase.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://perontipsltd-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();
module.exports = { db };
