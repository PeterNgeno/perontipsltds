const admin = require('firebase-admin');
const db = admin.firestore();

// Get quiz questions based on section (A-J)
exports.getQuizQuestions = async (req, res) => {
  const section = req.params.section;
  try {
    const questionsSnapshot = await db.collection('quizzes').doc(section).collection('questions').get();
    const questions = [];
    questionsSnapshot.forEach(doc => {
      questions.push(doc.data());
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

// Submit answers and check results
exports.submitQuizAnswers = async (req, res) => {
  const { section, userId, answers } = req.body;
  
  try {
    const correctAnswersSnapshot = await db.collection('quizzes').doc(section).collection('questions').get();
    const correctAnswers = [];
    correctAnswersSnapshot.forEach(doc => {
      correctAnswers.push(doc.data().correctAnswer);
    });
    
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) score++;
    });
    
    // Save the score in Firebase
    await db.collection('users').doc(userId).update({
      [`quizScores.${section}`]: score
    });
    
    // Check if the user scored 100%
    if (score === correctAnswers.length) {
      res.status(200).json({ message: 'You scored 100%! Proceed to the next section.', paymentRequired: false });
    } else {
      res.status(400).json({ message: 'Try again! You did not score 100%.', paymentRequired: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answers', error });
  }
};
