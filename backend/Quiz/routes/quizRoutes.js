const express = require("express");
const { getQuestions, submitAnswers } = require("../controllers/quizController");

const router = express.Router();

// Route to fetch quiz questions
router.get("/questions", getQuestions);

// Route to submit answers
router.post("/submit", submitAnswers);

module.exports = router;
