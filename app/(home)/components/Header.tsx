"use client";

import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";
import { GoPerson } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Link from "next/link";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed  w-full py-4 transition-all duration-300 ${
        scrolled && "bg-rose-600 z-50"
      }`}
    >
      <div className=" container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  flex flex-row justify-end  items-center">
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
            <Link
              href={"/auth/"}
              className="flex justify-between items-center hover:cursor-pointer"
            >
              <div className=" p-3 ml-3 bg-neutral-100 rounded-full">
                <GoPerson className="text-[18px] md:text-[25px]" />
              </div>
              <div className="flex items-end ">
                <div className="md:ml-2 sm:ml-1  text-xs sm:text-sm md:text-md">
                  <p className="text-gray-500 hidden lg:block ">مرحبا بك</p>
                  <h3 className="text-xs md:text-sm">تسجيل الدخول</h3>
                </div>
                <FaAngleDown size={15} />
              </div>
            </Link>
            <Link href={"/shpping-card/"}>
              <div className="relative p-3 mr-3 md:mr-5 w-fit bg-neutral-100 rounded-full hover:cursor-pointer ">
                <MdOutlineLocalGroceryStore className="text-[18px] md:text-[25px]" />
                <div className="flex justify-center items-center bg-[#F55157] w-[13px] h-[13px] md:w-[18px] md:h-[18px] rounded-full absolute top-0 right-0 ">
                  <p className="m-auto text-white text-[10px] md:text-xs">2</p>
                </div>
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
