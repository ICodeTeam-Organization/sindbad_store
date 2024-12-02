"use client";

import { useCartStore } from "@/app/stores/cartStore";
import { useFavorite } from "@/app/stores/favoritesStore";
import { getApi } from "@/lib/http";
import { CartItem } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          `Cart/GetAllCustomerProductsInCartForViewInCartPage`,
        {
          headers: {
            Authorization: `Bearer ${authData?.user.data.token}`,
          },
        }
      );
      return response.data; // Ensure the response is correctly unwrapped
    },
    enabled:trigged, 
  });

  useEffect(() => {
    if (status === "authenticated" && !!(authData?.user.data.token)) {
      settrigged(true)
    }
    if (data) {
      const cartItems = data?.data?.map(
        (item: CartItem) => ({cartId:item.cartId,productId:item.productId,quantity:item.quantity})
      );

      console.log("cart items => ",cartItems);
      
     
      setCartItems(cartItems);
    }
  }, [data,authData]);

  return null; // No UI needed
}
