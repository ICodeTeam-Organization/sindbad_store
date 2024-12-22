"use client"; // تأكد من إضافة هذا السطر

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // استخدم useParams من next/navigation
import StoreDetailsCard from './components/store-details-card';
import { getApi } from "@/lib/http";
import { ApiResponse } from "../typest";

const Storedetails = () => {
  const { storeId } = useParams(); 
  // console.log("storeId:", storeId);
  
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // console.log("storeDetails:", storeDetails); 
  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!storeId) {
        console.log("storeId is not defined");
        return; // خروج إذا لم يكن storeId موجودًا
      }

      try {
        const storesResponse = await getApi<ApiResponse>(
          `Stores/GetStoreDetailsById/${storeId}`
        );
        setStoreDetails(storesResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  if (loading) return (
    <div className="flex items-center justify-center h-[400px]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
  </div>
  );
  if (error) return <div>Error: {error.message}</div>;
  if (!storeDetails) return <div>No store details found.</div>;

  return (
    <div>
      <StoreDetailsCard {...storeDetails} />
    </div>
  );
};

export default Storedetails;