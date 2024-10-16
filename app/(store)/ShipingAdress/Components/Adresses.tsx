import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import React from "react";
import { GrTrash } from "react-icons/gr";

const Adresses = async () => {
  const address = await getApi<any>("CustomerAddress/GetCustomerAddress");
  if (!address) return notFound();
  const data = address.data;
  return (
    <div className="grid grid-cols-9 text-center items-center font-bold w-full text-gray-600">
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full col-span-2">
        العنوان
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">
        المنطقة
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">
        المستلم
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 col-span-2">
        التلفون
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">حذف</h1>

      {/* fetch api from here */}
      {data.map((itm: any) => (
        <React.Fragment key={itm.customerAddressId}>
          <h1 className="text-right line-clamp-3 px-3 pt-3 col-span-2 max-md:text-xs max-md:line-clamp-4">
            {itm.location}
          </h1>
          <div className="m-auto pt-3 text-gray-500 px-3 line-clamp-3 col-span-2 text-right max-md:text-xs max-md:line-clamp-4">
            <h1>{itm.governorateName}</h1>
            <h1>{itm.directorateName}</h1>
            <h1>{itm.regionName}</h1>
          </div>
          <div className="m-auto px-3 pt-3 line-clamp-3 col-span-2">
            <h1>محمد علي سالم عبدالله</h1>
          </div>
          <div className=" pt-3 col-span-2">
            <h1 className=" line-clamp-3 text-blue-400 max-sm:text-[8px]">
              770700718
            </h1>
          </div>
          <div className=" pt-3">
            <GrTrash
              className="max-sm:size-4 cursor-pointer m-auto"
              size={25}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Adresses;
