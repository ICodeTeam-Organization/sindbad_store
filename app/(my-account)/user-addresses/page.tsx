"use client";

import { IoMdAddCircleOutline } from "react-icons/io";
import AdddressTable from "./components/AddressTable";


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

const MyAccountPage = () => {
  return (
      <div className="p-6 h-[500px]">
        <div className="w-full overflow-hidden rounded-lg  mt-4">
          <div className="flex flex-row justify-between  mb-4">
            <h2 className="text-2xl">عناويني</h2>
            <button className="flex justify-between items-center gap-2  bg-orange-500 text-white px-4 py-2 rounded-lg">
              <IoMdAddCircleOutline /> إضافة عنوان جديد
            </button>
          </div>
         <AdddressTable address_table={addressData} />
        </div>
      </div>
  );
};

export default MyAccountPage;
