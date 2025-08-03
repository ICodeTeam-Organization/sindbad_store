// "use client"
// import React from "react";
// import Image from "next/image";
// import { AiFillHeart } from "react-icons/ai";
// import { IoIosArrowBack } from "react-icons/io";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useSession } from "next-auth/react";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { Shop } from "@/types/storeTypes";
// import { useFavorite } from "@/app/stores_mangament/favoritesStore";

// const EshopsCardCarsoul: React.FC<Shop> = ({
//   description,
//   name,
//   // ecommerceStoreImages,
//   id: ecommrcesId,
//   logo,
//   urlLinkOfStore,
// }) => {
//   const {
//     favoriteEcommerceIds,
//     addEcommerceToFavorite,
//     delEcommerceFromFavorite,
//   } = useFavorite();
//   const isFavorite = favoriteEcommerceIds.find((ele) => ele == ecommrcesId);
//   const { data: session, status } = useSession();
//   const { toast } = useToast();

//   const redirct = useRouter();

//   const handleAddToFav = () => {
//     if (status === "unauthenticated") redirct.push("/auth");
//     else if (status === "authenticated") {
//       if (isFavorite) {
//         delEcommerceFromFavorite(ecommrcesId);
//       } else {
//         addEcommerceToFavorite(ecommrcesId);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center w-[35%] h-full relative  ">
//         {logo === null ? (
//           <h1>لاتوجد صورة للمتجر</h1>
//         ) : (
//           <Image
//             src={
//               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
//             }
//             alt={"shop"}
//             layout="fill"
//             className="object-contain"
//           />
//         )}
//       </div>
//       <div className="flex-1 flex flex-col justify-between h-full py-2">
//         <div>
//           <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
//             {name}
//           </h1>
//           <p className="mdHalf:text-sm text-[11px] line-clamp-1 my-2 text-[#666666]">
//             {description ? description : " ."}
//           </p>
//           {/* <div className="flex items-center max-sm:w-20 mb-1">
//             <AiFillStar className="text-[#FFC62A] text-xs" />
//             <p className="text-[#A5A5A5] text-[12px] mr-1">(4.5)</p>
//           </div> */}
//         </div>
//         <div className="flex  w-full gap-x-2   ">
//           {urlLinkOfStore === null ? (
//             <div className="flex-1 p-2 cursor-pointer rounded-sm border-[1px] group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200">
//               <h1 className="text-base">لا يوجد رابط للمتجر</h1>
//               <IoIosArrowBack />
//             </div>
//           ) : (
//             <Link
//               href={urlLinkOfStore}
//               target="_blank"
//               className="flex-1 p-2 cursor-pointer rounded-sm border-[1px] group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
//             >
//               <h1 className="text-base">زيارة المتجر</h1>
//               <IoIosArrowBack />
//             </Link>
//           )}

//           <Button
//             variant={"outline"}
//             onClick={handleAddToFav}
//             className={cn(
//               "cursor-pointer group hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300  rounded-[5px]  border-[1px] flex justify-center items-center p-4 py-5 ml-2",
//               isFavorite && "bg-[#F55157] text-white"
//             )}
//           >
//             <AiFillHeart
//               className={cn("w-[20px] h-[20px] ", isFavorite && "block")}
//             />
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EshopsCardCarsoul;

"use client";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { cn } from "@/lib/utils";
import { Shop } from "@/types/storeTypes";
import SafeImage from "@/components/SafeImage";

const EshopsCardCarsoul: React.FC<Shop> = ({
  description,
  name,
  id: ecommrcesId,
  logo,
  urlLinkOfStore,
}) => {
  const {
    favoriteEcommerceIds,
    addEcommerceToFavorite,
    delEcommerceFromFavorite,
  } = useFavorite();

  const isFavorite = favoriteEcommerceIds.find((ele) => ele == ecommrcesId);

  const router = useRouter();

  const handleAddToFav = () => {
    if (status === "unauthenticated") router.push("/auth");
    else if (status === "authenticated") {
      if (isFavorite) {
        delEcommerceFromFavorite(ecommrcesId);
      } else {
        addEcommerceToFavorite(ecommrcesId);
      }
    }
  };

  return (
    <div className="px-2">
      <div
        dir="rtl"
        className="group lgHalf:h-[135px] overflow-hidden hover:cursor-pointer border border-gray-300 rounded-[10px] bg-white hover:border-[#F58634] transition-all duration-700"
      >
        <div className="lgHalf:flex flex-row items-stretch h-full lgHalf:p-3 p-2 gap-3">
          <div className="flex justify-center items-center lgHalf:aspect-[10/7] aspect-square overflow-hidden rounded-[8px] relative">
            {logo ? (
              <SafeImage
                src={logo}
                alt={name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="text-sm text-gray-400 text-center">
                لا توجد صورة للمتجر
              </div>
            )}

            <a
              onClick={(e) => {
                handleAddToFav();
                e.stopPropagation();
              }}
              className={cn(
                "cursor-pointer top-2 right-2 p-2 opacity-85 hover:opacity-100 rounded-full absolute shadow-sm group bg-[#fff] hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300 flex justify-center items-center",
                isFavorite && "bg-[#F55157] text-white"
              )}
            >
              <AiFillHeart
                className={cn(
                  "w-[20px] h-[20px] translate-y-[1.5px]",
                  isFavorite && "block"
                )}
              />
            </a>
          </div>

          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="my-2">
              <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
                {name}
              </h1>
              <p className="mdHalf:text-sm text-[10px] line-clamp-1 my-1 text-[#666666]">
                {description || "."}
              </p>
            </div>

            <div className="flex w-full gap-x-2">
              {!urlLinkOfStore ? (
                <div className="flex-1 p-2 cursor-pointer rounded-[8px] border transition-all duration-300 flex justify-center items-center border-gray-200">
                  <h1 className="text-base text-gray-500">
                    لا يوجد رابط للمتجر
                  </h1>
                </div>
              ) : (
                <Link
                  href={urlLinkOfStore}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 p-2 cursor-pointer rounded-[6px] border hover:bg-[#F58634] hover:border-[#F58634] hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
                >
                  <h1 className="text-sm">زيارة المتجر</h1>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EshopsCardCarsoul;
