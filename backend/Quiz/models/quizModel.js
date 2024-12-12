const path = require("path");
const { db } = require(path.resolve(__dirname, "../shared/database"));

exports.fetchQuizQuestions = async () => {
    try {
        const questions = [];
        const snapshot = await db.collection("quiz_questions").get();

        snapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
        });

        return questions;
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

exports.evaluateQuizAnswers = async (submittedAnswers) => {
    try {
        let score = 0;
        const correctAnswers = await db.collection("quiz_answers").get();

        correctAnswers.forEach((doc) => {
            if (submittedAnswers[doc.id] === doc.data().answer) {
                score += 10;
            }
        });

        return { score, passed: score >= 80 };
    } catch (error) {
        console.error("Error evaluating quiz answers:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};
