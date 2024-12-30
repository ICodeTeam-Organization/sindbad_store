// "use client"; // تأكد من إضافة هذا السطر

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation'; // استخدم useParams من next/navigation
// import StoreDetailsCard from './components/store-details-card';
// import { getApi } from "@/lib/http";
// import { ApiResponse, StoreData } from '../../typest';

// const Storedetails = () => {
//   const { storeId } = useParams(); 
//   // console.log("storeId:", storeId);
  
//   const [storeDetails, setStoreDetails] = useState<StoreData>();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // console.log("storeDetails:", storeDetails); 
//   useEffect(() => {
//     const fetchStoreDetails = async () => {
//       if (!storeId) {
//         console.log("storeId is not defined");
//         return; // خروج إذا لم يكن storeId موجودًا
//       }

//       try {
//         const storesResponse = await getApi<ApiResponse>(
//           `Stores/GetStoreDetailsById/${storeId}`
//         );
//         setStoreDetails(storesResponse.data);
//       } catch (err:any) {
//         setError(err?.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStoreDetails();
//   }, [storeId]);

//   if (loading) return (
//     <div className="flex items-center justify-center h-[400px]">
//     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
//   </div>
//   );
//   if (error != "" && error != null) return <div>Error: {error}</div>;
//   if (!storeDetails) return <div>No store details found.</div>;

//   return (
//     <div>
//       <StoreDetailsCard {...storeDetails} />
//     </div>
//   );
// };

// export default Storedetails;

import React from "react";
import { getApi } from "@/lib/http";
import StoreDetailsCard from "./components/store-details-card";
import { ApiResponse, StoreData } from "../../typest";
import { notFound } from "next/navigation";

type StoredetailsProps = {
  params: {
    storeId: string;
  };
};

// Fetch store details on the server
const fetchStoreDetails = async (storeId: string): Promise<StoreData | null> => {
  try {
    const storesResponse = await getApi<ApiResponse>(`Stores/GetStoreDetailsById/${storeId}`);
    if (storesResponse?.data) {
      return storesResponse.data;
    } else {
      return null; // Return null if no data is found
    }
  } catch (error) {
    console.error("Error fetching store details:", error);
    return null; // Return null on error
  }
};

const Storedetails: React.FC<StoredetailsProps> = async ({ params }) => {
  const { storeId } = params;

  if (!storeId) {
    notFound(); // Redirect to 404 page if storeId is missing
  }

  const storeDetails = await fetchStoreDetails(storeId);

  if (!storeDetails) {
    notFound(); // Redirect to 404 page if no store details are found
  }

  return (
    <div>
      <StoreDetailsCard {...storeDetails} />
    </div>
  );
};

export default Storedetails;
