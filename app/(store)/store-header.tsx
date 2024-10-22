"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  BiCart,
  BiHeadphone,
  BiHeart,
  BiLocationPlus,
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

const StoreHeader = () => {
  return (
    <header className="bg-white shadow h-[200px] transition-all duration-300 sticky top-0 z-50">
      <div
        className={
          "bg-[url('/images/header-bg.svg')] bg-cover bg-bottom bg-no-repeat h-[110px] "
        }
      >
        <div className="w-full h-full container mx-auto flex justify-between items-center pb-3">
          <Link href={"/"}>
            <Image
              src={"/images/sedebadLogo.svg"}
              width={120}
              height={80}
              alt="logo"
            />
          </Link>

          <div className="flex gap-6">
            <Link href={"/shopping-card"}>
            <BiCart size={40} className="cursor-pointer" />
            </Link>
            <Link href={"/Favorites"}>
            <BiHeart size={40} className="cursor-pointer" />
            </Link>
            <Link href={"/Orders"}>
            <BiUser size={40} className="cursor-pointer" />
            </Link>
            
            
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 h-[90px]">
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
    </header>
  );
};

export default StoreHeader;
