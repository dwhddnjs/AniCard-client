import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async redirect() {
      return `${process.env.NEXT_PUBLIC_URL}/roster`;
    },
  },
});

export { handler as GET, handler as POST };
