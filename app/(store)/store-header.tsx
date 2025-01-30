"use client";

import Image from "next/image";
import Link from "next/link";
import React, {   useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { useSession } from "next-auth/react";
import PersonButton from "../(home)/components/person-button";
import { BsCart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopFiltersStore } from "../stores/shopFiltersStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { GrClose } from "react-icons/gr";
import { useCartStore } from "../stores/cartStore";
import useStoreQuerySearch from "./stores/hooks/useStoreQuerySearch";
import useEcommerceQuerySearch from "./e-commerce/hooks/useEcommerceQuerySearch";
import OrderFromAndHow from "../(home)/components/OrderFromAndHow";
import { cn } from "@/lib/utils";

// search component contain the search input
const SearchComponent = ({
  searchKeyword = "",
  setsearchKeyword = (str: string) => {
    searchKeyword = str;
  },
}) => {
  const currentPage = usePathname();
  const pageName = currentPage.split("/").pop();

  // to check if the page is shop page make btn that click to search as div to handle click event
  // if not shop page the btn become Link from next/Link
  // if store page search about stores
  // if ecommrce page search about ecommerce
  const isShopPage = pageName?.startsWith("shop");
  const isEcommrcePage = pageName?.startsWith("e-commerce");
  const isStorePage = pageName?.startsWith("stores");

  const { setProductName } = useShopFiltersStore();
  const { setStoreName } = useStoreQuerySearch();
  const { setEcommerceName } = useEcommerceQuerySearch();

  return (
    <div className="flex  px-1 h-[46px]  xl:w-full   border-[0px] rounded-[9px] shadow justify-between gap-x-1  bg-white w-full">
      <input
        className="pr-2 w-full h-full   outline-none rounded-full text-[13px]"
        type="text"
        placeholder={
          isStorePage
            ? " ابحث  عن محل"
            : isEcommrcePage
            ? " ابحث  عن متجر"
            : " ابحث  عن منتج"
        }
        value={searchKeyword}
        onChange={(e) => {
          setsearchKeyword(e.target.value);
        }}
      />
      {!isShopPage && !isEcommrcePage && !isStorePage ? (
        <Link
          href={"/shop?productName=" + searchKeyword}
          className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
        >
          <BiSearch color="black " size={24} />
        </Link>
      ) : (
        <div
          onClick={() => {
            if (isEcommrcePage) {
              setEcommerceName(searchKeyword);
            } else if (isStorePage) {
              setStoreName(searchKeyword);
            } else {
              setProductName(searchKeyword);
            }
          }}
          className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
        >
          <BiSearch color="black " size={24} />
        </div>
      )}
    </div>
  );
};

const StoreHeader = () => {
  const params = useSearchParams();
  const productName = params.get("productName");
  const [searchKeyword, setsearchKeyword] = useState(productName || "");

  const {  status } = useSession();
  const isAuth = status === "authenticated";

  const [openMobileNav, setopenMobileNav] = useState(false);

  const { items: cartItems } = useCartStore();

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

  return (
    <header className="transition-all duration-300 sticky top-0 z-50">
      <div
        // className={
        //   " bg-header-gradient bg-cover bg-bottom bg-no-repeat  "
        //   // "bg-[url('/images/header-bg.svg')] bg-cover bg-bottom bg-no-repeat  "
        // }
        className={cn("  bg-header-gradient  ",!true&&"shadow-lg  mdHalf:border-b-0 mdHalf:shadow border-b-white")}
        // }
      >
        <div className="w-full h-full  flex flex-col mdHalf:pb-0  shadow-sm ">
          <div className="flex  justify-between  w-full mdHalf:items-start items-center mdHalf::bg-purple-600 ">
            {/* logo section*/}
            <div className="p-2 px-0 pr-4  mx-0  flex  items-center z-10  ">
              <div
                onClick={() => {
                  setopenMobileNav((o) => !o);
                }}
                className="mdHalf:hidden block"
              >
                <BiMenu className="cursor-pointer" size={40} />
              </div>
              <Link href="/" className="cursor-pointer">
                <Image
                  className="block relative "
                  src={"/images/sedebadLogo.svg"}
                  width={90}
                  height={90}
                  alt=""
                />
              </Link>
            </div>
            <div className="flex flex-col md:w-full   ">
              <div className="flex  mdHalf:flex-wrap p-4 xl:gap-x-10 lg:gap-x-4 gap-x-2  text-sm 2xl:justify-between mdHalf:justify-end justify-between items-center ms-5   ">
                <div className="hidden mdHalf:block">
                  <OrderFromAndHow />
                </div>

                <div className="hidden md:block mdHalf:w-auto flex-1 ">
                  <SearchComponent
                    searchKeyword={searchKeyword}
                    setsearchKeyword={setsearchKeyword}
                  />
                </div>

                <div className="flex flex-row items-center  md:gap-2 sm:gap-6 gap-2 ">
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
                  <div className="cursor-pointer ">
                    <PersonButton  />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* search for mobile */}
         
          {/* menu for mobile */}
          <Sheet open={openMobileNav}>
            <SheetContent
              side="right"
              className="[&>button]:hidden w-[80%] p-0 m-0"
            >
              <div className="mt-4">
                {/* <Sidebar /> */}
                <div className="m-6 cursor-pointer flex  items-center justify-between">
                  <Image
                    className="block relative "
                    src={"/images/sedebadLogo.svg"}
                    width={70}
                    height={70}
                    alt=""
                  />
                  <GrClose
                    onClick={() => {
                      setopenMobileNav((o) => !o);
                    }}
                  />
                </div>

                {isAuth && (
                  <PersonButton
                     
                    forMobile={true}
                  />
                )}
                <OrderFromAndHow />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div
            className={cn(
              "md:hidden block  bg-header-gradient shadow-lg w-full p-4 pt-0 transition-[transform_0.3s_ease,opacity_0.3s_ease] top-0  ",
              true
                ? "translate-y-0 opacity-[1] "
                : "translate-y-full opacity-0"
            )}
          >
            <SearchComponent
              searchKeyword={searchKeyword}
              setsearchKeyword={setsearchKeyword}
            />
          </div>
    </header>
  );
};

export default StoreHeader;
