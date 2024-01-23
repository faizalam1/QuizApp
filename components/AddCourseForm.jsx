"use client"
import { useState } from 'react';

const AddCourse = ({ updateCourse }) => {
  const [course, setCourse] = useState({
    id: '',
    name: '',
    description: '',
    organization: '',
    tags: 'tag1,tag2,tag3',
    examPrice: 0,
    examDuration: "02:30:00",
    examQuestions: 0,
    examPassingPercentage: 70,
    examLink: '',
    isTestAvailable: false,
  });
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
    const res = await fetch('/api/admin/addcourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    const data = await res.json();
    alert(data);
  };

  return (

    <div className='w-full flex flex-col justify-center mt-16'>
      <form className="space-y-6 lg:mx-60 md:mx-40" method="POST" onSubmit={handleSubmit}>
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

        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
      </form >
    </div>


  );
};

export default AddCourse;