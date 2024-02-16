"use client"
import { useState, useEffect } from 'react';

const Question = ({ index, question, handleAnswer }) => {
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        handleAnswer(index, answers, question._id);
    }, [answers])
    if (question.questionType === "Single") {
        return (
            <div>
                Question {index + 1}
                <form >
                    <p>{question.question}</p>
                    <div>
                        {question.options.map((option, i) => (
                            <div key={i}>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option.option}
                                    onChange={() => setAnswers([option.option])}
                                />
                                <label>{option.option}</label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    }
    else if (question.questionType === "Multiple") {
        return (
            <div>
                Question {index + 1}
                <form >
                    <p>{question.question}</p>
                    <div>
                        {question.options.map((option, i) => (
                            <div key={i}>
                                <input
                                    type="checkbox"
                                    name={`question${index}`}
                                    value={option.option}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAnswers([...answers, option.option]);
                                        }
                                        else {
                                            setAnswers(answers.filter((answer) => answer !== option.option));
                                        }
                                    }}
                                />
                                <label>{option.option}</label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        )
    }
    else if (question.questionType === "True/False") {
        return (
            <div>
                Question {index + 1}
                <form >
                    <p>{question.question}</p>
                    <div className='flex flex-row space-x-4'>
                        <p className='w-3/4'>Statements</p>
                        <p>True</p>
                        <p>False</p>
                    </div>
                    {question.options.map((option, i) => (
                        <div key={i} className='flex flex-row space-x-8'>
                            <p className='w-3/4'>{option.option}</p>
                            <input
                                type="radio"
                                name={`question${index}Option${i}`}
                                onClick={() => setAnswers({...answers, [option.id] : true})}
                            />
                            <input
                                type="radio"
                                name={`question${index}Option${i}`}
                                value={option.option}
                                onClick={() => setAnswers({...answers, [option.id]: false})}
                            />
                        </div>
                    ))}
                </form>
            </div>
        )
    }
    else if (question.questionType === "Dropdown") {
        // const selectElements = q.options.map((op) => {
        //     let temp = "<select>";
        //     temp += op.option.map((o) => {
        //         return `<option value=${o}>${o}</option>`;
        //     }).join(""); // Join the individual option elements
        //     temp += "</select>";
        //     return temp;
        // });
    }
}

export default Question