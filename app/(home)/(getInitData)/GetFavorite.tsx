"use client";
import { useFavorite } from "@/app/stores/favoritesStore";
import { FavoriteEcommerces, FavoriteStores } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetFavorite() {

  const { pageNumber, pageSize, setFavoriteProducts,setFavoriteEcommerceIds,setFavoriteStoreIds } = useFavorite();
  const { status, data: authData } = useSession();

  const [trigged, settrigged] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["favorites", pageNumber, pageSize],
    queryFn: async () => {
      const [productsResponse, storesResponse, ecommrcesResponse] = await Promise.allSettled([
        axios.get(
          process.env.NEXT_PUBLIC_BASE_URL +
            `Favorites/GetFavoriteProductIds?pageNumber=${pageNumber}&PageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${authData?.user.data.token}`,
            },
          }
        ),
        axios.get(
          process.env.NEXT_PUBLIC_BASE_URL +
            `FavoriteShop/GetFavoriteStores`,
          {
            headers: {
              Authorization: `Bearer ${authData?.user.data.token}`,
            },
          }
        ),
        axios.get(
          process.env.NEXT_PUBLIC_BASE_URL +
            `FavoriteShop/GetFavoriteEcommerceStores`,
          {
            headers: {
              Authorization: `Bearer ${authData?.user.data.token}`,
            },
          }
        ),
      ]);
  
      
      // if there any error or not found then will return empty array
      return {
        productsIds:productsResponse.status == "fulfilled" ? productsResponse.value.data?.data : [],
        stores: storesResponse.status == "fulfilled" ? storesResponse.value.data?.data : [],
        ecommrces: ecommrcesResponse.status == "fulfilled" ? ecommrcesResponse.value.data?.data : [],
      } as {
        productsIds:{productId:number}[],
        stores:{items:FavoriteStores[]}
        ecommrces:{items:FavoriteEcommerces[]}
      } ;
    },
    enabled: trigged,
  });
  

  useEffect(() => {
    if (status === "authenticated" && !!(authData?.user.data.token)) {
      settrigged(true)
    }
    if (data) {
      
      const productIds = data?.productsIds?.map(
        (item: { productId: number }) => item.productId
      );
      
      setFavoriteProducts(productIds);
      setFavoriteEcommerceIds(data.ecommrces?.items?.map((e)=>e.ecommerceStoreId));
      setFavoriteStoreIds(data.stores?.items.map((e)=>e.storeId))
    }
  }, [data,authData]);

  return null; // No UI needed
}
