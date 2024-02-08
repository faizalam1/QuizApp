import Course from "@models/course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role != "admin") {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const body = await req.json();
    const { id, name, description, organization, tags, examPrice, examDuration, examQuestions, examPassingPercentage, examLink, isTestAvailable } = body;
    console.log(body);
    let tagsList = tags.split(",");
    let examDurationSeconds = examDuration.split(":");
    examDurationSeconds = parseInt(examDurationSeconds[0]) * 60 * 60 + parseInt(examDurationSeconds[1]) * 60 + parseInt(examDurationSeconds[2]);
    try {
        connectToDB();
        const course = await Course.findOneAndUpdate({ id: id }, { id, name, description, organization, tags: tagsList, examPrice, examDuration: examDurationSeconds, examQuestions, examPassingPercentage, examLink, isTestAvailable }, { new: true });
        console.log(course);
        if (!course)
            return NextResponse.json({ error: "Course not updated" }, { status: 500 })
        return NextResponse.json({ message: "Course updated" }, { status: 200 })
    }
    catch (error) {
        console.error(error);
        if (error._message == "Course validation failed")
            return NextResponse.json({ error: "Invalid input" }, { status: 400 })
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
}