import { BiCheck } from "react-icons/bi";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Notebook from "@/public/images/Notebook.svg";
import Package from "@/public/images/Package.svg";
import Handshake from "@/public/images/Handshake.svg";
import Truck from "@/public/images/Truck.svg";
import { GiSandsOfTime } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
 
type props = {
  progress: number;
};
const Progresses = ({ progress }: props) => {

  
  let data: number = 0;
  data = 1;
  if (progress == 0) { 
    data = 100;
  }else if (progress == 1) {
    data = 80;
  } else if (progress == 2) {
    data = 60;
  } else if (progress == 3) {
    data = 40;
  } else if (progress == 4) {
    data = 20;
  } else if (progress == 5) {
    data = 0;
  } 

  return (
    <>
    <div  className="mdHalf:block hidden" >
<div className="m-auto mt-5 ">
  <Progress value={data} className="w-[85%] m-auto h-3" />
  <div className="relative -top-5 flex justify-around">
    <div
      className={
        data <= 100
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 80 && <BiCheck className="text-white w-20 h-20" />}
    </div>
    <div
      className={
        data <= 80
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 80 && <BiCheck className="text-white w-20 h-20" />}
    </div>
    <div
      className={
        data <= 60
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 60 && <BiCheck className="text-white w-20 h-20" />}
    </div>
    <div
      className={
        data <= 40
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 40 && <BiCheck className="text-white w-20 h-20" size={30} />}
    </div>
    <div
      className={
        data <= 20
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 20 && <BiCheck className="text-white w-20 h-20" size={30} />}
    </div>
    <div
      className={
        data === 0
          ? `bg-primary-background border-white w-7 h-7 rounded-full border-2 flex items-center`
          : `w-7 h-7 rounded-full border-primary-background border-2 bg-white`
      }
    >
      {data <= 0 && <BiCheck className="text-white w-20 h-20" size={30} />}
    </div>
  </div>
</div>
<div className="grid grid-cols-6 justify-items-center mt-3">
<div className="m-auto grid justify-items-center">
  {/* <Image src={Notebook} alt="Notebook" /> */}
  <GiSandsOfTime className="text-3xl text-primary-background " />
  <h1>الطلب قيد الإنتظار</h1>
</div>
<div className="m-auto grid justify-items-center">
  <Image src={Notebook} alt="Notebook" />
  <h1>تم تأكيد الطلب</h1>
</div>
<div className="m-auto grid justify-items-center">
  {/* <Image src={Notebook} alt="Notebook" /> */}
  <TbReportMoney   className="text-3xl text-primary-background " />

  <h1>تم شراء الطلب</h1>
</div>
<div className="m-auto grid justify-items-center">
  <Image src={Package} alt="Package" />
  <h1>تم الشحن</h1>
</div>
<div className="m-auto grid justify-items-center">
  <Image src={Truck} alt="Truck" />
  <h1>وصول الطلب</h1>
</div>
<div className="m-auto grid justify-items-center">
  <Image src={Handshake} alt="Handshake" />
  <h1>تم تسليمه</h1>
</div>
</div>
    </div> 
    <div className="flex   justify-center gap-x-6  mdHalf:hidden   ">
    {/* Progress line */}
    <div className="relative h-full flex flex-col items-center">
      {/* Line */}
      <div className="absolute top-0 bottom-10 w-1 bg-gray-300" />
  
      {/* Step Circles */}
      {[100, 80, 60, 40, 20, 0].map((threshold, index) => (
        <div
          key={index}
          className={`z-10 mb-6 flex items-center justify-center w-7 h-7 rounded-full border-2 ${
            data <= threshold
              ? "bg-primary-background border-white"
              : "bg-white border-primary-background"
          }`}
        >
          {data <= threshold && (
            <BiCheck className="text-white w-5 h-5" />
          )}
        </div>
      ))}
    </div>
  
    {/* Step Labels with Icons */}
    <div className="  ml-10 space-y-5 ">
      <div className="flex items-center gap-2">
        <Image src={Notebook} alt="Notebook" />
        <h1>الطلب قيد الإنتظار</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image src={Notebook} alt="Notebook" />
        <h1>تم تأكيد الطلب</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image src={Notebook} alt="Notebook" />
        <h1>تم شراء الطلب</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image src={Package} alt="Package" />
        <h1>تم الشحن</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image src={Truck} alt="Truck" />
        <h1>وصول الطلب</h1>
      </div>
      <div className="flex items-center gap-2">
        <Image src={Handshake} alt="Handshake" />
        <h1>تم تسليمه</h1>
      </div>
    </div>
    </div>
    </>
  
  );
};

export default Progresses;
