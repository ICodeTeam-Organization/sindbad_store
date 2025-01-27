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
import useSignOut from "@/hooks/useSignOut";
import { cn } from "@/lib/utils";
type Props = {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  forMobile?: boolean;
};

const PersonButton = ({ status, forMobile = false }: Props) => {
  const mutation = useSignOut();

  const menu = [
    {
      title: "معلومات الحساب",
      icon: <FaUser />,
      href: "/profile",
    },
    {
      title: "طلباتي",
      icon: <FaClipboardList />,
      href: "/my-orders",
    },
    {
      title: "طلباتي الخاصة",
      icon: <FaTasks />,
      href: "/my-special-orders",
    },
    {
      title: "الإشعارات",
      icon: <FaBell />,
      href: "/my-notifications",
    },
    {
      title: "عناويني",
      icon: <FaAddressCard />,
      href: "/user-addresses",
    },
    {
      title: "تسجيل الخروج",
      icon: <BiLogOutCircle />,
      onclickFun: () => {
        mutation.mutate();
      },
      isLogout: true,
    },
  ];

  const isAuth = status === "authenticated";

  return (
    <div className="flex justify-between items-center  group">
      <div
        className={cn(
          "  mdHalf:ml-3 rounded-full relative w-full mdHalf:w-auto z-[999999]",
          !forMobile && "hidden mdHalf:block"
        )}
      >
        {!isAuth ? (
          <GoPerson className="text-[25px] mdHalf:block hidden sm:mx-2 md:mx-0 md:text-[25px] text-[#666]  " />
        ) : (
          <div className="gap-x-2 mdHalf:flex hidden">
            <img
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block mdHalf:hidden mdHalf:h-10 mdHalf:w-10 w-9 h-w-9 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
            />
            <div className="mdHalf:flex gap-2 items-center justify-center hidden">
              <p className="text-[13px]"> حسابي </p>
              <IoChevronDownOutline className="group-hover:rotate-180 transition-all" />
            </div>
          </div>
        )}
        {isAuth && <DropdownMenu menu={menu} dir="left" />}
      </div>
      {!isAuth && (
        <div className="flex items-end mdHalf:w-auto w-full">
          <div className="md:ml-2 sm:ml-1  text-xs sm:text-sm md:text-md mdHalf:p-0 px-6  mdHalf:w-auto w-full mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] cursor-pointer mdHalf:py-0 py-1  ">
            <Link className="hover:cursor-pointer " href="/auth">
              <p className="text-[#666] text-[10px] md:text-xs"> مرحبا بك </p>
              <h3 className="mdHalf:text-[12px] whitespace-nowrap">
                تسجيل الدخول
              </h3>
            </Link>
          </div>
          <FaAngleDown size={16} className="mb-1 mdHalf:block hidden" />
        </div>
      )}
    </div>
  );
};

export default PersonButton;
