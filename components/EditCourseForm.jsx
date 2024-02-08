"use client"
import { useState, useEffect } from 'react';

const EditCourseForm = ({ course_id }) => {
    const [course, setCourse] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/getcourse?id=${course_id}`);
            const courseData = await res.json();
            courseData.tags = courseData.tags.join(',');
            let hours = Math.floor(courseData.examDuration / 3600);
            let minutes = Math.floor((courseData.examDuration - hours * 3600) / 60);
            let seconds = courseData.examDuration - hours * 3600 - minutes * 60;
            // courseData.examDuration should have two digits for hours, minutes and seconds
            hours = hours.toString().padStart(2, '0');
            minutes = minutes.toString().padStart(2, '0');
            seconds = seconds.toString().padStart(2, '0');

            courseData.examDuration = `${hours}:${minutes}:${seconds}`;
            setCourse(courseData);
        };
        fetchData();
    }, []);

    console.log(course);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };
    const handleCheckboxChange = () => {
        setCourse((prevCourse) => ({ ...prevCourse, isTestAvailable: !prevCourse.isTestAvailable }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/admin/editcourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });
        if (res.status == 200)
            alert('Course updated successfully');
        else if (res.status == 404)
            alert('Course not found');
        else if (res.status == 400)
            alert('Invalid input data Or Course already exists');
        else
            alert('Something went wrong');
    };

    return (

        <div className='w-full flex flex-col mt-16 ml-8'>
            <form className="space-y-6 w-3/4" method="POST" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2">
                    <label>
                        Course ID:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="id" placeholder="Course ID" value={course.id} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Course Name:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="name" placeholder="Course Name" value={course.name} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Description:
                    </label> <br />
                    <textarea className="p-2 m-2" name="description" placeholder="Description" value={course.description} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Organization:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="organization" placeholder="Organization" value={course.organization} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Tags:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="tags" placeholder="Tags" value={course.tags} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Exam Price (in $):
                    </label> <br />
                    <input className="p-2 m-2" type="number" name="examPrice" placeholder="Exam Price" value={course.examPrice} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Exam Duration:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="examDuration" placeholder="Exam Duration" value={course.examDuration} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Exam Questions:
                    </label> <br />
                    <input className="p-2 m-2" type="number" name="examQuestions" placeholder="Exam Questions" value={course.examQuestions} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Passing Percentage:
                    </label> <br />
                    <input className="p-2 m-2" type="number" name="examPassingPercentage" placeholder="Passing Percentage" value={course.examPassingPercentage} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">
                    <label>
                        Exam Link:
                    </label> <br />
                    <input className="p-2 m-2" type="text" name="examLink" placeholder="Exam Link" value={course.examLink} onChange={handleChange} />
                </div>

                <div className="flex flex-col mb-2">

                    <span>
                        Is Test Available
                        <input className='m-4' type="checkbox" name="isTestAvailable" checked={course.isTestAvailable} onChange={handleCheckboxChange} />
                    </span>
                </div>

                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
            </form >
        </div>


    );
};

export default EditCourseForm;