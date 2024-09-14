import React from "react";
import StoreCard from "./StoreCard";
import store from '../../../../public/images/store-IKEA.svg';

const stores = [
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: store,
    title: "شركة ايكيا للاثاث",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
];

const StoreGrid = () => {
    return (
      <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {stores.map((store, index) => (
          <StoreCard key={index} {...store} />
        ))}
      </div>
    );
  };
  

export default StoreGrid;
