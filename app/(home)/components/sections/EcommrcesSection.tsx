import { getApi } from '@/lib/http';
import React from 'react'
import EcommercesCarsoule from './EcommercesCarsoule';
import { Shop } from '@/types/storeTypes';

async function EcommrcesSection() {
   try {
    const res = await getApi<{ data: {items:Shop[]} }>(
      "EcommercesStores/GetEcommerceStores?pageNumber=1&pageSize=30"
    );

    const ecommrces = res?.data;

    if (!ecommrces || ecommrces.items.length === 0) return null;
console.log(ecommrces);

    return <>
    <
      EcommercesCarsoule allEcommrces={ecommrces.items}   />
    </>;
  } catch (err) {
    console.error("فشل تحميل المتاجر 😵‍💫", err);
    return null;
  }
}

export default EcommrcesSection