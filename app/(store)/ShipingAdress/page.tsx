import Adresses from "./Components/Adresses";
import AddShipingAdresses from "./Components/AddShipingAdresses";
import Pagination from "@/components/Pagination";
import BreadCrumb from "@/components/BreadCrumb";

const ShipingAdr = async () => {
  return (
    <>
      <BreadCrumb
        SecondName="حساب المستخدم"
        SecondDir=""
        ThirdName="عناوين التسليم"
        ThirdDir=""
      />
      <div className="m-auto my-16">
        <AddShipingAdresses />
        <div className="mx-8 m-auto border-2 rounded-sm py-3 mt-6">
          <p className="pr-6 pb-3 text-lg font-bold">عناوين المستخدم</p>
          <Adresses />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default ShipingAdr;
