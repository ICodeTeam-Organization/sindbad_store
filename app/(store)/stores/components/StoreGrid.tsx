import React from "react";
import StoreCard from "./StoreCard";
import { getApi } from "@/lib/http";
import { StoreCardProps } from "../typest";
import Pagination from "@/components/Pagination";

const StoreGrid = async () => {
  const stores = await getApi<any>(
    "Market/Store/GetAllStoresThatHasLinksToOnlineWebsite"
  );
  console.log(stores);

  if (stores.data.length > 0) {
    return (
      <>
        <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {stores.data.map((store: StoreCardProps) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
        <Pagination />
      </>
    );
  } else {
    return (
      <p className="text-center  text-2xl font-bold py-12 ">
        لايتوفر أي متجر في الوقت الحالي
      </p>
    );
  }
};

export default StoreGrid;