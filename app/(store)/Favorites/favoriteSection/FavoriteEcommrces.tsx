"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FavoriteEcommerces } from "@/types/storeTypes";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import E_commerceCard from "../../e-commerce/components/e-comm-card";

function FavoriteEcommrces() {
  const { data: authData } = useSession();
  const { data, isLoading } = useQuery<{
    data: { data: {items:FavoriteEcommerces[]} };
  }>({
    queryKey: ["GetFavoriteEcommerceStores"],
    queryFn: async () =>
      await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + `FavoriteShop/GetFavoriteEcommerceStores`,
        {
          headers: {
            Authorization: `Bearer ${authData?.user.data.token}`,
          },
        }
      ),
  });

  if (isLoading) {
    return (
      <div dir="rtl" className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {[...Array(18)].map((_, x) => (
          <div key={x.toString()} className=" ">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }


  if (data?.data && data?.data.data.items.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {data?.data.data.items.map((ecommrce) => (
            <E_commerceCard
              key={ecommrce.ecommerceStoreId}
              name={ecommrce?.ecommerceStoreName+""}
              mainImageUrl={ecommrce?.logo}
              storeCategories={[]}
              imagesUrl={[]}
              LinkOFStore={ecommrce?.urlLinkOfStore}
              id={ecommrce.ecommerceStoreId+""}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <p className="text-center text-2xl font-bold py-12">
        لايتوفر أي متجر في الوقت الحالي
      </p>
    );
  }
}

export default FavoriteEcommrces;
