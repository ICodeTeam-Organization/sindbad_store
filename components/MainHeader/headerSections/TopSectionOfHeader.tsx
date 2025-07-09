import OrderFromAndHow from "@/app/(home)/components/OrderFromAndHow";
import React from "react";
import SearchComponent from "./SearchComponent";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { cn } from "@/lib/utils";
import { BsCart } from "react-icons/bs";
import PersonButton from "@/app/(home)/components/person-button";
import Link from "next/link";
import { useCartStore } from "@/app/stores_mangament/cartStore";
import { useNotificationsDataStore } from "@/app/stores_mangament/notificationStore";

interface PropsType {
  isHomePage?: boolean;
  isAuth?: boolean;
  defaultCountry:string
  
}

function TopSectionOfHeader({
  isHomePage = false,
  isAuth = false,
  defaultCountry
}:PropsType) {
  // const { status } = useSession();
  // const isAuth = status === "authenticated";
  const { items: cartItems } = useCartStore();
  const { notificationCount } = useNotificationsDataStore();

  return (
    <div
      className={cn(
        "flex  mdHalf:flex-wrap p-4 xl:gap-x-10 lg:gap-x-4 gap-x-2  text-sm 2xl:justify-between mdHalf:justify-end justify-between items-center ms-5    ",
        isHomePage && "mdHalf:mr-[170px]"
      )}
    >
      <div className="hidden mdHalf:block">
        <OrderFromAndHow isAuth={isAuth} defaultCountry={defaultCountry} />
      </div>

      <div className="hidden md:block mdHalf:w-auto flex-1 ">
        <SearchComponent isHomePage={isHomePage} />
      </div>

      <div className="flex flex-row items-center  md:gap-2 gap-6">
        {isAuth && (
          <>
            <Link
              href="/my-notifications"
              className="cursor-pointer bg-bg-100 transition-[background-color] duration-500  hover:bg-bg-200  rounded-full"
            >
              {notificationCount + 1 > 0 && (
                <div className="bg-primary text-white text-[9px] flex items-center justify-center rounded-full h-4 w-4 absolute">
                  {notificationCount}
                </div>
              )}
              <IoMdNotificationsOutline className="text-secondary  text-[20px] m-2 " />
            </Link>
            <Link
              href="/Favorites"
              className="cursor-pointer bg-bg-100 transition-[background-color] duration-500 hover:bg-bg-200  rounded-full"
            >
              <GoHeart className="text-secondary  text-[20px] m-2 " />
            </Link>
            <Link
              href="/shopping-card"
              className="cursor-pointer bg-bg-100 transition-[background-color] duration-500 hover:bg-bg-200  rounded-full"
            >
              {" "}
              {cartItems.length > 0 && (
                <div className="bg-primary text-white text-[9px] flex items-center justify-center rounded-full h-4 w-4 absolute">
                  {cartItems.length}
                </div>
              )}
              <BsCart className="text-secondary  text-[20px] m-2 " />
            </Link>
          </>
        )}
        {/* web */}
        <div className="cursor-pointer ">
          <PersonButton isAuth={isAuth} />
        </div>
      </div>
    </div>
  );
}

export default TopSectionOfHeader;
