"use client";
import { useEffect, useState } from 'react';
import AddOption from './AddOption';

const AddQuestionForm = () => {
    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("single");
    const [options, setOptions] = useState([]);
    const [optionNumber, setOptionNumber] = useState(1);
    const addOption = (option, isCorrect, optionNumber) => {
        let newOptions = options.slice(0, optionNumber);
        newOptions[optionNumber-1] = {
            option: option,
            isCorrect: isCorrect,
        }
        setOptions(newOptions);
    }
    const optionList = [];
    for (let i = 1; i <= optionNumber; i++) {
        optionList.push(<AddOption key={i} optionNumber={i} addOption={addOption} />)
    }
    useEffect(() => {
        for (let i = optionList.length - 1; i <= optionNumber; i++) {
            optionList.push(<AddOption key={i} optionNumber={i} addOption={addOption} />)
        }
    }, [optionNumber])




    return (
        <div className='w-full flex flex-col justify-center mt-16'>
            <form className="space-y-6 lg:mx-60 md:mx-40" method="POST">
                <div className="flex flex-col mb-2">
                    <label htmlFor="question">
                        Question:
                    </label> <br />
                    <textarea className="p-2 m-2" name="question" placeholder="Question" value={question.question} onChange={e => setQuestion({ ...question, question: e.target.value })} />
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="questionType">
                        Question Type:
                    </label> <br />
                    <select className="p-2 m-2" name="questionType" title="Question Type" value={question.questionType} onChange={e => setQuestionType(e.target.value)}>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="optionNumber">
                        Total Option Numbers:
                    </label>
                    <input className="p-2 m-2" type="number" name="optionNumber" placeholder="Option Number" value={optionNumber} onChange={e => setOptionNumber(e.target.value)} />
                </div>

                <div className="flex flex-col mb-2">
                    {optionList}
                </div>
                <button className="p-2 m-2" type="submit" onClick={
                    (e) =>
                    {
                        e.preventDefault();
                        console.log(question);
                        console.log(questionType);
                        console.log(optionNumber);
                        console.log(options);
                    }
                }>
                    Submit
                </button>
            </form>
        </div>
    )

};

export default AddQuestionForm;