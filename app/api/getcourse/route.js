import Course from "@models/course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req,res) {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    const searchParams = req.nextUrl.searchParams;
    if(!searchParams.has('id')){
        return NextResponse.json({ error: "No course ID provided" }, { status: 400 })
    }
    const id = searchParams.get('id');
    try {
        await connectToDB();
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
    try {
        const course = await Course.findOne(
            { id: id },
            { _id: 0, id: 1, name: 1, description: 1, organization: 1, tags: 1, examPrice: 1, examDuration: 1, examQuestions: 1, examPassingPercentage: 1, examLink: 1, isTestAvailable: 1 }
        )
        if (!course) {
            return NextResponse.json({ error: `Course ${id} not found` }, { status: 404 })
        }
        return NextResponse.json( course , { status: 200 })
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
}