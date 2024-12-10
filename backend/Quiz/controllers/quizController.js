const { fetchQuizQuestions, evaluateQuizAnswers } = require("../models/quizModel");

exports.getQuestions = async (req, res) => {
    try {
        const questions = await fetchQuizQuestions();
        res.status(200).json({ success: true, questions });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to load questions." });
    }
};

exports.submitAnswers = async (req, res) => {
    const { answers } = req.body;

    try {
        const result = await evaluateQuizAnswers(answers);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to evaluate answers." });
    }
};
