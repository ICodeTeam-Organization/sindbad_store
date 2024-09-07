import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <HomeHeader/>  */}
      <main>{children}</main>
      {/* <HomeFooter/> */}
    </>
  );
}
