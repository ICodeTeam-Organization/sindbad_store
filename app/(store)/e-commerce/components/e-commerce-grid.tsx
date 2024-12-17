"use client";
import React, { useState, useEffect } from "react";
import E_commerceCard from "./e-comm-card";
import { Shop } from "@/types/storeTypes";
import { postApi, getApi } from '@/lib/http';
import LoadMoreButton from "@/components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    items: Shop[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const fetchEcommerces = async (pageNumber: number, pageSize: number) => {
  console.log("fetchEcommerces");
  
  const response = await getApi<ApiResponse>(
    `EcommercesStores/GetEcommerceStores?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  
  console.log("response");
  console.log(response);
  return response;
};

const E_commerceGrid = () => {
  const [allEcommerces, setAllEcommerces] = useState<Shop[]>([]);
  const pageSize = 2;
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hiddenLoadingMore, setHiddenLoadingMore] = useState(true);

  const { data: Ecommerces, isLoading } = useQuery({
    queryKey: ["E_commerceGrid", pageNumber, pageSize],
    queryFn: () => fetchEcommerces(pageNumber, pageSize),
  });

  useEffect(() => {
    console.log("1");

    if (Ecommerces && Ecommerces.success) {
      setAllEcommerces((prevEcommerces) => [...prevEcommerces, ...Ecommerces.data.items]);
      if (Ecommerces.data.currentPage === Ecommerces.data.totalPages) {
        setHiddenLoadingMore(true);
      } else {
        setHiddenLoadingMore(false);
      }
      setIsLoadingMore(false);
    }
  }, [Ecommerces]);

  console.log("allEcommerces");
  console.log(allEcommerces);
  console.log("Ecommerces");
  console.log(Ecommerces);

  const loadMore = () => {
    setIsLoadingMore(true);
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
  };

  return (
    <div className="px-10 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && !isLoadingMore ? (
          <Loader2 className="animate-spin text-center mx-auto" />
        ) : allEcommerces.length > 0 ? (
          allEcommerces.map((e_comm: Shop, index: number) => (
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
          ))
        ) : (
          <p className="text-center text-xl font-bold py-12">
            لايتوفر أي أسواق في الوقت الحالي
          </p>
        )}
      </div>
      {!hiddenLoadingMore && (
        <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
      )}
    </div>
  );
};

export default E_commerceGrid;
