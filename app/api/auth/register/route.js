import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req) {
    const body = await req.json();
    const { email, username, password } = body;
    const emailRegex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/);
    const UsernameRegex = new RegExp(/^[a-zA-Z0-9_]{3,}$/);
    if (!emailRegex.test(email) && !UsernameRegex.test(username)) {
        return NextResponse.json({ error: "Invalid email and username" }, { status: 400 })
    }
    try {
        await connectToDB();
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
    const userExists = await User.findOne({ $or: [{ "email": email }, { "username": username }] });
    if (userExists) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }
    const user = await User.create({ email, username, password });
    if (!user) {
        return NextResponse.json({ error: "User not created" }, { status: 500 })
    }
    return NextResponse.json({ message: "User created" }, { status: 201 })


}
