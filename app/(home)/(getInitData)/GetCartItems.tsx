"use client";

import { useCartStore } from "@/app/stores_mangament/cartStore";
import { getApi } from "@/lib/http";
import { CartItem } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// this component for get all cart items when open site for first time 
// WARNING this must be call in root layout.tsx to get cart from anywhere 
export default function GetCartItems() {

  const { setCartItems } = useCartStore();
  const { status, data: authData } = useSession();

  const [trigged, settrigged] = useState<boolean>(false);

  const { data } = useQuery<{data:CartItem[]}>({
    queryKey: ["get-cartItms-first-time"],
    queryFn: async () => {
      const  response = await getApi<{data:CartItem[]}>(
          `Cart/GetAllCustomerProductsInCartForViewInCartPage`,
        {},{
          headers: {
            Authorization: `Bearer ${authData?.user?.data?.token}`,
          },
        }
      );
      return response; // Ensure the response is correctly unwrapped
    },
    enabled:trigged, 
    gcTime:0,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  useEffect(()=>{ 
    if (status === "authenticated" && !!(authData?.user?.data?.token)) {
      settrigged(true)
    }
  },[authData])
  useEffect(() => {
    if (data) {
      setCartItems(data.data);
    }
  }, [data]);

  return null; // No UI needed
}
