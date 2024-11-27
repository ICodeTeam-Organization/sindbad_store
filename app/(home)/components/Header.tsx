"use client";
import { BiMenu, BiSearch } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PersonButton from "./person-button";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSignOut from "@/hooks/useSignOut";
import DropdownMenu from "@/components/DropDownMenu";
import { IoChevronDownOutline, IoMenu } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import StoresMegaMenu from "./MegaMenus/StoresMegaMenu";
import EShopsMegaMenu from "./MegaMenus/EShopsMegaMenu";
import { FaQuestionCircle } from "react-icons/fa";
import AllCategoriesMegaMenu from "./MegaMenus/AllCategoriesMegaMenu";
import SpecialOrderMegaMenu from "./MegaMenus/SpecialOrderMegaMenu";
import OrderFromEshopMegaMenu from "./MegaMenus/OrderFromEshopMegaMenu";
import WholesalerOrderCategoriesMegaMenu from "./MegaMenus/WholesalerOrderCategoriesMegaMenu";
import {useRouter} from "next/navigation";

const SearchComponent = ({
  searchKeyword = "",
  setsearchKeyword = (str: string) => {},
}) => {


  return (
    <div className="flex  px-1 h-[46px]  xl:w-full   border-[0px] rounded-[9px] shadow justify-between gap-x-1  bg-white w-full">
      <input
        className="pr-2 w-full h-full text-sm mdHalf:text-md  outline-none rounded-full"
        type="text"
        placeholder=" ابحث  عن منتج"
        value={searchKeyword}
        onChange={(e) => {
          setsearchKeyword(e.target.value);
        }}
        
      />
      <Link
        href={"/shop?skw="+searchKeyword}
        className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
      >
        <BiSearch color="black " size={24} />
      </Link>
    </div>
  );
};

