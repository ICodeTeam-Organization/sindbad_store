"use client";
import StoreCard from "../../stores/components/store-card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FavoriteStores as FavoriteStoresType } from "@/types/storeTypes";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getApi } from "@/lib/http";

function FavoriteStores() {
  const { data: authData, status } = useSession();
  const { data, isLoading } = useQuery<
   { data: {items:FavoriteStoresType[]} }
  >({
    queryKey: ["favorites-stores"],
    queryFn: async () =>
      await getApi(
        `FavoriteShop/GetFavoriteStores`,
        {
          headers: {
            Authorization: `Bearer ${authData?.user.data.token}`,
          },
        }
      ),
     enabled: status == "authenticated"
  });

  if (isLoading) {
    return (
      <div dir="rtl" className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {[...Array(18)].map((_, x) => (
          <div key={x.toString()} className=" ">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (data?.data && data?.data.items.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {data?.data.items.map((store) => (
            <StoreCard
              key={store.storeId}
              id={store.storeId}
              name={store.storeName}
              imagesUrl={[]}
              storeCategories={[]}
              mainImageUrl={store.imageUrl}
              websiteLink=""
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="h-[65vh] flex items-center justify-center">
        <p className="text-center text-lg tajawal font-bold py-12">
          لا توجد محلات في المفضلة
        </p>
      </div>
    );
  }
}

export default FavoriteStores;
