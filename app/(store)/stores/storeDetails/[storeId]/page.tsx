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
