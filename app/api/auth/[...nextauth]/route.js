import User from "@models/user";
import { get } from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        emailOrUsername: {},
        password: {}
      },
      async authorize(credentials, req) {
        const { emailOrUsername, password } = credentials;
        //TODO: implement authentication
        const user = await User.findOne({ $or: [{ "email": emailOrUsername }, { "username": emailOrUsername }] });
        if (user && user.password == bcrypt.hash(password, 10)) {
          return {
            id: user._id,
            name: user.username,
            email: user.email
          };
        } else {
          return null;
        }
      }
    }
    )
  ]
}
);

export { authHandler as GET, authHandler as POST };