import React from "react";
import FavoriteProducts from "./favoriteSection/FavoriteProducts";
import FavoriteStores from "./favoriteSection/FavoriteStores";
import FavoriteEcommrces from "./favoriteSection/FavoriteEcommrces"; 
import FavoriteTabs from "./FavoriteTabs";
const Favorites = async () => {
  return (
    <div className="bg-bg-100 p-4">
      <div className="xl:container xl:mx-auto  xl:px-6 bg-white   rounded-md shadow-sm">
      
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
    </div>
  );
};

export default Favorites;
