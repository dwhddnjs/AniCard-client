import { API_KEYS } from "@/common/apiKeys";
import { postRequest } from "@/common/axios";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async redirect() {
      return "http://localhost:3000/roster";
    },
  },
});

export { handler as GET, handler as POST };
