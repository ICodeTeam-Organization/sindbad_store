import React from "react";
import E_commerceCard from "./e-comm-card";
import { Shop } from "@/types/storeTypes";

// const e_commers = [
//     {
//       image: alibaba,
//       title: "علي بابا",
//       description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
//     }
//   ];

const E_commerceGrid = ({ allEcommerces }: any) => {
  return (
    <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allEcommerces?.length > 0 ? (
        allEcommerces.map((e_comm: Shop, index: number) => {
          return (
            <E_commerceCard
              key={index}
              id={e_comm.id + ""}
              imagesUrl={[]}
              mainImageUrl={e_comm.logo}
              name={e_comm.name}
              storeCategories={[]}
              LinkOFStore={e_comm.urlLinkOfStore}
            />
          );
        })
      ) : (
        <p className="text-center text-xl font-bold py-12">
          لايتوفر أي اسواق في الوقت الحالي
        </p>
      )}
    </div>
  );
};

export default E_commerceGrid;
