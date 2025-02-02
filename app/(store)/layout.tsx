import React from "react";
// import StoreHeader from "./store-header";
import '@smastrom/react-rating/style.css'
import MainHeader from "@/components/MainHeader/MainHeader";
const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {
        // <StoreHeader />
        <div className="sticky top-0 z-[50]">
        <div className="relative overflow-visible ">
        <MainHeader/>
        </div>
        </div>
        }
      <main>{children}</main>
      {/* <StoreFooter/> => => and this as well*/}
    </>
  );
};

export default StoreLayout;
