"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
  BiCart,
  BiHeadphone,
  BiHeart,
  BiLocationPlus,
  BiMenu,
  BiSearch,
  BiSolidMessageRoundedError,
  BiUser,
} from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaQuestionCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { IoChevronDownOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import PersonButton from "../(home)/components/person-button";
import { BsCart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import DropdownMenu from "@/components/DropDownMenu";

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
        href={"/shop?skw=" + searchKeyword}
        className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
      >
        <BiSearch color="black " size={24} />
      </Link>
    </div>
  );
};

const StoreHeader = () => {
  // const [openNav, setopenNav] = useState<boolean>(false);
  const [searchKeyword, setsearchKeyword] = useState("");
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

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
          <p className=" mdHalf:text-sm text-[12px] mdHalf:m-0 mb-1">
            {" "}
            اطلب من{" "}
          </p>
          <div className="flex items-center justify-center gap-2 mdHalf:mr-1 mdHalf:px-1 mdHalf:pr-2  cursor-pointer rounded">
            <Select dir="rtl">
              <SelectTrigger className="bg-transparent mdHalf:px-3 outline-none selection:outline-none">
                <SelectValue placeholder="اليمن" />
              </SelectTrigger>
              <SelectContent className="z-[99999999]">
                <SelectItem value="place1">اليمن</SelectItem>
                <SelectItem value="place2">السعودية</SelectItem>
                <SelectItem value="place3">مصر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />

        <div>
          <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
            <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
              {/* <FaBoxes  className="me-1 text-[12px]" /> */}
              <p className="mdHalf:text-sm text-[12px] mdHalf:m-0 "> طلباتي </p>
            </div>
          </div>
        </div>

        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />

        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
            <p className="mdHalf:text-sm text-[12px] mdHalf:m-0 "> كيف ؟ </p>
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
              {questions.map((item, index) =>
                item.invisible ? (
                  <></>
                ) : (
                  <React.Fragment key={index}>
                    <li
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 mr-4 "
                      onClick={item.onclickFun}
                    >
                      {item.icon}
                      <p className="text-slate-800 font-medium ml-2 whitespace-nowrap ">
                        {item.title}
                      </p>
                    </li>
                  </React.Fragment>
                )
              )}
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
            <div className="p-2 px-0 pr-4  mx-0  flex  items-center z-10 ">
              {/* <div
              onClick={() => {
                setopenNav((o) => !o);
              }}
            >
              <BiMenu className="cursor-pointer" size={40} />
            </div> */}
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
                        <BsCart className="text-[#666666]  text-[20px] m-2 " />
                      </Link>
                    </>
                  )}
                  <div className="cursor-pointer ">
                    <PersonButton status={status} session={session} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block md:hidden  mx-5 ">
            <SearchComponent
              searchKeyword={searchKeyword}
              setsearchKeyword={setsearchKeyword}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center gap-5 h-[90px] flex-wrap">
        <Select dir="rtl">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر فئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
          </SelectContent>
        </Select>
        <Select dir="rtl">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="المحلات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="place1">محل1</SelectItem>
            <SelectItem value="place2">محل3</SelectItem>
            <SelectItem value="place3">محل2</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center justify-center gap-5">
          <Link href={"/OrderTrack"} className="flex gap-2 items-center">
            متابعة طلب <BiLocationPlus size={20} />
          </Link>
          <Link href={"/SpecialOrder"} className="flex gap-2 items-center">
            طلب خاص <BiHeadphone size={20} />
          </Link>
          <Link href={"#"} className="flex gap-2 items-center">
            طرق الشراء <BiSolidMessageRoundedError size={20} />
          </Link>
        </div>
      </div> */}
    </header>
  );
};

export default StoreHeader;
