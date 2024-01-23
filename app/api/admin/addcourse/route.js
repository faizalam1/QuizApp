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
    let tagsList = tags.split(",");
    let examDurationSeconds = examDuration.split(":");
    console.log(examDurationSeconds)
    examDurationSeconds = parseInt(examDurationSeconds[0]) * 60 * 60 + parseInt(examDurationSeconds[1]) * 60 + parseInt(examDurationSeconds[2]);
    console.log(parseInt(examDurationSeconds[0]) * 60 * 60 + parseInt(examDurationSeconds[1]) * 60 + parseInt(examDurationSeconds[2]))
    console.log(id, name, description, organization, tagsList, examPrice, examDurationSeconds, examQuestions, examPassingPercentage, examLink, isTestAvailable)
    try {
        connectToDB();
        const course = await Course.create({ id, name, description, organization, tags:tagsList, examPrice, examDuration:examDurationSeconds, examQuestions, examPassingPercentage, examLink, isTestAvailable });
        console.log(course);
        if (!course)
            return NextResponse.json({ error: "Course not created" }, { status: 500 })
        return NextResponse.json({ message: "Course created" }, { status: 201 })
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
}