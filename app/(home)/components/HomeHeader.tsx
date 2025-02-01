"use client";
import { BiMenu, BiSearch } from "react-icons/bi";
import {  useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PersonButton from "./person-button";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { IoChevronDownOutline, IoMenu } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import StoresMegaMenu from "./MegaMenus/StoresMegaMenu";
import EShopsMegaMenu from "./MegaMenus/EShopsMegaMenu";
import AllCategoriesMegaMenu from "./MegaMenus/AllCategoriesMegaMenu";
import SpecialOrderMegaMenu from "./MegaMenus/SpecialOrderMegaMenu";
import OrderFromEshopMegaMenu from "./MegaMenus/OrderFromEshopMegaMenu";
import WholesalerOrderCategoriesMegaMenu from "./MegaMenus/WholesalerOrderCategoriesMegaMenu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useCartStore } from "@/app/stores/cartStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import OrderFromAndHow from "./OrderFromAndHow";
// import {useRouter} from "next/navigation";

const SearchComponent = ({
  searchKeyword = "",
  setsearchKeyword = (str: string) => {
    searchKeyword = str;
  },
}) => {
  return (
    <div className="flex  px-1 h-[46px]  xl:w-full   border-[0px] rounded-[9px] shadow justify-between gap-x-1  bg-white w-full">
      <input
        className="pr-2 w-full h-full text-sm mdHalf:text-md  outline-none rounded-full"
        type="text"
        placeholder=" ابحث  عن منتج"
        value={searchKeyword}
        onChange={(e) => {
          setsearchKeyword(e.target.value);
        }}
      />
      <Link
        href={"/shop?productName=" + searchKeyword}
        className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
      >
        <BiSearch color="black " size={24} />
      </Link>
    </div>
  );
};

const HomeHeader = () => {

  const [openNav, setopenNav] = useState<boolean>(false);
  const [searchKeyword, setsearchKeyword] = useState("");
  const {   status } = useSession();
  const { items: cartItems } = useCartStore();
  const isAuth = status === "authenticated";
  
  // const [isVisible, setIsVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  // const [hideThreshold, setHideThreshold] = useState(false); // Tracks if scrolled past 500px

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > 500 && currentScrollY > lastScrollY) {
  //       // Hide header when scrolling down past 500px
  //       setIsVisible(false);
  //       setHideThreshold(true); // Mark that we've passed 500px
  //     } else if (hideThreshold) {
  //       // Show header when scrolling up at least 100px
  //       setIsVisible(true);
  //       setHideThreshold(false); // Reset the threshold
  //     }

  //     setLastScrollY(currentScrollY); // Update last scroll position
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollY, hideThreshold]);

  const NavMenu = () => (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={cn(
        "flex flex-col mdHalf:flex-row mdHalf:relative hover:z-[9999999] bg-white mdHalf:shadow-md  xl:text-sm text-xs  xl:px-4  mdHalf:justify-between justify-start  mdHalf:h-auto mdHalf:w-auto h-full w-full transition-all duration-300 xl:pr-[170px]  mdHalf:pr-[170px] "
      )}
    >
      {/* this just show in mobile */}
      <div className="p-4 flex justify-between items-center w-full mdHalf:hidden">
        <Image
          className="block relative"
          src={"/images/sedebadLogo.svg"}
          width={80}
          height={80}
          alt=""
        />
        <div
          className="bg-white border p-2 rounded-full relative  cursor-pointer "
          onClick={() => {
            setopenNav(false);
          }}
        >
          <ArrowRight size={30} />
        </div>
      </div>

      <div className=" flex flex-col mdHalf:flex-row lg:justify-end mdHalf:justify-between xl:gap-x-4   ">
        <div className="nav-menus group">
          <div className="nav-menus-label">
            <IoMenu size={22} className="hidden lg:block" />
            <p className="">كل الفئات</p>
          </div>

          <AllCategoriesMegaMenu />
        </div>

        <div className="nav-menus group">
          <div className="nav-menus-label">
            <p> طلب خاص </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
          </div>
          <SpecialOrderMegaMenu isAuth={isAuth} />
        </div>

        <div className="nav-menus group ">
          <div className="nav-menus-label">
            <p> طلب من متجر إلكتروني </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
          </div>
          <OrderFromEshopMegaMenu />
        </div>

        <div className="nav-menus group">
          <div className="nav-menus-label">
            <p> المحلات </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
          </div>
          <StoresMegaMenu />
        </div>

        <div className="nav-menus group">
          <div className="nav-menus-label">
            <p> المتاجر الإلكترونية</p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
          </div>
          <EShopsMegaMenu />
        </div>

        <div className="nav-menus group">
          <div className="nav-menus-label">
            <p> طلب جملة </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
          </div>
          <WholesalerOrderCategoriesMegaMenu />
        </div>
      </div>

      <div className=" flex flex-col mdHalf:flex-row justify-end lg:gap-x-5 lg:ml-5">
        <div className="nav-menus ">
          <Link href={"/shop?hasOffer=t"} className="nav-menus-label">
            <p> عروض اليوم </p>
          </Link>
        </div>

        <div className="nav-menus">
          <Link href={"/shop?newProduct=t"} className="nav-menus-label">
            <p> وصل حديث</p>
          </Link>
        </div>
      </div>
      {/* profile info in mobile show in nav menu */}
      <div className="mdHalf:hidden block ">
        <PersonButton forMobile  />
      </div>
      <div className="mdHalf:hidden mb-10 block  relative">
        <OrderFromAndHow isAuth={isAuth} />
      </div>
    </div>
  );

  return (
    <div>
      <div className={cn("  bg-header-gradient  ",!true&&"shadow-lg border-b-0 mdHalf:border-b-0  border-b-white")}>
      <div className="flex  justify-between  w-full mdHalf:items-start items-center mdHalf::bg-purple-600 ">
        {/* logo section*/}
        <div>
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

          {/* this for mobile */}
          <div className="p-2 px-0 pr-4  mx-0 mdHalf:hidden flex  items-center z-10 ">
            {/* btn sliderBarMenu */}
            <div
              className="mdHalf:hidden block"
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
        {/* header => top,down */}
        <div className="flex flex-col md:w-full   ">
          {/* top section */}
          <div className="flex  mdHalf:flex-wrap p-4 xl:gap-x-10 lg:gap-x-4 gap-x-2  text-sm 2xl:justify-between mdHalf:justify-end justify-between items-center ms-5 mdHalf:mr-[170px]  ">
            <div className="hidden mdHalf:block">
              <OrderFromAndHow isAuth={isAuth} />
            </div>

            <div className="hidden md:block mdHalf:w-auto flex-1 ">
              <SearchComponent
                searchKeyword={searchKeyword}
                setsearchKeyword={setsearchKeyword}
              />
            </div>

            <div className="flex flex-row items-center  md:gap-2 gap-6">
              {isAuth && (
                <>
                  <Link
                    href="/Favorites"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500  hover:bg-[#66666611]  rounded-full"
                  >
                    <IoMdNotificationsOutline className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                  <Link
                    href="/Favorites"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500 hover:bg-[#66666611]  rounded-full"
                  >
                    <GoHeart className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                  <Link
                    href="/shopping-card"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500 hover:bg-[#66666611]  rounded-full"
                  >
                    {" "}
                    {cartItems.length > 0 && (
                      <div className="bg-red-600 text-white text-[9px] flex items-center justify-center rounded-full h-4 w-4 absolute">
                        {cartItems.length}
                      </div>
                    )}
                    <BsCart className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                </>
              )}
              <div className="cursor-pointer hidden mdHalf:block ">
                <PersonButton    />
              </div>
            </div>
          </div>

          {/* down section this section in mobile become the navbarMenu */}
          <div className="tajawal   mdHalf:block hidden ">
            {/* content of navmenu */}
            <NavMenu />
          </div>

          <div className="mdHalf:hidden">
            <Sheet open={openNav}>
              <SheetContent
                side="right"
                className="w-[90%] [&>button]:hidden overflow-y-auto p-0 m-0  "
              >
                <NavMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* serach component for mobiles */}
    </div>
      <div 
      className={
        cn(
          "md:hidden block  bg-header-gradient w-full p-4 transition-[transform_0.3s_ease,opacity_0.3s_ease] top-0  ",
          true ? "translate-y-0 opacity-[1] " : "translate-y-full opacity-0",

        )
      }
        //  style={{
        //   // transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        //   // opacity: isVisible ? 1 : 0,
        //   transition: "transform 0.3s ease, opacity 0.3s ease",
        //   top: 0,
        //   width: "100%",
        //   zIndex: 1000,
        // }}
      
      >
        <SearchComponent
          searchKeyword={searchKeyword}
          setsearchKeyword={setsearchKeyword}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
