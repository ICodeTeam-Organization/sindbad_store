import Image from "next/image";
import AddToBasket from "./add-to-basket";
import Link from "next/link";

type props = {
  cn?: string;
  id: string;
  image: string;
  productName: string;
  price: number;
  oldPrice?: number;
  ProductDet: number;
};
const ProductCard = ({
  cn,
  id,
  image,
  productName,
  price,
  oldPrice,
  ProductDet,
}: props) => {
  return (
    <div
      className={
        cn +
        `m-auto rounded-t-[8px] border hover:border-purple-600 hover:border ho transition-all hover:-translate-y-1 hover:shadow  `
      }
    >
      <Link href={`/shop/productDetils/${ProductDet}`} className="overflow-hidden relative" >
         <div className="w-full h-[180px]" >
            <Image
              className="  max-sm:h-28 rounded-t-[8px] object-cover"
              src={image}
              alt={""}
              fill
              priority
            />
         </div>
         {/* <Image
          className=" mdHalf:hidden block  h-[210px] max-lg:h-[180px]  max-sm:h-28 rounded-t-[8px]"
          src={image}
          alt={""}
          width={240}
          height={0}
          priority
        /> */}
      </Link>
      <div className="">
        <Link href={`/shop/productDetils/${ProductDet}`}>
          <p className=" line-clamp-2  h-10 font-[Tajawal] text-[#007580] text-sm mt-1 mx-2 tajawal max-md:text-xs text-right flex items-center">
            <strong>{productName}</strong>
          </p>
          <div className="text-right flex justify-start items-center ">
            <p className="max-md:pr-3 pr-5 max-md:text-xs text-xl text-[#F55157]">
              <strong>{price}</strong>
            </p>
            <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]">
              {oldPrice} 100
            </p>
          </div>
        </Link>
        <AddToBasket id={id} />
      </div>
    </div>
  );
};

export default ProductCard;
