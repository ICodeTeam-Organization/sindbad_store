import React from "react";
// import StoreHeader from "./store-header";
import '@smastrom/react-rating/style.css'
import MainHeader from "@/components/MainHeader/MainHeader";
const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {
        // <StoreHeader />
        <MainHeader/>
        }
      <main>{children}</main>
      {/* <StoreFooter/> => => and this as well*/}
    </>
  );
};

export default StoreLayout;
