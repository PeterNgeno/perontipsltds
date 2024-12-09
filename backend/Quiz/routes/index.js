const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get quiz questions for a section (A-J)
router.get('/:section', quizController.getQuizQuestions);

// Submit quiz answers
router.post('/:section/submit', quizController.submitQuizAnswers);

module.exports = router;
