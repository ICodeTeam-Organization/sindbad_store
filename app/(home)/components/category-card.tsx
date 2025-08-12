import SafeImage from "@/components/SafeImage"; 
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
};

const CategoryCard = ({ name, imageUrl , id }: Props) => {
  return (
    <Link href={"/shop?cats="+id}>
      <div className="text-center w-28 flex flex-col items-center ">
        <div className="w-24 h-24 p-4  relative overflow-hidden bg-neutral-100 rounded-full border-2 group-hover:border-primary group-hover:shadow-lg border-transparent transition-[border,shadow]  flex justify-center items-center group-hover:cursor-pointer       ">
          <SafeImage
            src={imageUrl}
            // layout="fill"
            width={120}
            height={120} 
            style={{objectFit:"cover"}} 
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
