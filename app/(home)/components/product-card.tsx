import AddToBasket from "./add-to-basket";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
 
// import { Rating, RoundedStar } from "@smastrom/react-rating";
import { AiFillStar } from "react-icons/ai";

function calculateDiscountPercentage(
  oldPrice: number,
  newPrice: number
): number {
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return discount;
}

type propsType = {
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
  rate?: number;
  amountYouBuy?: number;
  amountYouGet?: number;
};
const ProductCard = (props: propsType) => {

  const {
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
    rate = 0,
    amountYouBuy = 0,
    amountYouGet = 0
  } = props;

  
  // حساب إجمالي التقييمات
  const totalRatings =
    oneStarCount +
    twoStarCount +
    threeStarCount +
    fourStarCount +
    fiveStarCount;

  // حساب التقييم المتوسط
  const weightedStars =
    totalRatings > 0
      ? (oneStarCount * 1 +
          twoStarCount * 2 +
          threeStarCount * 3 +
          fourStarCount * 4 +
          fiveStarCount * 5) /
        totalRatings
      : 0;

  // تحديد عدد النجوم المملوءة والفارغة
  // const filledStars = Math.round(weightedStars);
  const filledStars =
    Math.ceil(weightedStars) === 0 ? rate : Math.ceil(weightedStars);
  const emptyStars = 5 - filledStars;


  return (
    <div
      className={
        cn +
        `m-auto rounded-t-[8px] overflow-hidden border hover:border-purple-600 hover:border  transition-all hover:-translate-y-1 hover:shadow  `
      }
    > 
    
      <Link href={`/shop/productDetils/${ProductDet}`} className="">
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
            alt={productName}
            loading="lazy"
            src={image}
            width={300}
            height={256}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="w-full  mdHalf:h-60 h-52 object-contain"
          />
          {offerSentence && (
            <span className="absolute top-2 right-2 bg-red-500 bg-opacity-[0.8] text-white text-[10px] font-bold px-2 py-1 rounded">
              {offerSentence}
            </span>
          )}
        </div>
      </Link>
      <div className="">
        <Link href={`/shop/productDetils/${ProductDet}`}>
          <p className=" line-clamp-2  h-10 font-[Tajawal] text-[#007580] text-[13px] mt-1 mx-2 tajawal text-right flex items-center">
            <strong  className="line-clamp-2" >{productName}</strong>
          </p>
          <div className="text-right flex flex-col justify-start items-start ">
            <p className="max-md:pr-3 pr-3 max-md:text-xs text-[16px] text-[#F55157]">
              <strong>{price}</strong> <span className="text-[13px]">رس</span>
            </p>
            { oldPrice && +oldPrice > price ? (
              <div className="flex">
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through text-[#9C9C9C]">
                  {oldPrice}رس
                </p>
                <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px]  text-[#9C9C9C]">
                  خصم {calculateDiscountPercentage(oldPrice, price).toFixed(2)}%
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
            {[...Array(Math.round(filledStars  ))].map((_, index) => (
              <AiFillStar key={index} className="text-[#FFC62A] text-[10px]" />
            ))}
            {[...Array(Math.round(emptyStars ))].map((_, index) => (
              <AiFillStar key={index} className="text-[#D6D6D6] text-[10px]" />
            ))}
            <p className="text-[#A5A5A5] text-[9px] mr-3">
              (
              {parseFloat(weightedStars.toFixed(1)) === 0.0
                ? rate.toFixed(1)
                : weightedStars.toFixed(1)}
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
          id={id}
          productInfo={{ image, productName, price, oldPrice , amountYouBuy , amountYouGet }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
