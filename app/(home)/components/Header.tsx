"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PersonButton from "./PersonButton";
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

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const mutation = useSignOut();
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
                  <Link
                    className="text-base btn border border-gray-200 rounded text-center w-20 p-2  mr-3 hover:bg-slate-200 transition-colors"
                    href="/Orders"
                  >
                    طلباتي
                  </Link>
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
