import React from "react";
import SideBar from "../(my-account)/components/SideBar";
import StoreHeader from "../(store)/store-header";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <StoreHeader />
      <SideBar  />
      <main className="space-y-4 mr-64 mx-4 transition-all duration-300 max-md:mr-8 ">
        {children}
      </main>
    </div>
  );
}
