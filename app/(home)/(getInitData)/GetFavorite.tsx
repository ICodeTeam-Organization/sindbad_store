"use client";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { db } from "@/Data/database/db"; 
import { getApi } from "@/lib/http";
import {  Shop, Store } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetFavorite() {
  const { setFavoriteProducts, setFavoriteEcommerceIds, setFavoriteStoreIds } =
    useFavorite();
  const { status, data: authData } = useSession();

  const [trigged, settrigged] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const [productsResponse, storesResponse, ecommrcesResponse] =
        await Promise.allSettled([
          getApi<{ data: { productId: number }[] }>(
            `Favorites/GetFavoriteProductIds`,
            {
              pageNumber: 1,
              pageSize: 10000,
            }, 
          ),
          getApi<{ data: { items: Store[] } }>(
            `Stores?favorite=true`, 
          ),
          getApi<{ data: { items: Shop[] } }>(
            `EStores?favorite=true`, 
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
            : { items: [] },
        ecommrces:
          ecommrcesResponse.status == "fulfilled" && ecommrcesResponse.value
            ? ecommrcesResponse.value?.data
            : { items: [] },
      };
      return theData;
    },
    enabled: trigged,
    retry: 2,
  });

  useEffect(() => {
    if (status === "authenticated" && !!authData?.user?.data?.token && !trigged) {
      settrigged(true);
    }
  }, [authData]);

  useEffect(() => {
    if (data && trigged) { 
      (async () => {
        const favCache = await db.bgData
          .where("reqType")
          .equals([6, 5, 1])
          .toArray();

        const localProductIds = favCache
          .filter((item) => item.reqType === 1)
          .map((item) => +item.Id);

        const localStoreIds = favCache
          .filter((item) => item.reqType === 5)
          .map((item) => item.Id as string);

        const localEcomIds = favCache
          .filter((item) => item.reqType === 6)
          .map((item) => +item.Id);

        // البيانات الجاية من الباك
        const backendProductIds = data?.productsIds?.map(
        (item: { productId: number }) => item.productId
      ) || [];
        const backendStoreIds = data.stores?.items?.map((e) => e.id) || [];
        const backendEcomIds =
          data.ecommrces?.items?.map((e) => e.id) || [];

        // دمج البيانات: إذا فيه ID في المحلي وما هو موجود في الباك، نضيفه
        const allProductIds = Array.from(
          new Set([
            ...backendProductIds,
            ...localProductIds.filter((id) => !backendProductIds.includes(id)),
          ])
        );
        const allStoreIds = Array.from(
          new Set([
            ...backendStoreIds,
            ...localStoreIds.filter((id) => !backendStoreIds.includes(id)),
          ])
        );
        const allEcomIds = Array.from(
          new Set([
            ...backendEcomIds,
            ...localEcomIds.filter((id) => !backendEcomIds.includes(id)),
          ])
        );

        // حفظهم في الستور
         
        setFavoriteProducts(allProductIds);
        setFavoriteStoreIds(allStoreIds);
        setFavoriteEcommerceIds(allEcomIds);

        // setFavoriteProducts(productIds || []);
        // setFavoriteEcommerceIds(
        //   data.ecommrces?.items?.map((e) => e?.ecommerceStoreId) || []
        // );
        // setFavoriteStoreIds(data.stores?.items?.map((e) => e.storeId) || []);
      })();
    }
  }, [data]);

  return null; // No UI needed
}
