import Course from "@models/course";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { connectToDB } from "@utils/database";
import EditCourseForm from "@components/EditCourseForm";


const editCourse = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/auth");
  }
  if (!searchParams.course_id) {
    return (
      <div>
        <h1 className="mb-2 font-bold text-xl">Edit Course:</h1>
        <p className="text-red-500 bg-red-100 p-4 rounded-3xl">Course ID not provided</p>
      </div>
    )
  }
  let course = null;
  try{
    await connectToDB();
    course = await Course.findOne({"id": searchParams.course_id});
  }
  catch(err){
    console.log(err);
  }
  if (!course) {
    return (
      <div>
        <h1 className="mb-2 font-bold text-xl">Edit Course:</h1>
        <p className="text-red-500 bg-red-100 p-4 rounded-3xl">Course not found</p>
      </div>
    )
  }
  return (
    <div className="w-full">
      <h1 className="mb-2 font-bold text-xl">Edit Course:</h1>
      <p>Course ID: {searchParams.course_id}</p>
      <EditCourseForm course_id={searchParams.course_id} />
    </div>
  )
}

export default editCourse;
