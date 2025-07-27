import AdddressTable from "./components/AddressTable";
import { getApi } from "@/lib/http";
import { AddressResponse } from "./types";


const MyAccountPage = async () => {
 
  const InitAddresses = await getApi<AddressResponse>(`CustomerAddress/GetCustomerAddress`);
 
  return (
      <div className=" min-h-[500px] bg-white p-5">
        <div className="w-full overflow-hidden rounded-lg  mt-4 "> 
         <AdddressTable address={InitAddresses?.data || []} />
        </div>
      </div>
  );
};

export default MyAccountPage;
