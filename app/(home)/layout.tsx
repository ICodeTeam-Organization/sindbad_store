import MainHeader from "@/components/MainHeader/MainHeader";
import { authOption } from "@/lib/authOption";
import { getCookie } from "@/lib/coockie-utls";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
const defaultCountry = getCookie("country");
  return (
    <main>
      <MainHeader isHomePage isAuth={!!session} defaultCountry={defaultCountry ?? "1"} /> 
      {children}
    </main>
  );
}
