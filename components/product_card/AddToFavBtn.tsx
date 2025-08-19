"use client";
import { AiFillHeart,   } from "react-icons/ai";
import { useSession } from "next-auth/react"; 
import React from "react";
import { cn } from "@/lib/utils";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { toast } from "react-toastify";

function AddToFavBtn({ id }: { id: number }) {
  const { status } = useSession();
  const { productsIds, addProductToFavorite, delProductFromFavorite } =
    useFavorite();
  const isInFavorite = productsIds.includes(+id);

  const handleAddToFav = () => {
    if (status === "unauthenticated") {
       toast.error("يجب عليك تسجيل الدخول اولاً")
    }
    else if (status === "authenticated") {
      if (isInFavorite) {
        delProductFromFavorite(+id);
        // mutationFavDel.mutate()
      } else {
        addProductToFavorite(+id);
        // mutationFav.mutate();
      }
    }
  };

  return (
    <div className="group cursor-pointer flex gap-x-2 hover:bg-red-600 inset-40  shadow-md rounded-full overflow-hidden">
      <div
        onClick={() => handleAddToFav()}
        className={cn(
          " p-2 bg-white bg-opacity-85  cursor-pointer duration-300",
          isInFavorite && "bg-red-600"
        )}
      >
        <AiFillHeart
          className={cn(
            "w-[18px] h-[18px] text-gray-400  hover:text-danger transition-colors duration-300",
          isInFavorite && "text-white group-hover:text-white "

          )}
        />
      </div>
    </div>
  );
}

export default AddToFavBtn;
