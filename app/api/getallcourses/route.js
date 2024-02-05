import Course from "@models/course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    try {
        await connectToDB();
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
    try {
        const courses = await Course.aggregate([{
            $group: {
                _id: "$organization",
                courses: { $push: "$$ROOT" }
            }
        }]
        )
        return NextResponse.json({ courses }, { status: 200 })
    }
    catch (error) {
        console.error(error);
        try{
            const courses = await Course.find({});
            if (courses.length == 0) {
                return NextResponse.json({ error: "No courses found" }, { status: 404 })
            }
            return NextResponse.json({ courses, error: "Cannot group by organization" }, { status: 500 })
        }
        catch(error){
            console.error(error);
            return NextResponse.json({ error: "Database connection error" }, { status: 500 })
        }
    }
}