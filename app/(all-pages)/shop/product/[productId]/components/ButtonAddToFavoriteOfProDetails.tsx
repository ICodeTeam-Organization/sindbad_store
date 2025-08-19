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
        " bg-white p-3 rounded shadow-sm   mt-0 cursor-pointer  group"
        // isInFavorite && "bg-[#F55157]"
      )}
    >
      <FaHeart 
        className={cn(
          " text-2xl text-gray-300 duration-300 translate-y-[1px]  backdrop:", 
          isInFavorite && "text-red-500"
        )}
      />
       
    </div>
  );
};

export default ButtonAddToFavoriteOfProDetails;
