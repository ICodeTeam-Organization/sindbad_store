import AddToBasket from "./add-to-basket";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

// import { Rating, RoundedStar } from "@smastrom/react-rating";
import { AiFillStar } from "react-icons/ai";
import { NormalizedProductType } from "@/Data/normalizTypes";

// function calculateDiscountPercentage(
//   oldPrice: number,
//   newPrice: number
// ): number {
//   const discount = ((oldPrice - newPrice) / oldPrice) * 100;
//   return discount;
// }

type propsType = {
  data:NormalizedProductType 
};
const ProductCard = ({data}:propsType) => {
   
  return (
    <div
      className={ 
        `m-auto rounded-t-[8px] overflow-hidden border hover:border-purple-600 hover:border  transition-all hover:-translate-y-1 hover:shadow  `
      }
    >
      <Link href={`/shop/productDetils/${data?.id}`} className="">
        {/* <div className="w-full h-[180px] overflow-hidden relative  " >
          {offerSentence ? <span className="OfferSentence px-4 py-[2px] ">{offerSentence}</span>: null}
          
        <SafeImage
            src={image} // رابط الصورة
            alt="صورة منتج"
            className="max-sm:h-28 rounded-t-[8px] object-cover "
            fill
            
          />
        </div> */}
        <div className="relative border-b">
          <SafeImage
            alt={data?.name}
            loading="lazy"
            src={data?.image}
            width={300}
            height={256}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="w-full  mdHalf:h-60 h-52 object-contain"
          />
          {Boolean(data?.hasOffer) && (
            <span className="absolute top-2 right-2 bg-red-500 bg-opacity-[0.8] text-white text-[10px] font-bold px-2 py-1 rounded">
              {data.offerSentence}
            </span>
          )}
        </div>
      </Link>
      <div className="">
        <Link href={`/shop/productDetils/${data.id}`}>
          <p className=" line-clamp-2  h-10 font-[Tajawal] text-[#007580] text-[13px] mt-1 mx-2 tajawal text-right flex items-center">
            <strong className="line-clamp-2">{data.name}</strong>
          </p>
          <div className="text-right flex flex-col justify-start items-start ">
            <p className="max-md:pr-3 pr-3 max-md:text-xs text-[16px] text-[#F55157]">
              <strong>{data.price}</strong> <span className="text-[13px]">رس</span> <span className="text-[10px] bg-zinc-100 p-1 rounded-sm" > + مصاريف الشحن </span>
            </p>
            { data.hasDiscount ? (
              <div className="flex">
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]">
                  {data.priceBeforeDiscount}رس
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px]  text-[#9C9C9C]">
                  خصم {data.percentageOfDiscount}%
                </p>
              </div>
            ) : (
              <>
                <div className="flex">
                  <p className="pr-4 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]"></p>
                  <p className="pr-4 h-[22px] text-[12px] max-md:text-[9px]  text-[#9C9C9C]"></p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center mx-3 mt-1 ">
            {[...Array(Math.round(data.rate))].map((_, index) => (
              <AiFillStar key={index} className="text-[#FFC62A] text-[10px]" />
            ))}
            {[...Array(Math.round(5 - data.rate))].map((_, index) => (
              <AiFillStar key={index} className="text-[#D6D6D6] text-[10px]" />
            ))}
            <p className="text-[#A5A5A5] text-[9px] mr-3">
              (
              {data.rate.toFixed(1)}
              )
            </p>
            {/* <Rating
                            style={{ maxWidth: 50 }}
                            halfFillMode="box"
                            itemStyles={{
                              itemShapes: RoundedStar,
                              activeFillColor: "#ffb700",
                              inactiveFillColor: "#eee",
                            }}
                            readOnly
                            value={filledStars}
                          /> 
                          <p className="text-[#A5A5A5] text-[9px] mr-3">
              (
              {parseFloat(weightedStars.toFixed(1)) === 0.0
                ? rate.toFixed(1)
                : weightedStars.toFixed(1)}
              )
            </p> */}
          </div>
        </Link>

        <AddToBasket
          id={data.id}
          productInfo={{
            image: data.image, 
            price: data.price,
            oldPrice: data.priceBeforeDiscount,
            amountYouBuy: data.amountYouBuy,
            amountYouGet: data.amountYouGet,
            productName: data.name,
            shipCost: data.shipCost,
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
