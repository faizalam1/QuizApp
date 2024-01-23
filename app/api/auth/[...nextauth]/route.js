import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({token, user, account, profile}) {
      if (user)
        return {...token,user,account,profile}
      else
        return {...token}
    },
    async session({ session, token }){
      if (Date.now() / 1000 > token?.accessTokenExpires && token?.refreshTokenExpires && Date.now() / 1000 > token?.refreshTokenExpires) {
        return {
          error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
        }
      }
      session.user = token.user;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        emailOrUsername: {},
        password: {}
      },
      async authorize(credentials, req) {
        const { emailOrUsername, password } = credentials;

        try {
          await connectToDB();
        }
        catch (error) {
          console.error(error);
          return NextResponse.json({ error: "Database connection error" }, { status: 500 })
        }

        const user = await User.findOne({ $or: [{ "email": emailOrUsername }, { "username": emailOrUsername }] });
        if (user && bcrypt.compareSync(password, user.password)) {
          console.log(user, emailOrUsername, password);
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        } else {
          console.error("User not found", emailOrUsername, password)
          return null;
        }
      }
    }
    )
  ]
}
const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };