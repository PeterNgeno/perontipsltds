import React from "react";

const QuizComponent = ({ question, onAnswerChange }) => (
    <div>
        <h3>{question.text}</h3>
        <input
            type="text"
            placeholder="Type your answer"
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
        />
    </div>
);

export default QuizComponent;
