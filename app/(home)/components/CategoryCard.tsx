import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

const CategoryCard = ({ name, imageUrl }: Props) => {
  return (
    <Link href={"/shop/"} className="text-center  ">
      <div className="p-8 w-full h-full bg-neutral-100 rounded-full flex justify-center items-center hover:cursor-pointer hover:scale-105  transition-transform duration-300 hover:shadow-lg hover:outline hover:outline-2 hover:outline-sky-500 ">
        <Image
          src={imageUrl}
          height={100}
          width={100}
          className="w-10 h-10"
          alt="صورة الصنف"
        />
      </div>
      <h2 className="text-sm mt-4">{name}</h2>
    </Link>
  );
};

export default CategoryCard;
