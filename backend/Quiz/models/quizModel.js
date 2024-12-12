const path = require("path");
const { db } = require(path.resolve(__dirname, "../shared/database"));

// Fetching quiz questions from the Firestore database
exports.fetchQuizQuestions = async () => {
    try {
        const questions = [];
        const snapshot = await db.collection("quiz_questions").get();

        snapshot.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
        });

        // Return all quiz questions
        return questions;
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

// Evaluating quiz answers and calculating score
exports.evaluateQuizAnswers = async (submittedAnswers) => {
    try {
        let score = 0;
        const correctAnswers = await db.collection("quiz_answers").get();

        correctAnswers.forEach((doc) => {
            // Check if the submitted answer matches the correct answer
            if (submittedAnswers[doc.id] === doc.data().answer) {
                score += 10; // Increment score for correct answer
            }
        });

        // Return score and whether the user passed
        return { score, passed: score >= 80 }; // Consider adjusting pass score if needed
    } catch (error) {
        console.error("Error evaluating quiz answers:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

// You can also add additional utility methods to handle user data, track attempts, etc.
