"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Shop } from "@/types/storeTypes";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import E_commerceCard from "../../e-commerce/components/e-comm-card";
import { getApi } from "@/lib/http";
import React from "react";

type ApiResponse = {
  data: {
    items: Shop[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};

function FavoriteEcommrces() {
  const { status } = useSession();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse>({
    queryKey: ["GetFavoriteEcommerceStores"],
    queryFn: async ({ pageParam = 1 }) =>
      await getApi(
        `EStores?pageNumber=${pageParam}&pageSize=10&favorite=true`, 
      ),
    enabled: status === "authenticated",
    getNextPageParam: (lastPage) => {
      if (lastPage.data.currentPage < lastPage.data.totalPages) {
        return lastPage.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam:1,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 0,
  });

  const allEcomms = data?.pages.flatMap((page) => page.data.items) || [];

  if (isLoading) {
    return (
      <div dir="rtl" className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {[...Array(18)].map((_, x) => (
          <div key={x.toString()}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (allEcomms.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {allEcomms.map((ecommrce) => (
            <E_commerceCard
              key={ecommrce.id}
              name={ecommrce?.name + ""}
              logo={ecommrce?.logo}
              LinkOFStore={ecommrce?.urlLinkOfStore}
              id={ecommrce.id}
              categories={[]}
              ecommerceStoreImages={[]}
            />
          ))}
        </div>

        {hasNextPage && (
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-primary text-white px-6 py-2 rounded-lg tajawal text-base font-bold"
            >
              {isFetchingNextPage ? "جاري التحميل..." : "تحميل المزيد"}
            </button>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="h-[65vh] flex items-center justify-center">
        <p className="text-center text-lg tajawal font-bold py-12">
          لا توجد متاجر في المفضلة
        </p>
      </div>
    );
  }
}

export default FavoriteEcommrces;
