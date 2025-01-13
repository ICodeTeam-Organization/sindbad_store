import React from "react";
import SideBar from "../(my-account)/components/SideBar";
import Image from "next/image";
import Link from "next/link";

import { BiCart, BiHeart, BiUser } from "react-icons/bi";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
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
      <SideBar  />
      <main className="space-y-4 mr-64 mx-4 transition-all duration-300 max-md:mr-8 ">
        {children}
      </main>
    </div>
  );
}
