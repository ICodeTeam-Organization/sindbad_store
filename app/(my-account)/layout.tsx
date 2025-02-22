import React from "react";
import SideBar from "../(my-account)/components/SideBar";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOption);

  return (
    <>
      <MainHeader isAuth={Boolean(session)} isHomePage={false} />
      <div className="mdHalf:flex xl:container mx-auto relative">
        <div className="mdHalf:block hidden border-l py-20 bg-white sticky top-0">
          <SideBar user={{
            email: session?.user?.data?.email,
            fullName: session?.user?.data?.fullName
          }} />
        </div>
        <main className=" mdHalf:flex-1 ">
          {children}
        </main>
      </div>
    </>
  );
}
