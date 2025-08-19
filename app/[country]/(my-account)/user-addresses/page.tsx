import AdddressTable from "./components/AddressTable";
import { getApi } from "@/lib/http";
import { AddressResponse } from "./types";


const MyAccountPage = async () => {
 
  const InitAddresses = await getApi<AddressResponse>(`Addresses?pageSize=100&pageNumber=1`);
 
  return (
      <div className=" min-h-[500px] bg-white p-5">
        <div className="w-full overflow-hidden rounded-lg  mt-4 "> 
         <AdddressTable address={InitAddresses?.data?.items || []} />
        </div>
      </div>
  );
};

export default MyAccountPage;
