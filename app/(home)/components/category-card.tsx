import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
};

const CategoryCard = ({ name, imageUrl , id }: Props) => {
  return (
    <Link href={"/shop?cat="+id}>
      <div className="text-center w-28 flex flex-col items-center ">
        <div className=" w-28 h-28 p-4  relative overflow-hidden bg-neutral-100 rounded-full border-2 group-hover:border-sky-500 border-transparent transition-[border,shadow]  flex justify-center items-center group-hover:cursor-pointer    group-hover:shadow-lg  ">
          <Image
            src={imageUrl}
            // layout="fill"
            width={120}
            height={120}
            objectFit="cover"
            // className="w-10 h-10 md:w-12 md:h-12"
            alt="صورة الصنف"
          />
        </div>
        <h2 className="  text-xs  mt-4 text-center ">{name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
