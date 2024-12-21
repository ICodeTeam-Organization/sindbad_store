"use client";
import ProductCard from "@/app/(home)/components/product-card";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getApi } from "@/lib/http";
import { FavoriteProduct } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function FavoriteProducts() {
  const { data: session, status } = useSession();

  const { data, isLoading } = useQuery<{ data: { data: FavoriteProduct[] } }>({
    queryKey: ["get-favorite-products-all"],
    queryFn: () =>
      getApi(
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
      ),
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
      ) : data?.data.data && data?.data.data.length > 0 ? (
        data.data.data.map((product: FavoriteProduct) => (
          <div key={product.productId} className="sm:w-[220px]  w-[180px] ">
            <ProductCard
              id={product.productId + ""}
              ProductDet={product.productId}
              image={product.mainImageUrl}
              price={product.price}
              // oldPrice={product.priceBeforeDiscount}
              productName={product.productName}
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
