"use client";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { E_commerceCardProps } from "../types";
import SafeImage from "@/components/SafeImage";
import { cn, goToExtrnalLink } from "@/lib/utils"; 
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link"; 
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";

const E_commerceCard = ({
    id,
    name,
    LinkOFStore,
    description,
    logo,
    // categories,
    // ecommerceStoreImages,
}: E_commerceCardProps) => {

  const {
    favoriteEcommerceIds,
    addEcommerceToFavorite,
    delEcommerceFromFavorite,
  } = useFavorite();
  const isFavorite = favoriteEcommerceIds.find((ele) => ele == +id);
  const { status } = useSession(); 

  const {setSpecialOrderState} = useSpecialOrdersDialogsStore()

  
  //   mutationFn: async () => {
  //     return postApi(
  //       `FavoriteShop/AddEcommerceStore`,
        
  //       {
  //         headers: {
  //           "Accept-Language": "ar",
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${session?.user?.data?.token}`,
  //         },
  //         body:{
  //           ecommerceStoreId: id,
  //         },
  //       }
  //     );
  //   },
  //   onSuccess: () => {
  //     addEcommerceToFavorite(+id);
  //   },
  //   onError: (error: any) => {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       "حدث خطأ أثناء إضافة المتجر إلى المفضلة";
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
  //       return await deleteApi(
  //           `FavoriteShop/RemoveEcommerceStore/` +
  //           id,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user?.data?.token}`,
  //           },
  //         }
  //       );
  //     },
  //     onSuccess: () => {
  //       delEcommerceFromFavorite(+id);
  //     },
  //     onError: (error: any) => {
  //       const errorMessage =
  //         error.response?.data?.message ||
  //         "حدث خطأ أثناء حذف المتجر إلى المفضلة";
  //       toast({
  //         variant: "destructive",
  //         description: `خطأ: ${errorMessage}`,
  //         action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
  //       });
  //     },
  //   });
  const redirct = useRouter();

  const handleFav = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      if (isFavorite) {
        // mutateRemoveFromFav();
        delEcommerceFromFavorite(id)
      } else {
        addEcommerceToFavorite(id)

        // mutateAddToFav();
      }
    }
  };

  return (
    <div
      dir="rtl"
      className="border tajawal rounded-lg shadow-sm relative w-full max-w-[380px] mx-auto text-center"
    >
      <SafeImage
        src={logo}
        alt={name}
        className="w-full h-[250px] object-scale-down"
        width={500}
        height={500}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{name}</h2>
        <p className="text-[#666] text-sm">{description}</p>

        <div className="flex flex-wrap   w-full  gap-x-1 mt-6 ] ">
          <Link
            target="_blank"
            href={goToExtrnalLink(LinkOFStore + "")}
            className="flex-1 min-w-[70px] h-[40px] border border-gray text-black text-[13px] rounded-md flex justify-center items-center "
          >
            الإنتقال الى المتجر
          </Link>
          <div
             onClick={()=>{
              setSpecialOrderState(true,3,undefined,id)
             }}
            className="flex-1 min-w-[80px] h-[40px] border border-gray text-black text-[13px] rounded-md flex justify-center items-center "
          >
            طلب من المتجر
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFav()
            }}
            className={cn(
              "group w-[40px] z-10 hover:shadow transition h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center ",
              isFavorite && "bg-red-500 text-white"
            )}
          >
            {false? (
              <Loader2 className="animate-spin" />
            ) : isFavorite ? (
              <IoMdHeart className="w-4 h-4" />
            ) : (
              <IoMdHeartEmpty className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default E_commerceCard;
