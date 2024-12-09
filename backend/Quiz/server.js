const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://your-database-name.firebaseio.com'
});

app.use(cors());
app.use(bodyParser.json());
app.use('/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Quiz server running on port ${PORT}`);
});
