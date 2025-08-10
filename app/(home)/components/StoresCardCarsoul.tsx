import React from "react";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react"; 
import SafeImage from "@/components/SafeImage";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { useRouter } from "next-nprogress-bar";

const StoresCardCarsoul: React.FC<{
  id: string;
  name: string;
  websiteLink: string;
  description: string;
  mainImageUrl: string;
  imagesUrl: string[];
  rate?: number;
}> = (store) => {
  const { favoriteStoreIds, addStoreToFavorite, delStoreToFavorite } =
    useFavorite();
  const isFavorite = favoriteStoreIds.find((ele) => ele == store.id);
  const { status } = useSession();
  const redirct = useRouter(); 

  // const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
  //   mutationFn: async () => {
  //     return await postApi(``, {
  //       body: {
  //         storeId: store.id,
  //       },
  //       headers: {
  //         "Accept-Language": "ar",
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${session?.user?.data?.token}`,
  //       },
  //     });
  //   },
  //   onSuccess: () => {
  //     addStoreToFavorite(store.id);
  //   },
  //   onError: (error: any) => {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       "حدث خطأ أثناء إضافة المحل إلى المفضلة";
  //     toast({
  //       variant: "destructive",
  //       description: `خطأ: ${errorMessage}`,
  //       action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
  //     });
  //   },
  // });

  // const { mutate: mutateRemoveFromFav, isPending: isPendingRemoveFromFav } =
  //   useMutation({
  //     mutationFn: async () => {
  //       return await deleteApi(`` + store.id, {
  //         headers: {
  //           Authorization: `Bearer ${session?.user?.data?.token}`,
  //         },
  //       });
  //     },
  //     onSuccess: () => {
  //       delStoreToFavorite(store.id);
  //     },
  //     onError: (error: any) => {
  //       const errorMessage =
  //         error.response?.data?.message ||
  //         "حدث خطأ أثناء حذف المحل إلى المفضلة";
  //       toast({
  //         variant: "destructive",
  //         description: `خطأ: ${errorMessage}`,
  //         action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
  //       });
  //     },
  //   });
  const router = useRouter()
  const handleAddToFav = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      if (isFavorite) {
        // mutateRemoveFromFav();
        delStoreToFavorite(store.id);
      } else {
        // mutateAddToFav();
        addStoreToFavorite(store.id);
      }
    }
  };

  return (
    <div className="px-2" onClick={()=>router.push("/stores/storeDetails/" + store.id)}> 
      <div
        dir="rtl"
        className="group lgHalf:h-[135px] overflow-hidden hover:cursor-pointer border border-gray-300 rounded-[10px] bg-white hover:border-[#F58634] transition-all duration-700"
      >
        <div className="lgHalf:flex flex-row items-stretch h-full lgHalf:p-3 p-2 gap-3">
          <div className="flex justify-center items-center lgHalf:aspect-[10/7] aspect-square overflow-hidden rounded-[8px] relative">
            <SafeImage
              src={store.mainImageUrl}
              alt={store.name}
              fill
              className="object-cover" width={0} height={0}            />
            <a  
              onClick={(e) => {
                handleAddToFav();
                e.stopPropagation()
              }}
              className={cn(
                "cursor-pointer top-2 right-2 p-2 opacity-85 hover:opacity-100 rounded-full absolute shadow-sm group bg-[#fff] hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300 flex justify-center items-center",
                isFavorite && "bg-[#F55157] text-white"
              )}
            >
              {
                // isPendingAddToFav || isPendingRemoveFromFav ? (
                //   <Loader2 className="animate-spin" />
                // ) :
                <AiFillHeart
                  className={cn(
                    "w-[20px] h-[20px] translate-y-[1.5px]",
                    isFavorite && "block"
                  )}
                />
              }
            </a>
          </div>

          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="my-2">
              <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
                {store.name}
              </h1>
              <p className="mdHalf:text-sm text-[10px] line-clamp-1 my-1 text-[#666666]">
                {store.description || "."}
              </p>
            </div>

            <div className="flex w-full gap-x-2">
              {!store.websiteLink ? (
                <div className="flex-1 p-2 cursor-pointer rounded-[8px] border transition-all duration-300 flex justify-center items-center border-gray-200">
                  <h1 className="text-base text-gray-500">
                    لا يوجد رابط للمحل
                  </h1>
                </div>
              ) : (
                <Link
                  href={store.websiteLink}
                  target="_blank"
                  onClick={e=>e.stopPropagation()}
                  className="flex-1 p-2 cursor-pointer rounded-[6px] border hover:bg-[#F58634] hover:border-[#F58634] hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
                >
                  <h1 className="text-sm">تصفح المحل</h1>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default StoresCardCarsoul;
