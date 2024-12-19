import React from "react";
import StoreCard from "./store-card";
import { getApi } from "@/lib/http";
import { StoreCardProps } from "../typest";
import Pagination from "@/components/Pagination";

const StoreGrid = async () => {
  const storesResponse = await getApi<any>(
    "Market/Store/GetAllStoresThatHasLinksToOnlineWebsite"
  );

  const stores = storesResponse.data; 
  
  if (stores.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {stores.map((store: StoreCardProps) => (
            <StoreCard key={store.id} id={store.id} name={store.name} imagesUrl={store.imagesUrl} />
          ))}
        </div>
        <Pagination />
      </>
    );
  } else {
    return (
      <p className="text-center text-2xl font-bold py-12">
        لايتوفر أي متجر في الوقت الحالي
      </p>
    );
  }
};

export default StoreGrid;
