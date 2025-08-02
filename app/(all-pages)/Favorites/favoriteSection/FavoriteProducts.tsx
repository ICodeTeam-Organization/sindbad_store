"use client";
import ProductCard from "@/components/product_card/ProductCard";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { db } from "@/Data/database/db";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import useSendDataInBg from "@/hooks/useSendDataInBg";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type ApiResponse = {
  data: {
    items: NormalizedProductType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  message: string;
  success: boolean;
};

function FavoriteProducts() {


  const { mutateAsync } = useSendDataInBg();

  const { data, isLoading } = useQuery<NormalizedProductType[]>({
    queryKey: ["get-favorite-products-all"],
    queryFn: async () => {
      const data = await db.bgData.where('reqType').equals(1).toArray();
      if (data.length > 0) {
        await mutateAsync(data)
      }
      const dt = await getApi<ApiResponse>(
        "Favorites/GetAllCustomerFavoritesWithPagination",
        {
          pageNumber: 1,
          PageSize: 100
        },
      );
      return (dt.data?.items.map(normalizeProduct))

    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 0,
    // enabled: status == "authenticated",
  });

  const { productsIds } = useFavorite();

  return (
    <div
      dir="rtl"
      className="mb-12 flex flex-wrap  justify-center mdHalf:gap-6  gap-3"
    >
      {isLoading ? (
        [...Array(18)].map((_, x) => (
          <div key={x.toString()} className="sm:w-[220px] w-[180px]">
            <ProductCardSkeleton />
          </div>
        ))
      ) : data && data.filter(e => productsIds.includes(+e.id)).length > 0 ? (
        data.filter(e => productsIds.includes(+e.id)).map((product: NormalizedProductType) => (
          <div key={product.id} className="sm:w-[220px]  w-[180px] ">
            <ProductCard
              key={product.id}
              data={product}
            />
          </div>
        ))
      ) : (
        <div className="h-[65vh] flex items-center justify-center">
          <p className="text-center text-lg tajawal font-bold py-12">
            لايتوفر أي منتج في المفضلة
          </p>
        </div>
      )}
    </div>
  );
}

export default FavoriteProducts;
