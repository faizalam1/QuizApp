import Course from "@models/course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req,res) {
    const session = await getServerSession(authOptions);
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
        const course = await Course.findOne({"id": id});
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