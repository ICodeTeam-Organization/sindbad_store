import Image from "next/image";
import AddToBasket from "./add-to-basket";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { AiFillStar } from "react-icons/ai";

function calculateDiscountPercentage(oldPrice: number, newPrice: number): number {
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return discount > 0 ? discount : 0;
}

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
        `m-auto rounded-t-[8px] border hover:border-purple-600 hover:border  transition-all hover:-translate-y-1 hover:shadow  `
      }
    >
      <Link href={`/shop/productDetils/${ProductDet}`} className="" >
        <div className="w-full h-[180px] overflow-hidden relative  " >
        <SafeImage
            src={image} // رابط الصورة
            alt="صورة منتج"
            className="max-sm:h-28 rounded-t-[8px] object-cover "
            fill
            loading="lazy" 
          />
        </div>
      </Link>
      <div className="">
        <Link href={`/shop/productDetils/${ProductDet}`}>
        
          <p className=" line-clamp-2  h-10 font-[Tajawal] text-[#007580] text-[13px] mt-1 mx-2 tajawal text-right flex items-center">
            <strong>{productName}</strong>
          </p>
          <div className="text-right flex justify-start items-center ">
            <p className="max-md:pr-3 pr-5 max-md:text-xs text-xl text-[#F55157]">
              <strong>{price}</strong>
            </p>
            {oldPrice && <>
              <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]">
              {oldPrice} 
            </p>
            <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px]  text-[#9C9C9C]">
               خصم {calculateDiscountPercentage(100,50)}
            </p>
            </>}
          </div>
          <div className="flex items-center mx-3 mt-1 ">
              <AiFillStar className="text-[#FFC62A] text-[10px]" />
              <AiFillStar className="text-[#FFC62A] text-[10px]" />
              <AiFillStar className="text-[#FFC62A] text-[10px]" />
              <AiFillStar className="text-[#FFC62A] text-[10px]" />
              <AiFillStar className="text-[#D6D6D6] text-[10px]" />
              <p className="text-[#A5A5A5] text-[9px] mr-3">
                (4.5)
              </p>
            </div>
        </Link>
        <AddToBasket id={id} productInfo={{image, productName, price, oldPrice }} />
      </div>
    </div>
  );
};

export default ProductCard;
