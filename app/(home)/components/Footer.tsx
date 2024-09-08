import paypal from "@/app/Images/paypal.svg";
import master from "@/app/Images/master.svg";
import visa from "@/app/Images/visa.svg";
import mada from "@/app/Images/mada.svg";
import photo from "@/app/Images/photo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" bg-black  py-3 ">
      <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 text-white flex flex-col-reverse md:flex-row  justify-between items-center text-sm">
        <span className="mt-3 md:mt-0">جميع الحقوق محفوظة لمنصة فاست 2024</span>
        <div className="flex flex-col md:flex-row items-center">
          <Image className="hidden md:block" src={photo} alt={"photo"} />
          <div className="md:ml-5 md:mr-2 mb-3 md:mb-0 md:flex md:items-center">
            <span className="block md:flex md:items-center mb-2 md:mb-0">
              الرقم الضريبي <i className="md:block hidden md:mx-3">:</i>
            </span>
            <span>00000000</span>
          </div>
          <div className="flex">
            <Image src={mada} alt={"mada"} />
            <Image className="mr-2" src={paypal} alt={"paypal"} />
            <Image className="mr-2" src={master} alt={"master"} />
            <Image className="mr-2" src={visa} alt={"visa"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
