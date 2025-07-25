"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import React from "react";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
import MenusSection from "./headerSections/MenusSection";
import SearchComponent from "./headerSections/SearchComponent";
import TopSectionOfHeader from "./headerSections/TopSectionOfHeader";
import { Drawer } from "../Drawer/Drawer";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

interface HeaderPropsType {
  isHomePage: boolean;
  isAuth: boolean;
  defaultCountry: string;
}

const MainHeader = ({
  isHomePage = false,
  isAuth = false,
  defaultCountry,
}: HeaderPropsType) => {
  const [openNav, setopenNav] = useState<boolean>(false);
  // const session = useSession();
  // const isAuth = session.status === "authenticated";

  // let lastScrollTop = 0;
  // const handleScroll = () => {
  //   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  //   const divElement = document.getElementById("hideSearchComponentInMobileWhenScoll");

  //   if (divElement) {
  //     if (currentScroll > lastScrollTop) {
  //       // Scrolling down, hide the div by translating it upwards
  //       divElement.style.zIndex = "0";
  //       divElement.style.opacity = "0";
  //       divElement.style.visibility = "hidden";
  //       divElement.style.transform = 'translateY(-100%)';
  //       divElement.style.position = 'absolute'; // Ensure it doesn't take up space
  //     } else {
  //       // Scrolling up, show the div by resetting the transform
  //       divElement.style.opacity = "1";
  //       divElement.style.visibility = "visible";
  //       divElement.style.transform = 'translateY(0)';
  //       divElement.style.position = 'static'; // Ensure it's fixed on the screen again
  //     }

  //     // Update last scroll position
  //     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="duration-300  lg:container mx-auto">
      <div
        className={cn(
          "  bg-white z-50 mdHalf:shadow-sm shadow-md border-b-0 mdHalf:border-b-0  border-b-white flex  justify-between  w-full mdHalf:items-center items-center mdHalf::bg-purple-600",
          isHomePage && "mdHalf:items-start"
        )}
      >
        {/* logo section*/}
        <div>
          {/* هذي الوقو الي بتظهر في الصفحة الرئيسية في الشاشات الكبيرة */}
          {/* {isHomePage && (
            <div className="p-2 px-0  cursor-pointer  mdHalf:mx-5  hidden mdHalf:block absolute z-[99999999]  -mt-[6px] ">
              <Link href="/">
                <Image
                  className="block relative "
                  src={"/images/sedebadLogo.svg"}
                  width={130}
                  height={80}
                  alt=""
                />
              </Link>
            </div>
          )} */}

          {/* <div className="p-2 px-0  cursor-pointer  mdHalf:mx-5  hidden mdHalf:block absolute z-[99999999]  -mt-[6px] ">
              <Link href="/">
                <Image
                  className="block relative "
                  src={"/images/sedebadLogo.svg"}
                  width={130}
                  height={80}
                  alt=""
                />
              </Link>
            </div> */}

          {/* هذا فيه الوقو الي بتظهر في باقي الصفحات غير الصفحة الرئيسية وفي الموبايل  . بالإضافة الى زر لفتح ال المنيو في الموبايل */}
          {/* <div
            className={cn(
              "p-2 px-0 pr-4  mx-0  flex  items-center z-10 ", 
              // !isHomePage && "h"
            )}
          > 
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
                // width={80}
                width={130}
                height={80}
                alt=""
              />
            </Link>
          </div> */}
        </div>

        {/* header => top,down sections */}
        <div className="flex flex-col  w-full   ">
          {/* top section */}
          <div className="flex items-center max-mdHalf:justify-between  ">
            <div className={(" flex  items-center z-10 mx-2")}>
              <div
                className={cn("mdHalf:hidden block")}
                onClick={() => {
                  setopenNav((o) => !o);
                }}
              >
                <BiMenu className="cursor-pointer" size={40} />
              </div>
              <Link
                href="/"
                className="2lg:w-[130px] w-[120px] h-[70px]  2lg:h-[80px] relative"
              >
                <Image
                  className="block relative cursor-pointer"
                  src={"/images/sedebadLogo.svg"}
                  fill
                  alt="logo"
                />
              </Link>
            </div>
            <div className="md:flex-1">
              <TopSectionOfHeader
                isHomePage={isHomePage}
                isAuth={isAuth}
                defaultCountry={defaultCountry}
              />
            </div>
          </div>

          {/* down section this section in mobile become the navbarMenu */}
          <div className="tajawal   mdHalf:block hidden ">
            {/* content of navmenu */}
            <MenusSection
              onClose={setopenNav}
              isHomePage={isHomePage}
              isAuth={isAuth}
              defaultCountry={defaultCountry}
            />
          </div>

          {/* this drawer for mobile */}
          <div className="mdHalf:hidden">
            <Drawer
              anchor="right"
              open={openNav}
              onClose={() => setopenNav(false)}
            >
              <MenusSection
                onClose={setopenNav}
                isHomePage={isHomePage}
                isAuth={isAuth}
                defaultCountry={defaultCountry}
              />
            </Drawer>
            {/* <Sheet open={openNav} onOpenChange={setopenNav} >
              <SheetContent
                side="right"
                className="w-[90%] [&>button]:hidden overflow-y-auto p-0 m-0  "
              >
                <MenusSection onClose={setopenNav} isHomePage={isHomePage} isAuth={isAuth} />
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>

      {/* serach component for mobiles */}
      <div
        id="hideSearchComponentInMobileWhenScoll"
        className={cn(
          "md:hidden block z-0 mdHalf:shadow-sm shadow-md  w-full relative mdHalf:p-4 pt-0 transition-[transform_0.3s_ease,opacity_0.3s_ease] top-0  "
        )}
      >
        <SearchComponent isHomePage={isHomePage} />
      </div>
    </div>
  );
};

export default MainHeader;
