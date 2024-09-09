import React from "react";
import Footer from "./components/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <HomeHeader/>  */}
      <main>{children}</main>
    </>
  );
}
