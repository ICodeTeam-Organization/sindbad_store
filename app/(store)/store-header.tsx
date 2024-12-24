"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { BiMenu, BiSearch } from "react-icons/bi";
import DropDownMenuOrderFrom from "@/components/DropDownMenuOrderFrom";
import { FaQuestionCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import PersonButton from "../(home)/components/person-button";
import { BsCart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import DropdownMenu from "@/components/DropDownMenu";
import { usePathname, useSearchParams } from "next/navigation";
import { useShopFiltersStore } from "../stores/shopFiltersStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { GrClose } from "react-icons/gr";
import { useCartStore } from "../stores/cartStore";
import useStoreQuerySearch from "./stores/hooks/useStoreQuerySearch";
import useEcommerceQuerySearch from "./e-commerce/hooks/useEcommerceQuerySearch";

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
            } else  {
              setProductName(searchKeyword)
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

  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

  const [openMobileNav, setopenMobileNav] = useState(false);

  const { items: cartItems } = useCartStore();

  const questions = [
    {
      title: "كيف اشتري من الموقع؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اشتري من الموقع؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اطلب من سوق الكتروني آخر؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اطلب من سوق الكتروني آخر؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اطلب طلب خاص من السعودية؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اطلب طلب خاص من السعودية؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف ادفع قيمة مشتريات؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف ادفع قيمة مشتريات؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اسجل معلوماتي وعناوين الشحن؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اسجل معلوماتي وعناوين الشحن؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كم مدة وصول الطلب؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كم مدة وصول الطلب؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اراقب مسار شحناتي؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اراقب مسار شحناتي؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اعلم بوصول طلبي؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اعلم بوصول طلبي؟");
      },
      isLogout: false,
      invisible: false,
    },
    {
      title: "كيف اتواصل مع ادارة الموقع؟",
      icon: <FaQuestionCircle />,
      onclickFun: () => {
        console.log("كيف اتواصل مع ادارة الموقع؟");
      },
      isLogout: false,
      invisible: false,
    },
  ];

  const OrderFromAndHow = () => {
    return (
      <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0">
        <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6">
          <DropDownMenuOrderFrom />
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        <div className="mdHalf:block hidden">
          <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0  mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] py-3 ">
            <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
              <p className="text-[13px] mdHalf:m-0 "> طلباتي </p>
            </div>
          </div>
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
            <p className="text-[13px] mdHalf:m-0 "> كيف ؟ </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-[14px]" />
          </div>

          {/* web */}
          <div className="hidden mdHalf:block">
            <DropdownMenu menu={questions} dir="right" />
          </div>
          {/* mobile */}
          <div className="mdHalf:hidden block">
            <ul
              role="menu"
              className={cn(
                " mt-2 opacity-0 invisible  group-hover:visible group-hover:opacity-100 hidden group-hover:block transition-all top-12 z-[999999] min-w-[180px] overflow-y-scroll overflow-x-hidden  bg-white focus:outline-none h-[200px] border-b"
              )}
            >
              {questions.map((item, index) => (
                <React.Fragment key={index}>
                  <li
                    className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-[#FF8F7E22]  mr-4 "
                    onClick={item.onclickFun}
                  >
                    {item.icon}
                    <p className="text-slate-800 font-medium ml-2 whitespace-nowrap text-[11px] ">
                      {item.title}
                    </p>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <header className="bg-white shadow  transition-all duration-300 sticky top-0 z-50">
      <div
        className={
          "bg-[url('/images/header-bg.svg')] bg-cover bg-bottom bg-no-repeat  "
        }
      >
        <div className="w-full h-full  flex flex-col  pb-3">
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
                  <div className="cursor-pointer hidden mdHalf:block ">
                    <PersonButton status={status} session={session} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* search for mobile */}
          <div className="block md:hidden mx-5">
            <SearchComponent
              searchKeyword={searchKeyword}
              setsearchKeyword={setsearchKeyword}
            />
          </div>
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

                <PersonButton status={status} session={session} />
                <OrderFromAndHow />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
