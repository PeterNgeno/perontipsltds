import React, { useEffect, useState } from "react";
import QuizComponent from "../../components/Quiz/QuizComponent";
import { getQuestions, submitAnswers } from "../../utils/api";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        getQuestions().then(setQuestions);
    }, []);

    const handleAnswerChange = (id, value) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleSubmit = async () => {
        const result = await submitAnswers(answers);
        alert(`Your score: ${result.score}`);
    };

    return (
        <div>
            <h1>Quiz Page</h1>
            {questions.map((q) => (
                <QuizComponent key={q.id} question={q} onAnswerChange={handleAnswerChange} />
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default QuizPage;
