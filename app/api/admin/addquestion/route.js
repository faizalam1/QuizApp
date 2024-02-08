import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Question from "@models/question";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role != "admin") {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const body = await req.json();
    const { courseID, question, questionType, options }= body;
    try {
        connectToDB();
        const questionObj = await Question.create({ courseID, question, questionType, options });
        if (!questionObj)
            return NextResponse.json({ error: "Question not created" }, { status: 500 })
        return NextResponse.json({ message: "Question created" }, { status: 201 })
    }
    catch (error) {
        console.error(error);
        if (error._message == "Question validation failed")
            return NextResponse.json({ error: "Invalid input" }, { status: 400 })
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
}