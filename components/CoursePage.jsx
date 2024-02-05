'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CoursePage = ({ courseId }) => {
  const [course, setCourse] = useState({});
  const [tags, setTags] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(`/api/getcourse?id=${courseId}`);
      const data = await res.json();
      setCourse(data);
      setTags(data.tags.join(", "));
    }
    fetchdata();
  },[]);

  return (
    <div className="bg-sky-100 px-12 py-4 rounded-3xl m-12">
      <h1 className='font-bold text-2xl'>{course.name}</h1>
      <p className='indent-8 p-4' dangerouslySetInnerHTML={{ __html : course.description}} />
      <div className="pl-4">
        <p><span className='font-medium'>Organization:</span> {course.organization}</p>
        <p><span className='font-medium'>Tags:</span> {tags}</p>
        <p><span className='font-medium'>Exam Price:</span> ${course.examPrice}</p>
        <p><span className='font-medium'>Exam Duration:</span> {course.examDuration} seconds</p>
        <p><span className='font-medium'>Exam Questions:</span> {course.examQuestions}</p>
        <p><span className='font-medium'>Passing Percentage:</span> {course.examPassingPercentage}%</p>
        {course.isTestAvailable ? (
          <p><span className='font-medium'>Test Available:</span> Yes</p>
        ) : (
          <p><span className='font-medium'>Test Available:</span> No</p>
        )}
        <Link 
          href={course ? "" : course.examLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline cursor-pointer"  
        >
          {course.examLink}
        </Link>
        <br />
        <div className="flex flex-row pt-6 justify-center">
          <Link href={`/courses/${courseId}/mockquiz`} className='flex flex-row justify-center font-medium hover:underline cursor-pointer'>
            <button className="flex flex-row justify-center bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
            <Image src="/assets/icons/test.svg" alt="Take Quiz" width={20} height={20} />
            <div className='ml-2'>Take Test</div>
            </button>
          </Link>
        </div>
        <br />
        <Link href="/courses" className='flex flex-row justify-center p-4 font-medium hover:underline cursor-pointer'>
          <Image src="/assets/icons/back-arrow.svg" alt="Back" width={20} height={20} />
          Back to Courses
        </Link>
      </div>
    </div>
  );
}

export default CoursePage