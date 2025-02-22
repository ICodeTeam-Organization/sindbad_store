import React from "react";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
  return (
    <main>
      <MainHeader isHomePage={false} isAuth={!!session} />
      {children}
    </main>
  );
}

export default layout;
