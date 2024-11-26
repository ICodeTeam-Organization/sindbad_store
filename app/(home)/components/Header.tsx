"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PersonButton from "./person-button";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useSignOut from "@/hooks/useSignOut";
import Navbar from "./Navbar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const mutation = useSignOut();
<<<<<<< Updated upstream
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
=======

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

  

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // setScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const SearchComponent = () => (
    <div className="flex  px-1 h-[46px]  xl:w-full   border-[0px] rounded-[9px] shadow justify-between gap-x-1  bg-white w-full">
      <input
        className="pr-2 w-full h-full text-sm mdHalf:text-md  outline-none rounded-full"
        type="text"
        placeholder=" ابحث  عن منتج"
      />
      <div className="  px-2  flex items-center justify-center">
        <BiSearch color="black " size={24} />
      </div>
    </div>
  );

  const OrderFromAndHow = () => {
    return (
      <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0">
        <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6">
          <p className=" mdHalf:text-sm text-base mdHalf:m-0 mb-1" > اطلب من </p>
          <div className="flex items-center justify-center gap-2 mdHalf:mr-1 mdHalf:px-1 mdHalf:pr-2  cursor-pointer rounded">
            <Select dir="rtl" disabled>
              <SelectTrigger className="bg-transparent mdHalf:px-3 outline-none selection:outline-none">
                <SelectValue placeholder="السعودية" />
              </SelectTrigger>
              <SelectContent className="z-[99999999]" >
                <SelectItem value="place1">اليمن</SelectItem>
                <SelectItem value="place2">السعودية</SelectItem>
                <SelectItem value="place3">مصر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />

        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 " >
            <p className="mdHalf:text-sm text-base mdHalf:m-0 " > كيف ؟ </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-base" />
          </div>

          {/* web */}
          <div className="hidden mdHalf:block" >
            <DropdownMenu menu={questions} dir="right" />
          </div>
          {/* mobile */}
          <div className="mdHalf:hidden block" >
            <ul
            role="menu"
                className={cn(" mt-2 opacity-0 invisible  group-hover:visible group-hover:opacity-100 hidden group-hover:block transition-all top-12 z-[999999] min-w-[180px] overflow-y-scroll overflow-x-hidden  bg-white focus:outline-none h-[200px] border-b")}
            >
                {questions.map((item, index) => (
                  item.invisible 
                  ? <></>
                  : <React.Fragment key={index}>
                        <li
                            className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 mr-4 "
                            onClick={item.onclickFun}
                        >
                            {item.icon}
                            <p className="text-slate-800 font-medium ml-2 whitespace-nowrap ">{item.title}</p>
                        </li>
                    </React.Fragment>
                  
                ))}
            </ul>
          </div>

        </div>
      </div>
    );
  };

>>>>>>> Stashed changes
  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 w-full py-4 transition-all duration-300 flex justify-center",
        scrolled && "bg-white shadow-md z-50"
      )}
    >
      <div
        className={cn(
          scrolled ? "justify-between" : "justify-end",
          "container w-full sm:px-4 md:px-8 lg:px-16 xl:px-32  flex flex-row   items-center"
        )}
      >
        <Image
          className={scrolled ? `block relative` : `hidden`}
          src={"/images/sedebadLogo.svg"}
          width={100}
          height={80}
          alt=""
        />

        <div className="hidden  px-1 py-2 max-w-[380px] lg:max-w-[450px] xl:max-w-[580px]  border-[1px] rounded-full border-black  md:flex justify-between items-center bg-white ">
          <input
            className="pr-2  w-[634px] text-sm md:text-lg  outline-none rounded-full"
            type="text"
            placeholder=" ابحث عما تريد"
          />
          <button className=" h-[16px] w-[16px] pl-6">
            <BiSearch color="gray" />
          </button>
        </div>

        <div className=" ml-2 md:-ml-0 md:mr-5 xl:mr-8 flex items-center justify-end md:justify-normal w-full md:w-fit">
          <div className="flex">
            {status === "loading" ? (
              <Loader2 className="animate-spin" />
            ) : status === "authenticated" ? (
              <Popover>
                <PopoverTrigger>
                  <PersonButton status={status} session={session} />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col md:flex-row justify-evenly">
                  <Button
                    onClick={() => mutation.mutate()}
                    variant={"outline"}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "تسجيل الخروج"
                    )}
                  </Button>
                  {/* <Link
                    className="text-base btn border border-gray-200 rounded text-center w-20 p-2  mr-3 hover:bg-slate-200 transition-colors"
                    href="/Orders"
                  >
                    طلباتي
                  </Link> */}
                </PopoverContent>
              </Popover>
            ) : (
              <Link className="" href={"/auth"}>
                <PersonButton status={status} session={session} />
              </Link>
            )}

            <Link href={"/shopping-card/"}>
              <div className="relative p-3 mr-3 md:mr-5 w-fit bg-neutral-100 rounded-full hover:cursor-pointer ">
                <MdOutlineLocalGroceryStore className="text-[18px] md:text-[25px]" />
              </div>
            </Link>
          </div>
          <div className="w-[40px] md:mr-3 max-md:pl-14 lg:pl-14 ">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
