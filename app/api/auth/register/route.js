import User from "@models/user";
import { connectToDB } from "@utils/database";
export async function POST(req) {
    const body = await req.json();
    const { email, username, password } = body;
    connectToDB();
    const user = await User.create({ email, username, password });
    console.log(user);
    return Response.json({ error: "Not implemented!" });
}
