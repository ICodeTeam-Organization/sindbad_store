"use client";
import ProductCard from "@/app/(home)/components/product-card";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

function FavoriteProducts() {
  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery<NormalizedProductType[]>({
    queryKey: ["get-favorite-products-all"],
    queryFn: async () =>
     {
      const dt = await  getApi<{data:any[]}>(
          "Favorites/GetAllCustomerFavoritesWithPagination",
          {
            pageNumber:1,
            PageSize:100
          },
        {
          headers: {
            Authorization: `Bearer ${session?.user.data.token}`,
          },
        }
      ); 
       
      return ( dt.data.map(normalizeProduct))
      
     },
    enabled: status == "authenticated",
  });

  

  return (
    <div
      dir="rtl"
      className="mb-12 flex flex-wrap  justify-center mdHalf:gap-6  gap-3"
    >
      {isLoading ? (
        [...Array(18)].map((_, x) => (
          <div key={x.toString()} className="sm:w-[220px]  w-[180px] ">
            <ProductCardSkeleton />
          </div>
        ))
      ) : data && data.length > 0 ? (
         data.map((product: NormalizedProductType) => (
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
