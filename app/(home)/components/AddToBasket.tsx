import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const AddToBasket = () => {
  return (
    <Link href={`/Orders`}>

    <div className="cursor-pointer my-1 flex justify-around max-md:justify-between items-center w-full">
      <div className="hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
        <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
        <p className="max-md:text-[7px]">اضف للسلة</p>
      </div>
      <div className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
        <AiOutlineHeart className="w-[20px] h-[20px]" color="#D5D5D5" />
      </div>
    </div>
    </Link>
  );
};

export default AddToBasket;
