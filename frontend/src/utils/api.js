const API_BASE_URL = "http://localhost:5000/api/quiz";

export const getQuestions = async () => {
    const response = await fetch(`${API_BASE_URL}/questions`);
    const data = await response.json();
    return data.questions;
};

export const submitAnswers = async (answers) => {
    const response = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    });
    const data = await response.json();
    return data.result;
};
