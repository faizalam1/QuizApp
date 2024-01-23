import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const authHandler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
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
            email: user.email
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
);

export { authHandler as GET, authHandler as POST };