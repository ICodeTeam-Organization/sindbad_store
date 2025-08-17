"use client";
import ProductCard from "@/components/product_card/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import {  postApi } from "@/lib/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

interface PropsType {
  storeId: string;
}

type ProductResponse = {
  success: boolean;
  message: string;
  data: {
    items: NormalizedProductType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

function StoreProductsTab({ storeId }: PropsType) {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["store_products", storeId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await postApi<ProductResponse>(
          `Products/GetProductsWitheFilter?returnDtoName=2`,
          {
            body: {
              storeId,
              pageNumber: pageParam,
              pageSize: 20,
            },
          }
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        const data = response.data;

        return data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.currentPage < lastPage?.totalPages) {
          return lastPage?.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1, // هذا عشان ما يعمل فتش اول مره من الرياكت كويري لاني جلبت الداتا من السيرفر ومررتها كبينانات اولية
    });

  // Combine all orders from fetched pages
  const products = (
    data?.pages.flatMap((page) => page?.items.map(normalizeProduct)) || []
  ).filter((ele) => !!ele);

  if (isFetching) {
    return (
      <div
        dir="rtl"
        className="grid grid-cols-6 mt-5 items-center justify-center max-xlHalf:grid-cols-5 max-lgHalf:grid-cols-4 max-mdHalf:grid-cols-3 max-smHalf:grid-cols-2 max-xxs:grid-cols-1 gap-4 px-2"
      >
        {Array.from({ length: 8 }).map((_,x) => (
          <div className="w-full" key={x}>
            {" "}
            <ProductCardSkeleton />{" "}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div
          dir="rtl"
          className="grid grid-cols-6 mt-5 max-xlHalf:grid-cols-5 max-lgHalf:grid-cols-4 max-mdHalf:grid-cols-3 max-smHalf:grid-cols-2 max-xxs:grid-cols-1 gap-4 px-2"
        >
          {products.map((product: NormalizedProductType) => (
            <div key={product.id} className=" ">
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex items-center justify-center w-full  ">
          <p className="text-center text-gray-500 mt-10">
            لا توجد منتجات متاحة حاليًا
          </p>
        </div>
      )}

      {hasNextPage && (
        <div onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>تحميل المزيد</span>
          )}
        </div>
      )}
    </>
  );
}

export default StoreProductsTab;
