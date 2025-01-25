import React from "react";
import StoreHeader from "../(store)/store-header";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>
    <StoreHeader  />
    {children}</main>;
}

export default layout;
