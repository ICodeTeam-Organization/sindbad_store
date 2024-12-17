import React from "react";
import E_commerceCard from "./e-comm-card";
import { Shop } from "@/types/storeTypes";
import { getApi, postApi } from '@/lib/http';

const E_commerceGrid = async () => {

  const Ecommerces = await postApi<any>(
    'EcommercesStores/FilterECommerce',
    { 
      body:
        {
          "pageSize": 50,
          "pageNumber": 1,
        }
      
    }
  )
  console.log(Ecommerces?.data?.items)
  return (
    <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Ecommerces?.data?.items.length > 0 ? (
        Ecommerces?.data?.items.map((e_comm: Shop, index: number) => {
          return (
            <E_commerceCard
              key={index}
              id={e_comm.id}
              name={e_comm.name}
              LinkOFStore={e_comm.urlLinkOfStore}
              description={e_comm.description}
              logo={e_comm.logo}
              categories={e_comm.categories}
              ecommerceStoreImages={e_comm.ecommerceStoreImages}
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
