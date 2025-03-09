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
  } = props;

  // return (
  //    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full5">
  //       <div className="relative">
  //           <img src="https://via.placeholder.com/400x300" alt="Product image" className="w-full h-64 object-cover" />
  //           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
  //           <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
  //               <svg className="w-4 h- text-center text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  //           </button>
  //       </div>
  //       <div className="p-4">
  //           <div className="flex justify-between items-start mb-2">
  //               <div>
  //                   <h2 className="text-xl font-semibold text-gray-800 mb-1">Premium Wireless Headphones</h2>
  //                   <p className="text-sm text-gray-600">Electronics</p>
  //               </div>
  //           </div>
  //               <div className="py-2">
  //                   <p className="text-lg font-bold text-green-600">$129.99</p>
  //                   <p className="text-sm text-gray-500 line-through">$159.99</p>
  //               </div>
  //           <div className="flex items-center mb-2">
  //               <div className="flex text-yellow-400">
  //                   <i className="fas fa-star"></i>
  //                   <i className="fas fa-star"></i>
  //                   <i className="fas fa-star"></i>
  //                   <i className="fas fa-star"></i>
  //                   <i className="fas fa-star-half-alt"></i>
  //               </div>
  //               <span className="text-gray-600 text-sm ml-2">(4.5/5)</span>
  //           </div>
  //           <p className="text-gray-600 text-sm mb-4">Experience crystal-clear sound with our premium wireless headphones. Perfect for music lovers and professionals alike.</p>
  //           <div className="flex items-center justify-between mb-4">
  //               <div className="flex items-center">
  //                   <i className="fas fa-truck text-blue-500 mr-2"></i>
  //                   <span className="text-sm text-gray-600">Free Shipping</span>
  //               </div>
  //               <div className="flex items-center">
  //                   <i className="fas fa-clock text-blue-500 mr-2"></i>
  //                   <span className="text-sm text-gray-600">In Stock</span>
  //               </div>
  //           </div>
  //           <div className="flex space-x-2">
  //               <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200">
  //                   Add to Cart
  //               </button>
  //               <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200">
  //                   Quick View
  //               </button>
  //           </div>
  //       </div>
  //   </div>
  // )

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
    Math.round(weightedStars) === 0 ? rate : Math.round(weightedStars);
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
            <strong>{productName}</strong>
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
          productInfo={{ image, productName, price, oldPrice }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
