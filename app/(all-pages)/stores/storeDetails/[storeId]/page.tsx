import React from "react";
import { getApi } from "@/lib/http";
import { ApiResponse, StoreData } from "../../typest";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddStoreToFavBtn from "./components/AddStoreToFavBtn";
import { goToExtrnalLink } from "@/lib/utils";
 
import SafeImage from "@/components/SafeImage";
import { StoreDetailsTabs } from "./components/StoreDetailsTabs";
import { Store } from "@/types/storeTypes";

type StoredetailsProps = {
  params: {
    storeId: string;
  };
};

// Fetch store details on the server
const fetchStoreDetails = async (
  storeId: string
): Promise<Store | null> => {
  try {
    const storesResponse = await getApi<{data:{Items:Store[]}}>(
      `Stores/${storeId}`
    );
    if (storesResponse?.data?.Items?.length ?? null) {
      return storesResponse.data.Items[0];
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

  const { description, id, name, imageUrl, websiteUrl,images, storeCategoriesIds } =
    storeDetails;

  return (
    <div className="bg-bg-100">
      <div className=" mdHalf:p-6 w-full mx-auto xl:container ">
        <div className="flex flex-col mdHalf:flex-row gap-6 mdHalf:p-12 p-4 bg-white rounded-md shadow-sm ">
          {/* Details Section */}
          <div className="max-mdHalf:flex items-center justify-center" >
            <div className="w-[180px] h-[180px] border rounded overflow-hidden relative">
            <SafeImage
              src={imageUrl}
              alt={name}
              className="  aspect-square object-contain "
              fill
            />
          </div>
          </div>

          <div className="  flex-1 text-gray-800 mt-0  flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p className="text-gray-600 mb-4 text-sm">{description}</p>

            <p className="text-sm font-bold m-1"> فئات المحل </p>
            {storeCategoriesIds && storeCategoriesIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {storeCategoriesIds.map((category) => (
                  <span
                    key={category.id}
                    className="text-gray-800 bg-zinc-100 m-1 text-sm px-3 py-1 rounded-full cursor-pointer hover:shadow-sm duration-300 hover:border-secondary border border-transparent"
                  >
                    {category.categoryName}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto">
              {websiteUrl && (
                <div className="flex items-center justify-between   ">
                  <div className="flex items-center gap-4">
                    <Link
                      href={goToExtrnalLink(websiteUrl) || "#"}
                      target={websiteUrl ? "_blank" : ""}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {"الموقع الإلكتروني للمحل"}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <AddStoreToFavBtn id={id} />
          </div>
        </div>
        <div className="flex flex-col mdHalf:flex-row gap-6 mdHalf:p-12 p-4 bg-white rounded-md shadow-sm my-5 ">
          <StoreDetailsTabs storeId={id} images={[imageUrl,...images?.map(e=>e.imageUrl)]} />
        </div>
      </div>
    </div>
  );
};

export default Storedetails;
