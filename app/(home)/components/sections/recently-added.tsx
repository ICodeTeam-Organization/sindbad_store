"use client"

import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Product } from "@/types/storeTypes";


const RecentlyAdded =  ({RecentlyProducts={data:[]}}:{RecentlyProducts:{data:Product[]}}) => {
  // const RecentlyProducts = await getApi<any>(
  //   "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/5"
  // );
  // if (!RecentlyProducts) return notFound();
  const [IsHover, setIsHover] = useState(true)

  return (
    <div className="pt-10  mx-auto ">
      <SectionTitle title={"اضيفت مؤخرا"} href="/shop?newProducts=true" />
      <div className="w-full" >
     <Carousel
     
     onMouseEnter={()=>{
      setIsHover(false)
    }}
    onMouseLeave={()=>{
      setIsHover(true)
    }}
    opts={{
      direction:"rtl",
      
    }}
     plugins={[
      Autoplay({
        delay: 1500,
        active:IsHover,
      }),
    ]}
      className="m-auto cursor-pointer md:w-[88%] sm:w-[85%] w-[100%]">
        <CarouselContent dir="rtl" className="py-10 "  >
          {RecentlyProducts?.data?.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="pl-0 ml-4 xlHalf:basis-1/6 2lg:basis-[22%] mdHalf:basis-[25%] 2sm:basis-[35%] sm:basis-[42%] 2xs:basis-[34%] 1xs:basis-[45%] basis-1/2 rounded-t-[8px] "
            >
              <div className="sm:w-[220px]  1xs:w-[180px] w-full" >
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.mainImageUrl}
                productName={product.name}
                price={
                  product.priceAfterOffer
                    ? product.priceAfterOffer
                    : product.price
                }
                oldPrice={product.priceAfterOffer ? product.price : 0}
                ProductDet={product.id}
                offerSentence={product.offerSentence}
                oneStarCount = {product.oneStarCount}
                twoStarCount = {product.twoStarCount}
                threeStarCount = {product.threeStarCount}
                fourStarCount = {product.fourStarCount}
                fiveStarCount = {product.fiveStarCount}
              />
              </div>
              {/* <Link href={`/shop/productDetils/${product.id}`}>
                <Image
                  className="h-[210px] max-md:h-[120px] md:h-[120px] xl:h-[150px] rounded-t-[8px]"
                  src={product.mainImageUrl}
                  alt={""}
                  width={400}
                  height={0}
                />
              </Link>
              <div className="border-[1px] border-[#C3C3C3] border-t-0 pr-1">
                <Link href={`/shop/productDetils/${product.id}`}>
                  <p className="line-clamp-2 font-[Tajawal] xl:pr-1 text-[#007580] text-base max-md:text-[12px] md:text-[14px] text-right mt-1 ">
                    <strong>{product.name}</strong>
                  </p>
                  <div className="max-md:mt-2 max-sm:pr-0 pr-5 lg:mt-4 xl:mb-2 md:mt-1 text-right max-md:gap-0 md:gap-0 max-md:text-[12px] gap-[7px] flex justify-end">
                    <p className="pr-3 text-[12px] line-through">
                      {product.priceBeforOffer}
                    </p>
                    <p className=" text-lg  text-[#F55157]">
                      <strong>{product.priceAfterOffer}</strong>
                    </p>
                  </div>
                </Link>
                <div dir="rtl">
                  <AddToBasket id={product.id} />
                </div>
              </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="sm:flex hidden"/>
        <CarouselNext className=" sm:flex hidden "/>
      </Carousel>
    </div>
    </div>
  );
};

export default RecentlyAdded;
