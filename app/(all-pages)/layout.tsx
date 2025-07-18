import React from "react";
// import StoreHeader from "./store-header";
import "@smastrom/react-rating/style.css";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { getCookie } from "@/lib/coockie-utls";
const StoreLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOption);
  const defaultCountry = getCookie("country");
  return (
    <>
      {
        // <StoreHeader />
        <div className="sticky top-0 z-[50]">
          <div className="relative overflow-visible ">
            <MainHeader isHomePage={false} isAuth={!!session} defaultCountry={defaultCountry ?? "1"} />
          </div>
        </div>
      }
      <main>{children}</main>
      {/* <StoreFooter/> => => and this as well*/}
    </>
  );
};

export default StoreLayout;
