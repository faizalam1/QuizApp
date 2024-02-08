"use client";
import { useEffect, useState } from 'react';
import Question from '@components/Question';

const Questions = ({ courseID }) => {
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch(`/api/getquestions?course_id=${courseID}`);
            const data = await res.json();
            console.log(data);
            setQuestions(data);
        }
        fetchdata();
    }, []);

    const handleAnswer = (index, answer) => {
        setAnswers([...answers.slice(0, index), answer, ...answers.slice(index + 1)]);
    }
    useEffect(() => {
        console.log(answers);
    }, [answers]);

    return (
        <div>
            {questions?.map((question, index) => (
                <Question key={index} index={index} question={question} handleAnswer={handleAnswer} />
            ))}
        </div>
    )
}

export default Questions