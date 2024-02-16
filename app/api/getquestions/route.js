import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Question from "@models/question";
import Course from "@models/course";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const searchParams = req.nextUrl.searchParams;
    if (!searchParams.has('course_id')) {
        return NextResponse.json({ error: "No course ID provided" }, { status: 400 })
    }
    const course_id = searchParams.get('course_id');
    try {
        await connectToDB();
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
    try {
        const course = await Course.findOne({ "id": course_id });
        if (!course) {
            return NextResponse.json({ error: `Course ${course_id} not found` }, { status: 404 })
        }
        console.log(course);
        const questions = await Question.aggregate([
            { $match: { courseID: course_id } },
            { $sample: { size: course.examQuestions } },
            {
                $project: {
                    _id: 1,
                    question: 1,
                    questionType: 1,
                    options: {
                        $map: {
                            input: "$options", as: "option", in: {
                                "id": "$$option._id",
                                "option": "$$option.option"
                            }
                        },
                    }
                }
            }
        ]);
        return NextResponse.json(questions, { status: 200 })
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
}