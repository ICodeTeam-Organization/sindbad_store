import React from "react";
import StoreHeader from "./store-header";
import '@smastrom/react-rating/style.css'
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
