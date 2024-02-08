"use client"
import { useState, useEffect } from 'react';

const Question = ({ index, question, handleAnswer }) => {
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        handleAnswer(index, answers);
    }, [answers]);
    if (question.questionType === "single") {
        return (
            <div>
                Question {index+1}
                <form >
                    <p>{question.question}</p>
                    <div>
                        {question.options.map((option, i) => (
                            <div key={i}>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option}
                                    onChange={() => setAnswers([option])}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    }
    else if (question.questionType === "multiple") {
        return (
            <div>
                Question {index+1}
                <form >
                    <p>{question.question}</p>
                    <div>
                        {question.options.map((option, i) => (
                            <div key={i}>
                                <input
                                    type="checkbox"
                                    name={`question${index}`}
                                    value={option}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAnswers([...answers, option]);
                                        }
                                        else {
                                            setAnswers(answers.filter((answer) => answer !== option));
                                        }
                                    }}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    }
}

export default Question