import User from "@models/user";
import { connectToDB } from "@utils/database";
export async function POST(req) {
    const body = await req.json();
    const { email, username, password } = body;
    const emailRegex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/);
    const UsernameRegex = new RegExp(/^[a-zA-Z0-9_]{3,}$/);
    if (!emailRegex.test(email) && !UsernameRegex.test(username)) {
        return {
            status: 400,
            body: {
                error: "Invalid email and username",
            },
        };
    }
    try {
        connectToDB();
    }
    catch (error) {
        console.error(error);
        return {
            status: 500,
            body: {
                error: "Internal Server Error",
            },
        };
    }
    const userExists = await User.findOne({ $or: [{ "email": email }, { "username": username }] });
    if (userExists) {
        return {
            status: 409,
            body: {
                error: "User already exists",
            },
        };
    }
    const user = await User.create({ email, username, password });
    if (!user) {
        return {
            status: 500,
            body: {
                error: "Internal Server Error",
            },
        };
    }
    return {
        status: 201,
        body: {
            message: "User created",
        },
    };

}
