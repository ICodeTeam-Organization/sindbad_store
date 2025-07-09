import useEcommerceQuerySearch from '@/app/(all-pages)/e-commerce/hooks/useEcommerceQuerySearch';
import useStoreQuerySearch from '@/app/(all-pages)/stores/hooks/useStoreQuerySearch';
import { useShopFiltersStore } from '@/app/stores_mangament/shopFiltersStore';
 
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { usePathname  } from 'next/navigation';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function SearchComponent({ isHomePage = false }) {
 
  const [searchKeyword, setSearchKeyword] = useState(  "");
  const currentPage = usePathname();
  const pageName = currentPage.split("/").pop();
  const router = useRouter();

  const isEcommercePage = pageName?.startsWith("e-commerce");
  const isStorePage = pageName?.startsWith("stores");

  const { setProductName , resetFilters } = useShopFiltersStore();
  const { setStoreName } = useStoreQuerySearch();
  const { setEcommerceName } = useEcommerceQuerySearch();

  // دالة البحث عند الضغط على زر "Enter"
  const handleSearch = () => {
    if (isEcommercePage) {
      setEcommerceName(searchKeyword);
    } else if (isStorePage) {
      setStoreName(searchKeyword);
    } else {
      resetFilters()
      router.push(`/shop?productName=${searchKeyword}`);
      setProductName(searchKeyword);

    }

    // في الصفحة الرئيسية، انتقل إلى صفحة البحث عند الضغط على "Enter"
    if (isHomePage) {
      router.push(`/shop?productName=${searchKeyword}`);
    }
  };

  return (
    <div className="flex px-1 h-[46px] xl:w-full  mdHalf:rounded-full overflow-hidden border justify-between gap-x-1 bg-white w-full z-0">
      <input
        className="pr-2 w-full h-full outline-none rounded-full text-[13px]"
        type="text"
        placeholder={
          isStorePage
            ? " ابحث عن محل"
            : isEcommercePage
            ? " ابحث عن متجر"
            : " ابحث عن منتج"
        }
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {isHomePage ? (
        <Link
          href={`/shop?productName=${searchKeyword}`}
          className="px-3 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
        >
          <BiSearch color="black" size={24} />
        </Link>
      ) : (
        <div
          onClick={handleSearch}
          className="px-3 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
        >
          <BiSearch color="black" size={24} />
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
