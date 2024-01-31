"use client";
import { useEffect, useState } from 'react';
import AddOption from './AddOption';

const AddQuestionForm = () => {
    const questionState = {
        question: "",
        questionType: "single", // single or multiple
    }
    const [question, setQuestion] = useState(questionState);
    const [options, setOptions] = useState([]);
    const [optionNumber, setOptionNumber] = useState(1);
    const addOption = (option, isCorrect, optionNumber) => {
        let newOptions = options;
        newOptions[optionNumber] = {
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
                    <label>
                        Question:
                    </label> <br />
                    <textarea className="p-2 m-2" name="question" placeholder="Question" value={question.question} onChange={e => setQuestion({ ...question, question: e.target.value })} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Question Type:
                    </label> <br />
                    <select className="p-2 m-2" name="questionType" value={question.questionType} onChange={e => setQuestion({ ...question, questionType: e.target.value })}>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Total Option Numbers:
                    </label>
                    <input className="p-2 m-2" type="number" name="optionNumber" placeholder="Option Number" value={optionNumber} onChange={e => setOptionNumber(e.target.value)} />
                </div>

                <div className="flex flex-col mb-2">
                    {optionList}
                </div>
            </form>
        </div>
    )

};

export default AddQuestionForm;