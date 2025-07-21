// app/components/sections/StoresCarouselSection.tsx

import { getApi } from "@/lib/http";
import { Store } from "@/types/storeTypes";
import StoresCarsoule from "./StoresCarsoule";

export default async function StoresSection() {
  try {
    const res = await getApi<{ data: Store[] }>(
      "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
    );

    const stores = res?.data;

    if (!stores || stores.length === 0) return null;

    return <StoresCarsoule allStores={stores} />;
  } catch (err) {
    console.error("فشل تحميل المتاجر 😵‍💫", err);
    return null;
  }
}
