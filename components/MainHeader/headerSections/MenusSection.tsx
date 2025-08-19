import dynamic from "next/dynamic";
import OrderFromAndHow from '@/app/[country]/(home)/components/OrderFromAndHow';
import PersonButton from '@/app/[country]/(home)/components/person-button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoChevronDownOutline, IoMenu } from 'react-icons/io5';

interface PropsType {
  onClose?: (status: boolean) => void;
  isHomePage?: boolean;
  isAuth: boolean;
  defaultCountry: string;
}

// نعمل داينمك امبورت بس للميقا منيوز
const AllCategoriesMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/AllCategoriesMegaMenu'));
const EShopsMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/EShopsMegaMenu'));
const OrderFromEshopMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/OrderFromEshopMegaMenu'));
const SpecialOrderMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/SpecialOrderMegaMenu'));
const StoresMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/StoresMegaMenu'));
const WholesalerOrderCategoriesMegaMenu = dynamic(() => import('@/app/[country]/(home)/components/MegaMenus/WholesalerOrderCategoriesMegaMenu'));

function MenusSection({ onClose, isHomePage, isAuth, defaultCountry }: PropsType) {
  const closeSheet = () => onClose?.(false);

  const navMenus = isHomePage
    ? [
        {
          label: 'كل الفئات',
          component: <AllCategoriesMegaMenu />,
          icon: <IoMenu size={22} className="hidden lg:block" />,
          withChevron: false,
        },
        {
          label: 'طلب خاص',
          component: <SpecialOrderMegaMenu isAuth={isAuth} />,
        },
        {
          label: 'طلب من متجر إلكتروني',
          component: <OrderFromEshopMegaMenu />,
        },
        {
          label: 'المحلات',
          component: <StoresMegaMenu />,
        },
        {
          label: 'المتاجر الإلكترونية',
          component: <EShopsMegaMenu />,
        },
        {
          label: 'طلب جملة',
          component: <WholesalerOrderCategoriesMegaMenu isAuth={isAuth} />,
        },
      ]
    : [];

  const quickLinks = [
    { label: 'عروض اليوم', href: '/shop?todayOffer=t' },
    { label: 'وصل حديث', href: '/shop?newProduct=t' },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'flex flex-col mdHalf:flex-row mdHalf:relative hover:z-[9999999] mdHalf:bg-secondary mdHalf:text-white mdHalf:shadow-md xl:text-sm text-xs xl:px-4 mdHalf:justify-between justify-start mdHalf:h-auto mdHalf:w-auto h-full w-full transition-all duration-300 xl:pr-[170px] mdHalf:pr-[170px]'
      )}
    >
      {/* mobile header */}
      <div className="p-4 flex justify-between items-center w-full mdHalf:hidden">
        <Image src={"/images/logo.png"} width={80} height={80} alt="" />
        <div
          className="bg-white border p-2 rounded-full cursor-pointer"
          onClick={closeSheet}
        >
          <ArrowRight size={30} />
        </div>
      </div>

      {/* dynamic nav menus */}
      {isHomePage && (
        <div className="mdHalf:flex flex-col mdHalf:flex-row lg:justify-end mdHalf:justify-between xl:gap-x-4">
          {navMenus.map((menu, i) => (
            <div key={i} className="nav-menus group">
              <div className="nav-menus-label">
                {menu.icon}
                <p>{menu.label}</p>
                {menu.withChevron !== false && (
                  <IoChevronDownOutline className="group-hover:rotate-180 transition-transform" />
                )}
              </div>
              {menu.component}
            </div>
          ))}
        </div>
      )}

      {/* quick links */}
      {isHomePage && (
        <div className="mdHalf:flex flex-col mdHalf:flex-row justify-end lg:gap-x-5 lg:ml-5">
          {quickLinks.map((link, i) => (
            <div key={i} className="nav-menus">
              <Link href={link.href} className="nav-menus-label h-full">
                <p>{link.label}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* mobile profile + order */}
      <div className="mdHalf:hidden block">
        <PersonButton forMobile isAuth={isAuth} closeSheet={closeSheet} />
      </div>
      <div className="mdHalf:hidden mb-10 block relative">
        <OrderFromAndHow isAuth={isAuth} defaultCountry={defaultCountry} />
      </div>
    </div>
  );
}

export default MenusSection;
