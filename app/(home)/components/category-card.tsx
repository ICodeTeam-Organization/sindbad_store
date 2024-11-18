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
        <div className="p-8 w-full h-full bg-neutral-100 rounded-full border-2 group-hover:border-sky-500 border-transparent transition-[border,shadow]  flex justify-center items-center group-hover:cursor-pointer    group-hover:shadow-lg  ">
          <Image
            src={imageUrl}
            height={100}
            width={100}
            className="w-10 h-10 md:w-12 md:h-12"
            alt="صورة الصنف"
          />
        </div>
        <h2 className="  text-xs  mt-4 ">{name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
