"use client"
import useEcommerceQuerySearch from '@/app/(store)/e-commerce/hooks/useEcommerceQuerySearch';
import useStoreQuerySearch from '@/app/(store)/stores/hooks/useStoreQuerySearch';
import { useShopFiltersStore } from '@/app/stores/shopFiltersStore';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
 

function SearchComponent({isHomePage = false}) {

  const params = useSearchParams();
  const productName = params.get("productName");
  const [searchKeyword, setsearchKeyword] = useState(productName || "");
  const currentPage = usePathname();
  const pageName = currentPage.split("/").pop();

  // to check if the page is shop page make btn that click to search as div to handle click event
  // if not shop page the btn become Link from next/Link
  // if store page search about stores
  // if ecommrce page search about ecommerce
  // const isShopPage = pageName?.startsWith("shop");
  const isEcommrcePage = pageName?.startsWith("e-commerce");
  const isStorePage = pageName?.startsWith("stores");

  const { setProductName } = useShopFiltersStore();
  const { setStoreName } = useStoreQuerySearch();
  const { setEcommerceName } = useEcommerceQuerySearch();

  return (
    <div className="flex  px-1 h-[46px]  xl:w-full   border-[0px] rounded-[9px] shadow justify-between gap-x-1  bg-white w-full">
      <input
        className="pr-2 w-full h-full   outline-none rounded-full text-[13px]"
        type="text"
        placeholder={
          isStorePage
            ? " ابحث  عن محل"
            : isEcommrcePage
            ? " ابحث  عن متجر"
            : " ابحث  عن منتج"
        }
        value={searchKeyword}
        onChange={(e) => {
          setsearchKeyword(e.target.value);
        }}
      />
      { isHomePage ? (
        <Link
          href={"/shop?productName=" + searchKeyword}
          className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
        >
          <BiSearch color="black " size={24} />
        </Link>
      ) : (
        <div
          onClick={() => {
            if (isEcommrcePage) {
              setEcommerceName(searchKeyword);
            } else if (isStorePage) {
              setStoreName(searchKeyword);
            } else {
              setProductName(searchKeyword);
            }
          }}
          className="  px-3  flex items-center justify-center hover:bg-slate-100 cursor-pointer "
        >
          <BiSearch color="black " size={24} />
        </div>
      )}
    </div>
  );
};

export default SearchComponent