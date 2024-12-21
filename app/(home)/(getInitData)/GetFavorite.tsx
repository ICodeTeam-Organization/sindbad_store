"use client";
import { useFavorite } from "@/app/stores/favoritesStore";
import { getApi } from "@/lib/http";
import {
  FavoriteEcommerces,
  FavoriteStores,
} from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetFavorite() {
  const { setFavoriteProducts, setFavoriteEcommerceIds, setFavoriteStoreIds } =
    useFavorite();
  const { status, data: authData } = useSession();

  const [trigged, settrigged] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      
      const [productsResponse, storesResponse, ecommrcesResponse] =
        await Promise.allSettled([
          getApi<{data:{ productId: number }[]}>(
              `Favorites/GetFavoriteProductIds`,{
                pageNumber:1,
                pageSize:10000,
              },
               {
                headers: {
                  Authorization: `Bearer ${authData?.user.data.token}`,
                },
              }
          ),
          getApi<{data:{items:FavoriteStores[]}}>(
            `FavoriteShop/GetFavoriteStores`,{},
            {
             headers: {
               Authorization: `Bearer ${authData?.user.data.token}`,
             },
           }
          ),
          getApi<{data:{items:FavoriteEcommerces[]}}>(
              `FavoriteShop/GetFavoriteEcommerceStores`,{},
              {
               headers: {
                 Authorization: `Bearer ${authData?.user.data.token}`,
               },
             }
          ),
        ]);

      // if there any error or not found then will return empty array
      const theData = {
        productsIds:
          productsResponse.status == "fulfilled" && productsResponse.value
            ? productsResponse.value?.data
            : [],
        stores:
          storesResponse.status == "fulfilled" && storesResponse.value
            ? storesResponse.value?.data
            : {items:[]},
        ecommrces:
          ecommrcesResponse.status == "fulfilled" && ecommrcesResponse.value
            ? ecommrcesResponse.value?.data
            : {items:[]},
      };
      console.log(theData,"this is favorite data");

      return theData;
    },
    enabled: trigged,
  });

  useEffect(() => {
    if (status === "authenticated" && !!authData?.user.data.token && !trigged) {
      settrigged(true);
    }
  }, [authData]);

  useEffect(() => {
    if (data && trigged) {
      const productIds = data?.productsIds?.map(
        (item: { productId: number }) => item.productId
      );
      setFavoriteProducts(productIds || []);
      setFavoriteEcommerceIds(
        data.ecommrces?.items?.map((e) => e?.ecommerceStoreId) || []
      );
      setFavoriteStoreIds(data.stores?.items?.map((e) => e.storeId)|| []);
    }
  }, [data]);

  return null; // No UI needed
}
