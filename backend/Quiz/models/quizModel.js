const admin = require('firebase-admin');
const db = admin.firestore();

// Define a Quiz data model
const Quiz = {
  getQuestions: async (section) => {
    const snapshot = await db.collection('quizzes').doc(section).collection('questions').get();
    const questions = [];
    snapshot.forEach(doc => {
      questions.push(doc.data());
    });
    return questions;
  },
  
  saveAnswer: async (userId, section, answer) => {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({ [`quizScores.${section}`]: answer });
  }
};

module.exports = Quiz;
