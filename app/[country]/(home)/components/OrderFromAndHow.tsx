import DropDownMenuOrderFrom from "@/components/DropDownMenuOrderFrom";
import HowDialog from "@/components/HowDialog";
import { getApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";

interface PropsType {
  isAuth: boolean;
  defaultCountry:string;
}

const Loader = () => (
  <div className="flex items-center justify-center my-4 ">
    <div className="w-7 h-7 border-4 border-primary-background border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function OrderFromAndHow({ isAuth , defaultCountry }: PropsType) {
  const [showHowDialog, setshowHowDialog] = useState<number | null>(null);

  const { data: questions, isFetching } = useQuery<{
    data: { items: { id: number; question: string }[] };
  }>({
    queryKey: ["how-FAQs"],
    queryFn: () => getApi(
      // "FAQs/GetFAQ_QuestionsWithIds/1/10/1"
      "FAQs/1?classification=1&pageNumber=1&pageSize=10&brief=true"
    ),
  });

  return (
    <>
      <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0 pb-10">
        <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6 ">
          <DropDownMenuOrderFrom defaultCountry={defaultCountry} />
        </div>
        {isAuth && (
          <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        )}
        {isAuth && (
          <div className="mdHalf:block hidden">
            <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0  mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] py-3 ">
              <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
                <Link href="/my-orders" className="text-[13px] mdHalf:m-0 ">
                  {" "}
                  طلباتي{" "}
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
            <p className="text-[13px] mdHalf:m-0 "> كيف ؟ </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-[14px]" />
          </div>

          {/* web */}
          <div className="hidden mdHalf:block ">
            <ul
              role="menu"
              className={cn(
                "mdHalf:absolute mdHalf:opacity-0 mdHalf:invisible  group-hover:visible group-hover:opacity-100 transition-all top-10 z-[999999] mdHalf:min-w-[180px] mdHalf:w-auto w-full overflow-auto rounded-lg mdHalf:border border-slate-200 bg-white p-1.5 mdHalf:shadow-lg focus:outline-none ",
                "right-0"
              )}
            >
              {!isFetching && questions?.data?.items.length == 0 && (
                <p className="text-center text-xs p-4">لا توجد اسئلة</p>
              )}
              {isFetching ? (
                <Loader />
              ) : (
                questions?.data?.items?.map((item) => (
                  <React.Fragment key={item.id}>
                    <li
                      role="menuitem"
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-3 transition-all hover:bg-[#FF8F7E22]"
                      onClick={() => setshowHowDialog(item.id)}
                    >
                      <FaQuestionCircle />
                      <p className="text-slate-800  ml-2 whitespace-nowrap  text-[12px]">
                        {item.question}
                      </p>
                    </li>
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
          {/* mobile */}
          <div className="mdHalf:hidden block">
            <ul
              role="menu"
              className={cn(
                " mt-2 opacity-0 invisible  group-hover:visible group-hover:opacity-100 hidden group-hover:block transition-all top-12 z-[999999] min-w-[180px] overflow-y-scroll overflow-x-hidden  bg-white focus:outline-none border-b p-2"
              )}
            >
              {!isFetching && questions?.data?.items.length == 0 && (
                <p className="text-center text-xs p-4">لا توجد اسئلة</p>
              )}
              {isFetching ? (
                <Loader />
              ) : (
                questions?.data?.items?.map((item) => (
                  <React.Fragment key={item.id}>
                    <li
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-[#FF8F7E22]  mr-4 "
                      onClick={() => setshowHowDialog(item.id)}
                    >
                      <FaQuestionCircle />
                      <p className="text-slate-800 font-medium ml-2 whitespace-nowrap text-[11px] ">
                        {item.question}
                      </p>
                    </li>
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <HowDialog
        open={showHowDialog}
        id={showHowDialog || 0}
        onOpenChange={() => {
          setshowHowDialog(null);
        }}
      />
    </>
  );
}

export default OrderFromAndHow;
