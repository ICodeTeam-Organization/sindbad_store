import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName: string;
      phoneNumber: string;
      email: string;
      accessToken: string;
      userRoles: string[];
      refreshTokenExpiration?: string;
    };
  }
  interface User {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    accessToken: string;
    userRoles: string[];
    refreshTokenExpiration?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      fullName: string;
      phoneNumber: string;
      email: string;
      accessToken: string;
      userRoles: string[];
      refreshTokenExpiration?: string;
    };
  }
}
