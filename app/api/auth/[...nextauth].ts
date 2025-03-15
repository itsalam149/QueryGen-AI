import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],  // Add providers if you need authentication
  secret: process.env.NEXTAUTH_SECRET || "a-development-secret-for-testing",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Add any other configuration you need
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };