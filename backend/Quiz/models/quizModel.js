const { db } = require("../shared/database");

exports.fetchQuizQuestions = async () => {
    const questions = [];
    const snapshot = await db.collection("quiz_questions").get();

    snapshot.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() });
    });

    return questions;
};

exports.evaluateQuizAnswers = async (submittedAnswers) => {
    let score = 0;
    const correctAnswers = await db.collection("quiz_answers").get();

    correctAnswers.forEach((doc) => {
        if (submittedAnswers[doc.id] === doc.data().answer) {
            score += 10;
        }
    });

    return { score, passed: score >= 80 };
};
