"use client";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import MenusSection from "./headerSections/MenusSection";
import SearchComponent from "./headerSections/SearchComponent";
import TopSectionOfHeader from "./headerSections/TopSectionOfHeader";

const MainHeader = ({ isHomePage = false }) => {

  const [openNav, setopenNav] = useState<boolean>(false);

  return (
    <div>
      <div
        className={cn(
          "  bg-header-gradient  shadow-sm border-b-0 mdHalf:border-b-0  border-b-white flex  justify-between  w-full mdHalf:items-start items-center mdHalf::bg-purple-600"
        )}
      >
        {/* logo section*/}
        <div>
          {/* هذي الوقو الي بتظهر في الصفحة الرئيسية في الشاشات الكبيرة */}
          {isHomePage && (
            <div className="p-2 px-0  cursor-pointer lg:m-4 mdHalf:my-4 mdHalf:mx-1  hidden mdHalf:block absolute z-[99999999] ">
              <Link href="/">
                <Image
                  className="block relative "
                  src={"/images/sedebadLogo.svg"}
                  width={130}
                  height={100}
                  alt=""
                />
              </Link>
            </div>
          )}

          {/* هذا فيه الوقو الي بتظهر في باقي الصفحات غير الصفحة الرئيسية وفي الموبايل  . بالإضافة الى زر لفتح ال المنيو في الموبايل */}
          <div
            className={cn(
              "p-4 px-0 pr-4  mx-0  flex  items-center z-10 ",
              isHomePage && "mdHalf:hidden flex"
              // !isHomePage && "h"
            )}
          >
            {/* btn sliderBarMenu */}
            <div
              className={cn("mdHalf:hidden block")}
              onClick={() => {
                setopenNav((o) => !o);
              }}
            >
              <BiMenu className="cursor-pointer" size={40} />
            </div>
            <Link href="/">
              <Image
                className="block relative cursor-pointer"
                src={"/images/sedebadLogo.svg"}
                width={80}
                height={80}
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* header => top,down sections */}
        <div className="flex flex-col md:w-full   ">
          {/* top section */}
          <TopSectionOfHeader isHomePage={isHomePage} />

          {/* down section this section in mobile become the navbarMenu */}
          <div className="tajawal   mdHalf:block hidden ">
            {/* content of navmenu */}
            <MenusSection onClose={setopenNav} isHomePage={isHomePage} />
          </div>

          {/* this drawer for mobile */}
          <div className="mdHalf:hidden">
            <Sheet open={openNav} onOpenChange={setopenNav} >
              <SheetContent
                side="right"
                className="w-[90%] [&>button]:hidden overflow-y-auto p-0 m-0  "
              >
                <MenusSection onClose={setopenNav} isHomePage={isHomePage} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* serach component for mobiles */}
      <div
        className={cn(
          "md:hidden block  bg-header-gradient w-full p-4 transition-[transform_0.3s_ease,opacity_0.3s_ease] top-0  "
        )}
      >
        <SearchComponent isHomePage={isHomePage} />
      </div>
    </div>
  );
};

export default MainHeader;
