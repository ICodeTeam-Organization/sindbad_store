import React from "react";
import StoreHeader from "./store-header";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StoreHeader />
      <main>{children}</main>
    </>
  );
};

export default StoreLayout;
