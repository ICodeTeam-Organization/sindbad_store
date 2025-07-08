import MainHeader from "@/components/MainHeader/MainHeader";
import { authOption } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);

  return (
    <main>
      <MainHeader isHomePage isAuth={!!session} /> 
      {children}
    </main>
  );
}
