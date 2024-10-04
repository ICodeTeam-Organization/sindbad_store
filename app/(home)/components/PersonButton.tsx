import { Session } from "next-auth";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { GoPerson } from "react-icons/go";

type Props = {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

const PersonButton = ({ session, status }: Props) => {
  return (
    <div className="flex justify-between items-center hover:cursor-pointer">
      <div className=" p-3 ml-3 bg-neutral-100 rounded-full">
        <GoPerson className="text-[18px] md:text-[25px]" />
      </div>
      <div className="flex items-end ">
        <div className="md:ml-2 sm:ml-1  text-xs sm:text-sm md:text-md">
          {status === "authenticated" ? (
            <p className="text-gray-500 hidden lg:block ">
              {session?.user.data.fullName}مرحبا بك
            </p>
          ) : (
            <h3 className="text-xs md:text-sm">تسجيل الدخول</h3>
          )}
        </div>
        <FaAngleDown size={15} />
      </div>
    </div>
  );
};

export default PersonButton;
