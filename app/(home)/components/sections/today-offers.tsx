import SectionTitle from "../section-title";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import AddToBasket from "../add-to-basket";
const TodayOffers = async () => {
  const Offersproducts = await getApi<any>(
    "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/1"
  );
  if (!Offersproducts) return notFound();

  return (
    <>
      <div className="container mx-auto sm:px-4 xl:px-32 pt-10">
        <SectionTitle title={"عروض اليوم"} />
      </div>
<<<<<<< Updated upstream
      <Carousel className="m-auto cursor-pointer max-md:w-[265px] md:w-[650px] max-sm:w-[260px] sm:w-[500px] lg:w-[930px] xl:w-[1200px]">
        <CarouselContent dir="ltr">
          {Offersproducts?.data?.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="pl-0 ml-4 lg:basis-1/6 max-md:basis-1/3 max-sm:basis-1/2  md:basis-1/4  xl:basis-1/6 rounded-t-[8px]"
            >
              <Link href={`/shop/productDetils/${product.id}`}>
=======
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
      className="m-auto cursor-pointer md:w-[88%] sm:w-[85%] w-[100%] ">
        <CarouselContent dir="rtl">
          {[...Offersproducts?.data,...Offersproducts?.data,...Offersproducts?.data].map((product: any) => (
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
                  price={product.price}
                  ProductDet={product.id}
                />
              </div>
              {/* <Link href={`/shop/productDetils/${product.id}`}>
>>>>>>> Stashed changes
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
                  <p className="line-clamp-2 font-[Tajawal] xl:pr-1 text-[#007580] text-[20px] max-md:text-[12px] md:text-[14px] text-right ">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default TodayOffers;
