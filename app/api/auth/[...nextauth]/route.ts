import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
  pages: {
    signIn: "http://localhost:8080/api/v1/auth/google/redirect",
  },
  callbacks: {
    async jwt(token) {
      console.log("token: ", token);
      return token;
    },
    async session(session: any) {
      console.log("session: ", session);
      return session;
    },
    async redirect() {
      return "http://localhost:3000/roster";
    },
  },
});

export { handler as GET, handler as POST };
