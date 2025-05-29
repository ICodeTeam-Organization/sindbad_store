import React from "react";
import FavoriteProducts from "./favoriteSection/FavoriteProducts";
import FavoriteStores from "./favoriteSection/FavoriteStores";
import FavoriteEcommrces from "./favoriteSection/FavoriteEcommrces";
import { FcLike } from "react-icons/fc";
import FavoriteTabs from "./FavoriteTabs";
const Favorites = async () => {



  return (
    <div  className="xl:container mx-auto xl:px-6">
      <div className=" mt-10 mb-6 flex gap-x-3 items-center mdHalf:mx-auto mx-4">
        <FcLike size={30} />
        <h2 className="h2 mdHalf:text-lg text-base tajawal   font-bold">
          منتجات ومحلات و متاجر أعجبتك
        </h2>
      </div>
      <FavoriteTabs
        tabLabels={{
          details: "المنتجات",
          features: "المتاجر",
          reviews: "المحلات",
        }}
        tabContent={{
          tap1: <FavoriteProducts />,
          tap2: <FavoriteEcommrces />,
          tap3: <FavoriteStores />,
        }}
      />
    </div>
  );
};

export default Favorites;