const Header = () => {
  // const [scrolled, setScrolled] = useState(false);

  const [openNav, setopenNav] = useState<boolean>(false);
  const [searchKeyword, setsearchKeyword] = useState("");
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const router = useRouter()


  // const mutation = useSignOut();

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // setScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const OrderFromAndHow = () => {
    return (
      <div className="flex mdHalf:flex-row flex-col-reverse xl:gap-6 gap-4 mdHalf:items-center  mdHalf:p-0">
        <div className="mdHalf:flex flex-row items-center mdHalf:justify-center mdHalf:p-0 px-6">
          <p className=" mdHalf:text-sm text-base mdHalf:m-0 mb-1"> اطلب من </p>
          <div className="flex items-center justify-center gap-2 mdHalf:mr-1 mdHalf:px-1 mdHalf:pr-2  cursor-pointer rounded">
            <Select dir="rtl">
              <SelectTrigger className="bg-transparent mdHalf:px-3 outline-none selection:outline-none">
                <SelectValue placeholder="اليمن" />
              </SelectTrigger>
              <SelectContent className="z-[99999999]">
                <SelectItem value="place1">اليمن</SelectItem>
                <SelectItem value="place2">السعودية</SelectItem>
                <SelectItem value="place3">مصر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-[1.5px] rounded-full h-4 bg-[#AAA7A7] hidden mdHalf:block" />

        <div className="  group cursor-pointer relative mdHalf:p-0  mdHalf:m-0 mt-2 mdHalf:hover:bg-transparent hover:bg-[#FF8F7E22] pt-3 ">
          <div className="flex gap-2 items-center mdHalf:justify-center justify-between mdHalf:p-0 px-6 ">
            <p className="mdHalf:text-sm text-base mdHalf:m-0 "> كيف ؟ </p>
            <IoChevronDownOutline className="group-hover:rotate-180 transition-transform text-base" />
          </div>

          {/* web */}
          <div className="hidden mdHalf:block">
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
                item.invisible ? (
                  <></>
                ) : (
                  <React.Fragment key={index}>
                    <li
                      className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-2 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 mr-4 "
                      onClick={item.onclickFun}
                    >
                      {item.icon}
                      <p className="text-slate-800 font-medium ml-2 whitespace-nowrap ">
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
  };

  return (
    <div className="  bg-header-gradient  ">
      <div className="flex  justify-between  w-full mdHalf:items-start items-center mdHalf::bg-purple-600 ">
        {/* logo section*/}
        <div>
          <div className="p-2 px-0  lg:m-4 mdHalf:my-4 mdHalf:mx-1  hidden mdHalf:block absolute z-[999999] ">
            <Image
              className="block relative "
              src={"/images/sedebadLogo.svg"}
              width={130}
              height={100}
              alt=""
            />
          </div>

          {/* this for mobile */}
          <div className="p-2 px-0 pr-4  mx-0 mdHalf:hidden flex  items-center z-10 ">
            {/* btn sliderBarMenu */}
            <div
              className="mdHalf:hidden block"
              onClick={() => {
                setopenNav((o) => !o);
              }}
            >
              <BiMenu className="cursor-pointer" size={40} />
            </div>
            <Image
              className="block relative "
              src={"/images/sedebadLogo.svg"}
              width={80}
              height={80}
              alt=""
            />
          </div>
        </div>
        {/* header => top,down */}
        <div className="flex flex-col md:w-full   ">
          {/* top section */}
          <div className="flex  mdHalf:flex-wrap p-4 xl:gap-x-10 lg:gap-x-4 gap-x-2  text-sm 2xl:justify-between mdHalf:justify-end justify-between items-center mx-5 mdHalf:mr-[170px]  ">
            <div className="hidden mdHalf:block">
              <OrderFromAndHow />
            </div>

            <div className="hidden md:block mdHalf:w-auto flex-1 ">
              <SearchComponent
                searchKeyword={searchKeyword}
                setsearchKeyword={setsearchKeyword}
                
              />
            </div>

            <div className="flex flex-row items-center xl:gap-6 md:gap-2 gap-3">
              {isAuth && (
                <>
                  <Link
                    href="/Favorites"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent md:p-0 p-2 rounded-full"
                  >
                    <GoHeart className="text-[#666666] mdHalf:text-[22px] text-sm " />
                  </Link>
                  <Link
                    href="/shopping-card"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent md:p-0 p-2 rounded-full"
                  >
                    <BsCart className="text-[#666666] mdHalf:text-[22px] text-sm " />
                  </Link>
                </>
              )}
              <div className="cursor-pointer ">
                <PersonButton status={status} session={session} />
              </div>
            </div>
          </div>

          {/* down section this section in mobile become the navbarMenu */}
          <div
            // this container of down section of header to bgc black , this show in mobile for navmenu
            className={cn(
              "mdHalf:w-auto mdHalf:h-auto mdHalf:static tajawal font-bold bg-[#0000] mdHalf:visible invisible z-[99999] transition-all  w-screen h-screen fixed  ",
              openNav && " bg-[#0006] fixed top-0 left-0 visible"
            )}
            onClick={() => {
              setopenNav((o) => !o);
            }}
          >
            {/* content of navmenu */}
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
              className={cn(
                "flex flex-col mdHalf:flex-row mdHalf:relative fixed mdHalf:over mdHalf:translate-x-0 translate-x-[200%] right-0 top-0 bg-white shadow-md  xl:text-sm text-xs   xl:px-4  mdHalf:justify-between justify-start  mdHalf:h-auto mdHalf:w-auto h-full  w-[80%] transition-all duration-300 xl:pr-[170px]  mdHalf:pr-[170px] mdHalf:overflow-visible overflow-y-scroll overflow-x-hidden  ",
                openNav && "translate-x-[0] z-[999999] pb-4  "
              )}
            >
              {/* this just show in mobile */}
              <div className="p-4 flex justify-between items-center w-full mdHalf:hidden">
                <Image
                  className="block relative"
                  src={"/images/sedebadLogo.svg"}
                  width={80}
                  height={80}
                  alt=""
                />
                <div
                  className="bg-white border p-2 rounded-full relative  cursor-pointer "
                  onClick={() => {
                    setopenNav(false);
                  }}
                >
                  <ArrowRight size={30} />
                </div>
              </div>

              <div className=" flex flex-col mdHalf:flex-row lg:justify-end mdHalf:justify-between xl:gap-x-4   ">
                <div className="nav-menus group">
                  <div className="nav-menus-label">
                    <IoMenu size={22} className="hidden lg:block" />
                    <p className="">كل الفئات</p>
                  </div>

                  <AllCategoriesMegaMenu />
                </div>

                <div className="nav-menus group">
                  <div className="nav-menus-label">
                    <p> طلب خاص </p>
                    <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                  </div>
                  {/* <CategoriesMegaMenu
                    categories={categories}
                    linkAll="/"
                    title="فئات الطلب الخاص"
                  /> */}
                  <SpecialOrderMegaMenu />
                </div>

                <div className="nav-menus group ">
                  <div className="nav-menus-label">
                    <p> طلب من متجر إلكتروني </p>
                    <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                  </div>
                  <OrderFromEshopMegaMenu />
                </div>

                <div className="nav-menus group">
                  <div className="nav-menus-label">
                    <p> المحلات </p>
                    <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                  </div>
                  <StoresMegaMenu />
                </div>

                <div className="nav-menus group">
                  <div className="nav-menus-label">
                    <p> المتاجر الإلكترونية</p>
                    <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                  </div>
                  <EShopsMegaMenu />
                </div>

                <div className="nav-menus group">
                  <div className="nav-menus-label">
                    <p> طلب جملة </p>
                    <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                  </div>
                  <WholesalerOrderCategoriesMegaMenu />
                </div>
              </div>

              <div className=" flex flex-col mdHalf:flex-row justify-end lg:gap-x-5 lg:ml-5">
                <div className="nav-menus ">
                  <div className="nav-menus-label">
                    <p> عرض اليوم </p>
                  </div>
                </div>

                <div className="nav-menus">
                  <div className="nav-menus-label">
                    <p> وصل حديث</p>
                  </div>
                </div>
              </div>
              <div className="mdHalf:hidden block z-[9999999] relative">
                <OrderFromAndHow />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* serach component for mobiles */}
      <div className="md:hidden block mx-5 ">
        <SearchComponent
          searchKeyword={searchKeyword}
          setsearchKeyword={setsearchKeyword}
        />
      </div>
    </div>
  );
};

export default Header;
