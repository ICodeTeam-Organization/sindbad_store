import React from "react";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { getCookie } from "@/lib/coockie-utls";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
   const defaultCountry = getCookie("country");
  return (
    <main>
      <MainHeader isHomePage={false} isAuth={!!session} defaultCountry={defaultCountry ?? "1"} />
      {children}
    </main>
  );
}

export default layout;
