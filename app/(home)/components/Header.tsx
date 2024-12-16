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
import { IoMdNotificationsOutline } from "react-icons/io";
import { useCartStore } from "@/app/stores/cartStore";
import DropDownMenuOrderFrom from "@/components/DropDownMenuOrderFrom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
// import {useRouter} from "next/navigation";

const SearchComponent = ({
  searchKeyword = "",
  setsearchKeyword = (str: string) => {
    searchKeyword = str;
  },
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
        href={"/shop?skw=" + searchKeyword}
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
  const {items:cartItems} = useCartStore()
  const isAuth = status === "authenticated";
  // const router = useRouter()


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
  };

  const NavMenu = ()=>(
    <div
    onClick={(event) => {
      event.stopPropagation();
    }}
    className={cn(
      "flex flex-col mdHalf:flex-row mdHalf:relative z-0 bg-white mdHalf:shadow-md  xl:text-sm text-xs  xl:px-4  mdHalf:justify-between justify-start  mdHalf:h-auto mdHalf:w-auto h-full w-full transition-all duration-300 xl:pr-[170px]  mdHalf:pr-[170px] ",
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
        <Link
          href={"/shop?hasOffer=t"}
          className="nav-menus-label"
        >
          <p> عروض اليوم </p>
        </Link>
      </div>

      <div className="nav-menus">
        <Link
          href={"/shop?newProducts=true"}
          className="nav-menus-label"
        >
          <p> وصل حديث</p>
        </Link>
      </div>
    </div>
    {/* profile info in mobile show in nav menu */}
    <div className="mdHalf:hidden block " >
      <PersonButton status={status} session={session} />
    </div>
    <div className="mdHalf:hidden mb-10 block  relative">
      <OrderFromAndHow />
    </div>
  </div>
  )

  return (
    <div className="  bg-header-gradient  ">
      <div className="flex  justify-between  w-full mdHalf:items-start items-center mdHalf::bg-purple-600 ">
        {/* logo section*/}
        <div>
          <div className="p-2 px-0  cursor-pointer lg:m-4 mdHalf:my-4 mdHalf:mx-1  hidden mdHalf:block absolute z-[999999] ">
            <Link href="/" >
            <Image
              className="block relative "
              src={"/images/sedebadLogo.svg"}
              width={130}
              height={100}
              alt=""
            /></Link>
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
            <Link href="/">
            <Image
              className="block relative cursor-pointer"
              src={"/images/sedebadLogo.svg"}
              width={80}
              height={80}
              alt=""
            />
            </Link>
          </div>
        </div>
        {/* header => top,down */}
        <div className="flex flex-col md:w-full   ">
          {/* top section */}
          <div className="flex  mdHalf:flex-wrap p-4 xl:gap-x-10 lg:gap-x-4 gap-x-2  text-sm 2xl:justify-between mdHalf:justify-end justify-between items-center ms-5 mdHalf:mr-[170px]  ">
            <div className="hidden mdHalf:block">
              <OrderFromAndHow />
            </div>

            <div className="hidden md:block mdHalf:w-auto flex-1 ">
              <SearchComponent
                searchKeyword={searchKeyword}
                setsearchKeyword={setsearchKeyword}
              />
            </div>

            <div className="flex flex-row items-center  md:gap-2 gap-6">
              {isAuth && (
                <>
                  <Link
                    href="/Favorites"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500  hover:bg-[#66666611]  rounded-full"
                  >
                    <IoMdNotificationsOutline className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                  <Link
                    href="/Favorites"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500 hover:bg-[#66666611]  rounded-full"
                  >
                    <GoHeart className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                  <Link
                    href="/shopping-card"
                    className="cursor-pointer bg-[#66666611] md:bg-transparent transition-[background-color] duration-500 hover:bg-[#66666611]  rounded-full"
                  > {cartItems.length > 0 && <div className="bg-red-600 text-white text-[9px] flex items-center justify-center rounded-full h-4 w-4 absolute" >{cartItems.length}</div>}
                    <BsCart className="text-[#666666]  text-[20px] m-2 " />
                  </Link>
                </>
              )}
              <div className="cursor-pointer hidden mdHalf:block">
                <PersonButton status={status} session={session} />
              </div>
            </div>
          </div>

          {/* down section this section in mobile become the navbarMenu */}
          <div
            className="tajawal z-[99999]  mdHalf:block hidden "
          >
            {/* content of navmenu */}
             <NavMenu/>
          </div>

         <div className="mdHalf:hidden" >
         <Sheet open={openNav} >
            <SheetContent side="right" className="w-[90%] [&>button]:hidden overflow-y-auto p-0 m-0  " >
                 <NavMenu/>
            </SheetContent>
          </Sheet>
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
