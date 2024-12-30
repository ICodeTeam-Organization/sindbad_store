import React from "react";
import StoreHeader from "./store-header";
const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {
        <StoreHeader />
        }
      <main>{children}</main>
      {/* <StoreFooter/> => => and this as well*/}
    </>
  );
};

export default StoreLayout;
