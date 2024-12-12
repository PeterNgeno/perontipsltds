const admin = require("firebase-admin");
const serviceAccount = require("../../database/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://perontipsltd-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();
module.exports = { db };
