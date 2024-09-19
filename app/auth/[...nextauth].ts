import axios from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    accessToken: string;
    userRoles: string[];
    refreshTokenExpiration?: string;
  };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await axios.post<LoginResponse>(
          process.env.NEXT_PUBLIC_BASE_URL + "Auth/loginAsync",
          credentials,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          const {
            id,
            fullName,
            phoneNumber,
            email,
            accessToken,
            userRoles,
            refreshTokenExpiration,
          } = res.data.user;
          const user = {
            id,
            fullName,
            phoneNumber,
            email,
            accessToken,
            userRoles,
            refreshTokenExpiration,
            token: res.data.token,
          };
          return user;
        } else throw new Error("حدث خطأ اثناء عملية تسجيل الدخول");
      },
    }),
  ],
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

  pages: {
    signIn: "/auth/",
    error: "/auth/",
  },
} satisfies NextAuthOptions;
