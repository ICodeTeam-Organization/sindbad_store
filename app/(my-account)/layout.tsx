import React from "react";
import SideBar from "../(my-account)/components/SideBar";
import MainHeader from "@/components/MainHeader/MainHeader";
// import { getServerSession } from "next-auth";
// import { authOption } from "@/lib/authOption";
import { ProfileResponsiveType } from "./profile/types";
import { getApi } from "@/lib/http";
import { getCookie } from "@/lib/coockie-utls";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const resulte = await getApi<ProfileResponsiveType>("Customer/profile",{},{
    cache:"no-cache"
  });

  const defaultCountry = getCookie("country");

  return (
    <>
      <MainHeader isAuth={true} isHomePage={false} defaultCountry={defaultCountry ?? "1"} />
      <div className="mdHalf:flex xl:container mx-auto relative">
        <div className="mdHalf:block hidden border-l py-20 bg-white sticky top-0">
          <SideBar user={{
            email: resulte.data?.email  || "لا يوجد ايميل",
            fullName: resulte.data?.name || "لا يوجد اسم"
          }} />
        </div>
        <main className=" mdHalf:flex-1 ">
          {children}
        </main>
      </div>
    </>
  );
}
