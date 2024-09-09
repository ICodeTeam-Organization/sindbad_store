import { MdOutlineMailOutline } from "react-icons/md";
import { FaAppStore } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Subscribe = () => {
  return (
    <div className="py-3 pr-2  bg-stone-100  w-full">
      <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 py-3 w-full flex flex-col lg:flex-row  lg:flex-wrap  lg:justify-evenly  items-start lg:items-center gap-5 lg:gap-0">
        <div className="flex items-center ">
          <div className="bg-white rounded-full w-fit p-3 ml-5">
            <MdOutlineMailOutline className="text-orange-400 text-2xl" />
          </div>
          <div>
            <span className="font-bold text-[15px] block ">
              الاشتراك في النشرة البريدية
            </span>
            <span className="text-gray-500 text-[12px]">
              أنظم الان و احصل على خصم 10% على مشترياتك التالية
            </span>
          </div>
        </div>
        <div className="lg:mx-4">
          <span className="block text-[15px] font-semibold mb-2 ">
            يمكنك ألغاء الاشتراك في اي لحظة
          </span>
          <div className=" flex items-center ">
            <div className="px-1 py-2 ml-1 md:max-w-[350px] w-[250px] border-[1px] rounded flex justify-between items-center bg-white ">
              <input
                className="pr-2 text-sm   outline-none rounded"
                type="text"
                placeholder=" ابحث عما تريد"
              />
            </div>
            <Button className="bg-orange-500 text-white">أشتراك</Button>
          </div>
        </div>
        <div className="lg:mt-4 xl:mt-0">
          <span className="block text-[15px] font-semibold mb-2">
            تطبيقات الموبايل
          </span>
          <div className="flex">
            <Button className=" ml-1">
              <FaAppStore /> AppStore
            </Button>
            <Button>
              <FaAppStore /> AppStore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
