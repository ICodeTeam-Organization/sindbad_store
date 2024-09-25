import { type NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { LoginSchema } from "@/app/auth/schema";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);
        if (validated.success) {
          try {
            const { phone, password } = validated.data;

            const res = await axios.post(
              process.env.NEXT_PUBLIC_BASE_URL + "Auth/loginAsync",
              {
                phoneNumber: phone,
                password: password,
              }
            );

            const user: User = res.data;

            if (res.status === 200 && user) {
              return user;
            } else {
              return null;
            }
          } catch (error: any) {
            throw new Error(
              error.response?.data?.message || "فشلت عملية الدخول حاول مجددا"
            );
          }
        } else {
          return new Error(validated.error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/auth",
  },
};
