// "use client";
// import StoreCard from "../../stores/components/store-card";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { FavoriteStores as FavoriteStoresType } from "@/types/storeTypes";
// import ProductCardSkeleton from "@/components/ProductCardSkeleton";
// import { getApi } from "@/lib/http";

// function FavoriteStores() {
//   const { data: authData, status } = useSession();
//   const { data, isLoading } = useQuery<
//    { data: {items:FavoriteStoresType[]} }
//   >({
//     queryKey: ["favorites-stores"],
//     queryFn: async () =>
//       await getApi(
//         ``,
//         {
//           headers: {
//             Authorization: `Bearer ${authData?.user?.data?.token}`,
//           },
//         }
//       ),
//      enabled: status == "authenticated"
//   });

//   if (isLoading) {
//     return (
//       <div dir="rtl" className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
//         {[...Array(18)].map((_, x) => (
//           <div key={x.toString()} className=" ">
//             <ProductCardSkeleton />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (data?.data && data?.data.items.length > 0) {
//     return (
//       <>
//         <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
//           {data?.data.items.map((store) => (
//             <StoreCard
//               key={store.storeId}
//               id={store.storeId}
//               name={store.storeName}
//               imagesUrl={[]}
//               storeCategories={[]}
//               mainImageUrl={store.imageUrl}
//               websiteLink=""
//             />
//           ))}
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <div className="h-[65vh] flex items-center justify-center">
//         <p className="text-center text-lg tajawal font-bold py-12">
//           لا توجد محلات في المفضلة
//         </p>
//       </div>
//     );
//   }
// }

// export default FavoriteStores;

"use client";
import StoreCard from "../../stores/components/store-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Store } from "@/types/storeTypes";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getApi } from "@/lib/http";
import React from "react";
import useSendDataInBg from "@/hooks/useSendDataInBg";
import { db } from "@/Data/database/db";

type ApiResponse = {
  data: {
    items: Store[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};

function FavoriteStores() {
  const { mutateAsync } = useSendDataInBg();
  const { status } = useSession();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiResponse>({
      queryKey: ["favorites-stores"],
      queryFn: async ({ pageParam = 1 }) => {
        const localData = await db.bgData.where("reqType").equals(5).toArray();
        if (localData.length > 0) {
          await mutateAsync(localData);
        }
        return await getApi(`Stores?pageNumber=${pageParam}&pageSize=10&favorite=true` );
      },
      enabled: status === "authenticated",
      getNextPageParam: (lastPage) => {
        console.log(lastPage,);
        
        if (lastPage.data.currentPage < lastPage.data.totalPages) {
          return lastPage.data.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 0,
    });

  const allStores = data?.pages.flatMap((page) => page.data.items) || [];

  console.log(data,"THSI IS I SIS SISISIS IS SIS SIS SI SI SI SI SI SI SI SI SI SIS SIS SIS SIS SIS SI SIS SIS SI SI SI SI SI SI SI SI Si");
  

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
      >
        {[...Array(8)].map((_, x) => (
          <div key={x.toString()}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (allStores.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {allStores.map((store) => (
            <StoreCard
              key={store.id}
              id={store.id}
              name={store.name}
              imagesUrl={[]}
              storeCategories={[]}
              mainImageUrl={store.imageUrl}
              websiteLink=""
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
  }

  return (
    <div className="h-[65vh] flex items-center justify-center">
      <p className="text-center text-lg tajawal font-bold py-12">
        لا توجد محلات في المفضلة
      </p>
    </div>
  );
}

export default FavoriteStores;
