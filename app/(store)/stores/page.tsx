import React from "react";
import StoreGrid from "./components/StoreGrid";
import { getApi } from "@/lib/http";

const StoresPage = async () => {
  const stores = await getApi<any>(
    "Market/Store/GetAllStoresThatHasLinksToOnlineWebsite"
  );

  return (
  
    <div className="mt-12">
      <StoreGrid  allStores={stores} />
    </div>
  );
}

export default StoresPage;

