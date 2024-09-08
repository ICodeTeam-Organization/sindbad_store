import Image from "next/image";
import hero from "@/app/Images/hero.jpg";
const CategoryCard = () => {
  return (
    <div className="text-center ">
      <div className="py-11 w-full h-full bg-neutral-100 rounded-full flex justify-center items-center hover:cursor-pointer hover:scale-105  transition-transform duration-300 hover:shadow-lg hover:outline hover:outline-2 hover:outline-sky-500 ">
        <Image src={hero} height={80} width={80} alt="صورة الصنف" />
      </div>
      <h2 className="text-sm mt-4">اسم الصنف</h2>
    </div>
  );
};

export default CategoryCard;
