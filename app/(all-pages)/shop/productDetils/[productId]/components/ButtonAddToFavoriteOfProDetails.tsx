"use client"; 
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 
import React from "react";
import { cn } from "@/lib/utils";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { FaHeart } from "react-icons/fa";

type Props = {
  id: string | number;
};

const ButtonAddToFavoriteOfProDetails = ({ id }: Props) => {
  const redirct = useRouter();
  const { status } = useSession();
  const { productsIds, addProductToFavorite, delProductFromFavorite } =
    useFavorite();
  const isInFavorite = productsIds.includes(+id);

  const handleAddToFav = () => {
    if (status === "unauthenticated") redirct.push("/auth");
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
    <div
      onClick={() => handleAddToFav()}
      className={cn(
        "bg-white bg-opacity-95 p-3 cursor-pointer rounded-full shadow-sm hover:shadow-lg duration-300 border group"
        // isInFavorite && "bg-[#F55157]"
      )}
    >
      <FaHeart 
        className={cn(
          " text-2xl text-[#D5D5D5] duration-300 translate-y-[1px]  backdrop:", 
          isInFavorite && "text-red-500"
        )}
      />
       
    </div>
  );
};

export default ButtonAddToFavoriteOfProDetails;
