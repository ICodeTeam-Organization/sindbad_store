

"use client";
import React from "react";
import E_commerceCard from "./e-comm-card";
import { postApi } from "@/lib/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { Button } from "@/components/ui/button";
import useEcommerceQuerySearch from "../hooks/useEcommerceQuerySearch";
import SreachEcommercesResultsHeader from "./search-ecommrce-results-header";
import { Shop } from "@/types/storeTypes";

interface EcommercesResponsive {
  data: {
    items: Shop[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const E_commerceGrid = () => {

  const { categoryId, ecommerceName } = useEcommerceQuerySearch();

  const { categories } = useCategoriesDataStore();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetched } =
    useInfiniteQuery<EcommercesResponsive>({
      queryKey: ["GetEcommerces-Filter", categoryId,ecommerceName],
      queryFn: async ({ pageParam = 1 }) => {
        const body = {
          name:ecommerceName,
          parentsCategoriesIds: categoryId ? [categoryId] : null,
          pageSize: 10,
          pageNumber: pageParam,
        };
        const response = await postApi(`EcommercesStores/FilterECommerce`, { body });
        return response as EcommercesResponsive;
      },
      retry:false,
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.currentPage < lastPage?.data?.totalPages) {
          return lastPage?.data?.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  const ecommerces = data?.pages?.flatMap((page) => page.data.items) || [];
  const totalCount = data?.pages[0]?.data?.totalCount || 0;

  if (!isFetched) {
    return (
      <div
        dir="rtl"
        className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
      >
        {[...Array(18)].map((_, x) => (
          <div key={x.toString()} className=" ">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (ecommerces.length === 0) {
    return (
      <div className="h-[65vh] flex items-center justify-center">
      <p className="text-center text-lg tajawal font-bold py-12">
        لايتوفر أي متاجر في الوقت الحالي
      </p>
    </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center px-5">
        <SreachEcommercesResultsHeader
          ecommerceName={ecommerceName}
          totalResults={totalCount}
          catName={categories.find((ele) => ele.id == categoryId)?.name || ""}
        />
      </div>
      <div className="px-5 mb-12 grid xl:grid-cols-3 sm:grid-cols-2   gap-5 justify-center items-center">
        {ecommerces.map((ecommerce) => (
          <E_commerceCard
            key={ecommerce.id}
            id={ecommerce.id}
            name={ecommerce.name}
            LinkOFStore={ecommerce.urlLinkOfStore}
            description={ecommerce.description}
            logo={ecommerce.logo}
            categories={ecommerce.categories}
            ecommerceStoreImages={ecommerce.ecommerceStoreImages}
          />
        ))}

        {isFetchingNextPage &&
          [...Array(10)].map((_, x) => (
            <div key={x.toString()} className=" ">
              <ProductCardSkeleton />
            </div>
          ))}
      </div>
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-[#0f172a] pt-3 tajawal text-white rounded  disabled:opacity-50"
          >
            {"تحميل المزيد"}
          </Button>
        </div>
      )}
    </>
  );
};

export default E_commerceGrid;
