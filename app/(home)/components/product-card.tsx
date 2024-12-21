import Image from "next/image";
import AddToBasket from "./add-to-basket";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { AiFillStar } from "react-icons/ai";

function calculateDiscountPercentage(oldPrice: number, newPrice: number): number {
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return discount ;
}

type props = {
  cn?: string;
  id: string;
  image: string;
  productName: string;
  price: number;
  oldPrice?: number;
  ProductDet: number;
  offerSentence?: string;
  oneStarCount?: number;
  twoStarCount?: number;
  threeStarCount?: number;
  fourStarCount?: number;
  fiveStarCount?: number;
};
const ProductCard = ({
  cn,
  id,
  image,
  productName,
  price,
  oldPrice,
  ProductDet,
  offerSentence,
  oneStarCount = 0,
  twoStarCount = 0,
  threeStarCount = 0,
  fourStarCount = 0,
  fiveStarCount = 0,
}: props) => {
        // حساب إجمالي التقييمات
        const totalRatings = oneStarCount + twoStarCount + threeStarCount + fourStarCount + fiveStarCount;
  
        // حساب التقييم المتوسط
        const weightedStars = totalRatings > 0
        ? (oneStarCount * 1 + twoStarCount * 2 + threeStarCount * 3 + fourStarCount * 4 + fiveStarCount * 5) / totalRatings : 0;
        
        // تحديد عدد النجوم المملوءة والفارغة
        const filledStars = Math.round(weightedStars);
        const emptyStars = 5 - filledStars;
  return (
    <div
      className={
        cn +
        `m-auto rounded-t-[8px] border hover:border-purple-600 hover:border  transition-all hover:-translate-y-1 hover:shadow  `
      }
    >
      <Link href={`/shop/productDetils/${ProductDet}`} className="" >
        <div className="w-full h-[180px] overflow-hidden relative  " >
          {offerSentence ? <span className="OfferSentence ">{offerSentence}</span>: null}
          
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
            <p className="max-md:pr-3 pr-5 max-md:text-xs text-[16px] text-[#F55157]">
              <strong>{price}</strong> <span className="text-[13px]" >رس</span>
            </p>
            { (!!oldPrice) && <>
              <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]">
              {oldPrice}رس 
            </p>
            <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px]  text-[#9C9C9C]">
               خصم {calculateDiscountPercentage(oldPrice,price).toFixed(2)}%
            </p>
            </>}
          </div>
          <div className="flex items-center mx-3 mt-1 ">
          {[...Array(filledStars)].map((_, index) => (
          <AiFillStar key={index} className="text-[#FFC62A] text-[10px]" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <AiFillStar key={index} className="text-[#D6D6D6] text-[10px]" />
        ))}
              <p className="text-[#A5A5A5] text-[9px] mr-3">
                ({weightedStars.toFixed(1)})
              </p>
            </div>
        </Link>
        <AddToBasket id={id} productInfo={{image, productName, price, oldPrice }} />
      </div>
    </div>
  );
};

export default ProductCard;
