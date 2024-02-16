"use client";
import { useEffect, useState } from 'react';
import AddOption from './AddOption';
import AddDropdownOption from './AddDropdownOption';

const AddQuestionForm = () => {
    const [courseID, setCourseID] = useState("");
    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("single");
    const [options, setOptions] = useState([]);
    const [optionNumber, setOptionNumber] = useState(1);
    const addOption = (option, isCorrect, optionNumber) => {
        let newOptions = options.slice(0, optionNumber);
        newOptions[optionNumber - 1] = {
            option: option,
            isCorrect: isCorrect,
        }
        setOptions(newOptions);
        console.log(options);
    }
    useEffect(() => {
        if (questionType === "Dropdown") {
            const count = (question.match(/<Select>/g) || []).length;
            setOptionNumber(count);
        }
    }, [question, questionType]);




    return (
        <div className='w-full flex flex-col justify-center mt-16'>
            <form className="space-y-6 lg:mx-60 md:mx-40" method="POST">
                <div className="flex flex-col mb-2">
                    <label htmlFor="courseID">
                        Course ID:
                    </label> <br />
                    <input className="p-2 m-2" name="courseID" placeholder="Course ID" value={courseID} onChange={e => setCourseID(e.target.value)} />
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="question">
                        Question:
                    </label> <br />
                    {questionType === "Dropdown" ? <p className="p-2 m-2">Use {"<Select>"} in question to place a dropdown there.</p> : null}
                    <textarea className="p-2 m-2" name="question" placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="questionType">
                        Question Type:
                    </label> <br />
                    <select className="p-2 m-2" name="questionType" title="Question Type" value={questionType} onChange={e => setQuestionType(e.target.value)}>
                        <option value="Single">Single</option>
                        <option value="Multiple">Multiple</option>
                        <option value="True/False">True/False</option>
                        <option value="Dropdown">Dropdown</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <label htmlFor="optionNumber">
                        Total Option Numbers:
                    </label>
                    <input
                        className="p-2 m-2"
                        type="number"
                        name="optionNumber"
                        placeholder="Option Number"
                        value={optionNumber}
                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                        onChange={e => setOptionNumber(e.target.value)}
                        disabled={questionType === "Dropdown"}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    {Array.from({ length: optionNumber }, (_, i) => (
                        questionType == "Dropdown" ?
                            <AddDropdownOption key={i + 1} optionNumber={i + 1} addOption={addOption} />
                            :
                            <AddOption key={i + 1} optionNumber={i + 1} addOption={addOption} />
                    ))}
                </div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" onClick={
                    async (e) => {
                        e.preventDefault();
                        const res = await fetch('/api/admin/addquestion', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ courseID, question, questionType, options }),
                        });
                        if (res.status == 201)
                            alert('Question added successfully');
                        else if (res.status == 404)
                            alert('Course not found');
                        else if (res.status == 400)
                            alert('Invalid input data Or Question already exists');
                        else
                            alert('Something went wrong');
                    }
                }>
                    Submit
                </button>
            </form>
        </div>

    )

};

export default AddQuestionForm;