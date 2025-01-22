 
import { IoMdAddCircleOutline } from "react-icons/io";
import AdddressTable from "./components/AddressTable";
import { getApi } from "@/lib/http";
import { AddressResponse } from "./types";


const addressData = [
  {
    address: "بجانب مستشفى البرج بجانب مستش ويلتف النص حسب طول العنوان",
    region: "محافظة حضرموت مديرية المكلا منطقة الديس",
    recipient: "محمد علي سالم عبدالله",
    phone: "77070078",
  },
  {
    address: "بجانب مستشفى البرج بجانب مستش ويلتف النص حسب طول العنوان",
    region: "محافظة حضرموت مديرية المكلا منطقة الديس",
    recipient: "محمد علي سالم عبدالله",
    phone: "77070078",
  },
  {
    address: "بجانب مستشفى البرج بجانب مستش ويلتف النص حسب طول العنوان",
    region: "محافظة حضرموت مديرية المكلا منطقة الديس",
    recipient: "محمد علي سالم عبدالله",
    phone: "77070078",
  },
  {
    address: "بجانب مستشفى البرج بجانب مستش ويلتف النص حسب طول العنوان",
    region: "محافظة حضرموت مديرية المكلا منطقة الديس",
    recipient: "محمد علي سالم عبدالله",
    phone: "77070078",
  },
];

const MyAccountPage = async () => {

  // const {data} = useSession()
  // console.log(data?.user);
  

  const InitAddresses = await getApi<AddressResponse>(`CustomerAddress/GetCustomerAddress`);

  
  
  return (
      <div className="p-6 h-[500px]">
        <div className="w-full overflow-hidden rounded-lg  mt-4">
        
         <AdddressTable address={InitAddresses.data} />
        </div>
      </div>
  );
};

export default MyAccountPage;
