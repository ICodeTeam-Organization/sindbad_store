"use client";
import React from "react";
import StoreCard from "./store-card";
import { postApi } from "@/lib/http";
import useStoreQuerySearch from "../hooks/useStoreQuerySearch";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SreachStoresResultsHeader from "./search-stores-results-header";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { Button } from "@/components/ui/button";

const StoreGrid = () => {
  const { categoryId, storeName } = useStoreQuerySearch();
  const { categories } = useCategoriesDataStore();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetched } =
    useInfiniteQuery<any>({
      queryKey: ["GetStores-Filter", categoryId , storeName],
      queryFn: async ({ pageParam = 1 }) => {
        const body = {
          name:storeName,
          parentsCategoriesIds: categoryId ? [categoryId] : null,
          pageSize: 20,
          pageNumber: pageParam,
        }; 
        const response = await postApi(`Stores/GetStoresWithFilter`, { body });
        return response;
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

  const stores =( data?.pages?.flatMap((page) => page?.data?.items) || []).filter(e=>e);
  const totalCount = data?.pages[0]?.data?.totalCount || 0;

  console.log(stores,"vmdkvmdkmvkdmvkdmvkdmvkdmvkm");
  

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

  if (stores.length === 0) {
    return (
      <div className="h-[65vh] flex items-center justify-center">
        <p className="text-center text-lg tajawal font-bold py-12">
          لايتوفر أي محلات في الوقت الحالي
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center px-5">
        <SreachStoresResultsHeader
          storeName={storeName}
          totalResults={totalCount}
          catName={categories.find((ele) => ele.id == categoryId)?.name || ""}
        />
      </div>
      <div className="px-5 mb-12 grid xl:grid-cols-3 sm:grid-cols-2   gap-5 justify-center items-center">
        { stores && stores?.length > 0 && stores?.map((store) => (
          <StoreCard
            key={store?.id}
            id={store?.id}
            name={store?.name || ""}
            websiteLink={store?.websiteUrl || ""}
            imagesUrl={store?.imageUrl || []}
            mainImageUrl={store?.imageUrl || ""}
            storeCategories={store?.storeCategories || []}
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

export default StoreGrid;
