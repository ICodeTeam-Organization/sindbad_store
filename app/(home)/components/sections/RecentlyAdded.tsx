import SectionTitle from "../SectionTitle";
import Image from "next/image";
import hero from "@/public/images/hero.jpg"
import { AiOutlineHeart } from "react-icons/ai"; 
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const RecentlyAdded = () => {
  return (
    <div className="container pt-10 mx-autocontainer mx-auto sm:px-4 md:px8 lg:px16 xl:px-32">
      <SectionTitle title={"اضيفت مؤخرا"} />
      <div className="container ">
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-y-5 2xl:gap-[25px] max-md:gap-y-3 max-md:gap-x-10 max-md:m-auto  py-4 mr-2 max-md:w-[300px]">
          <div className="max-md:m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-md:h-[183px] h-[339px]">
            <Image
              className="h-[210px] max-md:h-[100px] rounded-t-[8px]"
              src={hero}
              alt={""}
              width={250} />
            <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
              <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-[20px] max-md:text-[9px] text-right w-[217px] max-md:w-[143px] h-[58px] max-md:h-[30px]">
                <strong>
                  ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                </strong>
              </p>
              <div className="text-right flex justify-start">
                <p className="max-md:pr-3 pr-5 max-md:text-[12px] text-[#F55157]">
                  <strong>450.00</strong>
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">550.00</p>
              </div>
              <div className=" my-1 flex justify-around max-md:justify-between items-center max-md:w-full w-[225px]">
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  <p className="max-md:text-[7px]">اضف للسلة</p>
                </div>
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <AiOutlineHeart
                    className="w-[20px] h-[20px]"
                    color="#D5D5D5" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-md:h-[183px] h-[339px]">
            <Image
              className="h-[210px] max-md:h-[100px] rounded-t-[8px]"
              src={hero}
              alt={""}
              width={250} />
            <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
              <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-[20px] max-md:text-[9px] text-right w-[217px] max-md:w-[143px] h-[58px] max-md:h-[30px]">
                <strong>
                  ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                </strong>
              </p>
              <div className="text-right flex justify-start">
                <p className="max-md:pr-3 pr-5 max-md:text-[12px] text-[#F55157]">
                  <strong>450.00</strong>
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">550.00</p>
              </div>
              <div className=" my-1 flex justify-around max-md:justify-between items-center max-md:w-full w-[225px]">
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  <p className="max-md:text-[7px]">اضف للسلة</p>
                </div>
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <AiOutlineHeart
                    className="w-[20px] h-[20px]"
                    color="#D5D5D5" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-md:h-[183px] h-[339px]">
            <Image
              className="h-[210px] max-md:h-[100px] rounded-t-[8px]"
              src={hero}
              alt={""}
              width={250} />
            <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
              <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-[20px] max-md:text-[9px] text-right w-[217px] max-md:w-[143px] h-[58px] max-md:h-[30px]">
                <strong>
                  ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                </strong>
              </p>
              <div className="text-right flex justify-start">
                <p className="max-md:pr-3 pr-5 max-md:text-[12px] text-[#F55157]">
                  <strong>450.00</strong>
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">550.00</p>
              </div>
              <div className=" my-1 flex justify-around max-md:justify-between items-center max-md:w-full w-[225px]">
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  <p className="max-md:text-[7px]">اضف للسلة</p>
                </div>
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <AiOutlineHeart
                    className="w-[20px] h-[20px]"
                    color="#D5D5D5" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-md:h-[183px] h-[339px]">
            <Image
              className="h-[210px] max-md:h-[100px] rounded-t-[8px]"
              src={hero}
              alt={""}
              width={250} />
            <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
              <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-[20px] max-md:text-[9px] text-right w-[217px] max-md:w-[143px] h-[58px] max-md:h-[30px]">
                <strong>
                  ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                </strong>
              </p>
              <div className="text-right flex justify-start">
                <p className="max-md:pr-3 pr-5 max-md:text-[12px] text-[#F55157]">
                  <strong>450.00</strong>
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">550.00</p>
              </div>
              <div className=" my-1 flex justify-around max-md:justify-between items-center max-md:w-full w-[225px]">
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  <p className="max-md:text-[7px]">اضف للسلة</p>
                </div>
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <AiOutlineHeart
                    className="w-[20px] h-[20px]"
                    color="#D5D5D5" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-md:h-[183px] h-[339px]">
            <Image
              className="h-[210px] max-md:h-[100px] rounded-t-[8px]"
              src={hero}
              alt={""}
              width={250} />
            <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
              <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-[20px] max-md:text-[9px] text-right w-[217px] max-md:w-[143px] h-[58px] max-md:h-[30px]">
                <strong>
                  ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف
                </strong>
              </p>
              <div className="text-right flex justify-start">
                <p className="max-md:pr-3 pr-5 max-md:text-[12px] text-[#F55157]">
                  <strong>450.00</strong>
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">550.00</p>
              </div>
              <div className=" my-1 flex justify-around max-md:justify-between items-center max-md:w-full w-[225px]">
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                  <p className="max-md:text-[7px]">اضف للسلة</p>
                </div>
                <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                  <AiOutlineHeart
                    className="w-[20px] h-[20px]"
                    color="#D5D5D5" />
                </div>
              </div>
            </div>
          </div>
          
          
          
         
          
        </div>
      </div>
    </div>
  )
}

export default RecentlyAdded