import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
};

const CategoryCard = ({ name, imageUrl }: Props) => {
  return (
    <Link href={"/shop/"}>
      <div className="text-center w-28">
        <div className="p-8 w-full h-full bg-neutral-100 rounded-full flex justify-center items-center hover:cursor-pointer hover:scale-105  transition-transform duration-300 hover:shadow-lg hover:outline hover:outline-2 hover:outline-sky-500 ">
          <Image
            src={imageUrl}
            height={100}
            width={100}
            className="w-10 h-10 md:w-12 md:h-12"
            alt="صورة الصنف"
          />
        </div>
        <h2 className="  text-xs md:text-sm  mt-4 ">{name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
