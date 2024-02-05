"use client";
import { useState, useEffect } from "react";
import CourseCard from "@components/CourseCard";

const CourseList = () => {
    const [coursesByOrganization, setCourses] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch("/api/getallcourses");
            const data = await res.json();
            setCourses(data.courses);
        }
        fetchdata();
    }, []);
    return (
        <div className="w-full">
            {coursesByOrganization.map((organization, index) => (
                <div key={index} className="flex flex-col bg-white rounded-2xl m-12 px-8 py-4 bg-opacity-20">
                    <h2 className="font-bold text-2xl">{organization._id}</h2>
                    <div className="mx-10 flex flex-row flex-wrap justify-between my-2">
                        {organization.courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseList