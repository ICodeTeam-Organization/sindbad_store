import AdddressTable from "./components/AddressTable";
import { getApi } from "@/lib/http";
import { AddressResponse } from "./types";


const MyAccountPage = async () => {
 
  const InitAddresses = await getApi<AddressResponse>(`CustomerAddress/GetCustomerAddress`);
 
  return (
      <div className="p-6 h-[500px]">
        <div className="w-full overflow-hidden rounded-lg  mt-4">
        
         <AdddressTable address={InitAddresses?.data || []} />
        </div>
      </div>
  );
};

export default MyAccountPage;
