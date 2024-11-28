import { Session } from "next-auth";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import {
  FaUser,
  FaClipboardList,
  FaTasks,
  FaBell,
  FaAddressCard,
} from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import DropdownMenu from "@/components/DropDownMenu";
import Link from "next/link";
import { IoChevronDownOutline } from "react-icons/io5";
type Props = {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

const PersonButton = ({ status }: Props) => {
  const menu = [
    {
      title: "معلومات الحساب",
      icon: <FaUser />,
      onclickFun: () => {
        /* Functionality for account info */
      },
    },
    {
      title: "الطلبات",
      icon: <FaClipboardList />,
      onclickFun: () => {
        /* Functionality for orders */
      },
    },
    {
      title: "الطلبات الخاصة",
      icon: <FaTasks />,
      onclickFun: () => {
        /* Functionality for special orders */
      },
    },
    {
      title: "الإشعارات",
      icon: <FaBell />,
      onclickFun: () => {
        /* Functionality for notifications */
      },
    },
    {
      title: "عناويني",
      icon: <FaAddressCard />,
      onclickFun: () => {
        /* Functionality for addresses */
      },
    },
    {
      title: "تسجيل الخروج",
      icon: <BiLogOutCircle />,
      onclickFun: () => {
        /* Functionality for addresses */
      },
      isLogout: true,
    },
  ];

  const isAuth = status === "authenticated";

  return (
    <div className="flex justify-between items-center  group">
      <div className="  mdHalf:ml-3 rounded-full relative ">
        {!isAuth ? (
          <GoPerson className="text-[25px] sm:mx-2 md:mx-0 md:text-[25px] text-[#666] mdHalf:block " />
        ) : (
          <div className="flex gap-x-2">
            <img
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block mdHalf:h-10 mdHalf:w-10 w-9 h-w-9 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
            />
            <div className="flex gap-2 items-center justify-center">
              <p className="mdHalf:text-base text-xs" > حسابي </p>
              <IoChevronDownOutline className="group-hover:rotate-180 transition-all"  />
            </div>
          </div>
        )}
        {isAuth && <DropdownMenu menu={menu} dir="left" />}
      </div>
      <div className="flex items-end  ">
        <div className="md:ml-2 sm:ml-1  text-xs sm:text-sm md:text-md">
          {isAuth ? (<></>
            // <p className="text-gray-500 hidden lg:block ">
            //   {session?.user.data.fullName}
            // </p>
          ) : (
            <Link className="hover:cursor-pointer" href="/auth">
              <p className="text-[#666] text-[10px] md:text-xs"> مرحبا بك </p>
              <h3 className="text-[10px] md:text-xs whitespace-nowrap">تسجيل الدخول</h3>
            </Link>
          )}
        </div>
        {!isAuth && <FaAngleDown size={16} className="mb-1" />}
      </div>
    </div>
  );
};

export default PersonButton;
