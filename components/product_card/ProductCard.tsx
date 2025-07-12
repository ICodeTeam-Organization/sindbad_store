 
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

// import { Rating, RoundedStar } from "@smastrom/react-rating";
import { AiFillStar } from "react-icons/ai";
import { NormalizedProductType } from "@/Data/normalizTypes"; 
import AddToCartBtn from "./AddToCartBtn";
import AddToFavBtn from "./AddToFavBtn";  
import ProductCardPriceSection from "./ProductCardPriceSection";
import { get_currency_key } from "@/lib/cookie/cookie.clients";

// function calculateDiscountPercentage(
//   oldPrice: number,
//   newPrice: number
// ): number {
//   const discount = ((oldPrice - newPrice) / oldPrice) * 100;
//   return discount;
// }

type propsType = {
  data: NormalizedProductType;
};
const ProductCard = ({ data }: propsType) => { 
  return (
    <div
      dir="rtl"
      className={`m-auto rounded-[8px] group overflow-hidden border hover:border-primary hover:border  transition-all   hover:shadow  `}
    >
      <div className="relative  ">
        <Link href={`/shop/productDetils/${data?.id}`}>
          <SafeImage
            alt={data?.name}
            loading="lazy"
            src={data?.image}
            blurHash={data?.blurHash}
            width={300}
            height={256}
            objectFit="contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="w-full mdHalf:h-56 3xs:h-52 h-44 object-contain"
          />
        </Link>
        {Boolean(data?.hasOffer || data?.hasDiscount) && (
          <span className="absolute top-0 right-0 bg-red-500 bg-opacity-[0.8] text-white 3xs:text-[10px] text-[9px] 3xs:font-bold px-3  py-[6px] rounded-[0_0_0_10px]">
            {data.offerSentence}
          </span>
        )}
        <div className="absolute bottom-10 left-1 z-[5] opacity-0 group-hover:opacity-100 duration-200 ">
          <AddToFavBtn
             id={data.id as number}
          />
        </div>
        <div className="absolute bottom-1 left-1 z-[5] opacity-0 group-hover:opacity-100 duration-200">
          <AddToCartBtn
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
      <div className="bg-bg-50 p-2 relative">
        <Link href={`/shop/productDetils/${data.id}`}>
          <p className=" line-clamp-2 h-10  text-black 3xs:text-[13px] text-[10px] py-2 pt-0   text-right flex items-center">
            <span className="line-clamp-2 ">{data.name}</span>
          </p>

          <ProductCardPriceSection data={data} currency={get_currency_key(data?.country)} />

          <div className="flex items-center justify-between gap-x-1">
            <div className="flex items-center mt-2 ">
              <p className="text-secondary text-[9px] ml-1">
                ({data.rate.toFixed(1)})
              </p>
              {[...Array(Math.round(data.rate))].map((_, index) => (
                <AiFillStar
                  key={index}
                  className="text-[#FFC62A] text-[13px]"
                />
              ))}
              {[...Array(Math.round(5 - data.rate))].map((_, index) => (
                <AiFillStar
                  key={index}
                  className="text-[#D6D6D6] text-[13px]"
                />
              ))}
            </div>
            {/* <AddToCartBtn
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
            /> */}
          </div>
        </Link>

        {/* <AddToBasket
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
        /> */}
      </div>
    </div>
  );
};

export default ProductCard;
