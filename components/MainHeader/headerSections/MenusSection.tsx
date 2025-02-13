import AllCategoriesMegaMenu from '@/app/(home)/components/MegaMenus/AllCategoriesMegaMenu';
import EShopsMegaMenu from '@/app/(home)/components/MegaMenus/EShopsMegaMenu';
import OrderFromEshopMegaMenu from '@/app/(home)/components/MegaMenus/OrderFromEshopMegaMenu';
import SpecialOrderMegaMenu from '@/app/(home)/components/MegaMenus/SpecialOrderMegaMenu';
import StoresMegaMenu from '@/app/(home)/components/MegaMenus/StoresMegaMenu';
import WholesalerOrderCategoriesMegaMenu from '@/app/(home)/components/MegaMenus/WholesalerOrderCategoriesMegaMenu';
import OrderFromAndHow from '@/app/(home)/components/OrderFromAndHow';
import PersonButton from '@/app/(home)/components/person-button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoChevronDownOutline, IoMenu } from 'react-icons/io5';

interface PropsType {
  onClose?:(status:boolean)=>void; // this is for close drawer in mobile
  isHomePage?:boolean; // For checking is the header for home page or other
  isAuth:boolean
}

// this component is the down section of header and it is the drawer of in mobile screens
function MenusSection({onClose,isHomePage,isAuth}:PropsType) {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={cn(
        "flex flex-col mdHalf:flex-row mdHalf:relative hover:z-[9999999] bg-white mdHalf:shadow-md  xl:text-sm text-xs  xl:px-4  mdHalf:justify-between justify-start  mdHalf:h-auto mdHalf:w-auto h-full w-full transition-all duration-300 xl:pr-[170px]  mdHalf:pr-[170px] "
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
            if (onClose) {
                onClose(false);
            }
          }}
        >
          <ArrowRight size={30} />
        </div>
      </div>

      {isHomePage && (
        <div className=" mdHalf:flex  flex-col mdHalf:flex-row lg:justify-end mdHalf:justify-between xl:gap-x-4    ">
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
            <SpecialOrderMegaMenu isAuth={isAuth} />
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
            <WholesalerOrderCategoriesMegaMenu isAuth={isAuth} />
          </div>
        </div>
      )}

      {isHomePage && (
        <div className=" mdHalf:flex  flex-col mdHalf:flex-row justify-end lg:gap-x-5 lg:ml-5">
          <div className="nav-menus ">
            <Link href={"/shop?todayOffer=t"} className="nav-menus-label h-full ">
              <p> عروض اليوم </p>
            </Link>
          </div>

          <div className="nav-menus">
            <Link href={"/shop?newProduct=t"} className="nav-menus-label h-full ">
              <p> وصل حديث</p>
            </Link>
          </div>
        </div>
      )}
      {/* profile info in mobile show in nav menu */}
      <div className="mdHalf:hidden block ">
        <PersonButton forMobile   />
      </div>
      <div className="mdHalf:hidden mb-10 block  relative">
        <OrderFromAndHow isAuth={isAuth} />
      </div>
    </div>
  )
}

export default MenusSection