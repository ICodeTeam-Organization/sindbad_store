import DropdownMenu from '@/components/DropDownMenu';
import DropDownMenuOrderFrom from '@/components/DropDownMenuOrderFrom';
import { cn } from '@/lib/utils';
import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa';
import { IoChevronDownOutline } from 'react-icons/io5';

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

function OrderFromAndHow() {
    return (
        <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0">
          <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6 z-[9999999]">
            <DropDownMenuOrderFrom />
          </div>
          <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
          <div className="mdHalf:block hidden">
            <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0  mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] py-3 ">
              <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
                <p className="text-[13px] mdHalf:m-0 "> طلباتي </p>
              </div>
            </div>
          </div>
          <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />
          <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
            <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
              <p className="text-[13px] mdHalf:m-0 "> كيف ؟ </p>
              <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-[14px]" />
            </div>
  
            {/* web */}
            <div className="hidden mdHalf:block ">
              <DropdownMenu menu={questions} dir="right" />
            </div>
            {/* mobile */}
            <div className="mdHalf:hidden block">
              <ul
                role="menu"
                className={cn(
                  " mt-2 opacity-0 invisible  group-hover:visible group-hover:opacity-100 hidden group-hover:block transition-all top-12 z-[999999] min-w-[180px] overflow-y-scroll overflow-x-hidden  bg-white focus:outline-none h-[200px] border-b"
                )}
              >
                {questions.map((item, index) =>
                  (
                    <React.Fragment key={index}>
                      <li
                        className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-[#FF8F7E22]  mr-4 "
                        onClick={item.onclickFun}
                      >
                        {item.icon}
                        <p className="text-slate-800 font-medium ml-2 whitespace-nowrap text-[11px] ">
                          {item.title}
                        </p>
                      </li>
                    </React.Fragment>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      );
}

export default OrderFromAndHow