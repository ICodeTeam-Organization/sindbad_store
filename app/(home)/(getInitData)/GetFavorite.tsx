"use client";
import { useFavorite } from "@/app/stores/favoritesStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetFavorite() {

  const { pageNumber, pageSize, setFavoriteProducts } = useFavorite();
  const { status, data: authData } = useSession();

  const [trigged, settrigged] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["favorites", pageNumber, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          `Favorites/GetFavoriteProductIds?pageNumber=${pageNumber}&PageSize=${pageSize}`,
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
      const productIds = data?.data?.map(
        (item: { productId: number }) => item.productId
      );
      console.log(
        productIds,
      );
      setFavoriteProducts(productIds);
    }
  }, [data,authData]);

  return null; // No UI needed
}
