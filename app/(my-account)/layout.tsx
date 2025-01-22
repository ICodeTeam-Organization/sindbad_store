import React from "react";
import SideBar from "../(my-account)/components/SideBar";
import StoreHeader from "../(store)/store-header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < >
      <StoreHeader />
      <div className="mdHalf:flex xl:container mx-auto relative">
        <div className="mdHalf:block hidden border-l py-20 bg-white sticky top-0">
          <SideBar />
        </div>
        <main className=" mdHalf:flex-1 ">
          {children}
        </main>
      </div>
    </>
  );
}
