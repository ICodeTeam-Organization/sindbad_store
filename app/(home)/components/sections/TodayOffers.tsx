import { AiOutlineHeart } from "react-icons/ai";
import SectionTitle from "../SectionTitle";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
const TodayOffers = async () => {
  const Offersproducts = await getApi<any>(
    // change the url later
    "Product/Market/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/10"
  );
  if (!Offersproducts) return notFound;

  return (
    <>
      <div className="container mx-auto sm:px-4 xl:px-32 pt-10">
        <SectionTitle title={"عروض اليوم"} />
      </div>
      <Carousel className="m-auto max-md:w-[265px] md:w-[650px] max-sm:w-[280px] sm:w-[500px] lg:w-[930px] xl:w-[1200px]">
        <CarouselContent dir="ltr" className="">
          {Offersproducts.data.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="pl-0 ml-4 lg:basis-1/6 max-md:basis-1/3 max-sm:basis-1/2  md:basis-1/4  xl:basis-1/6 rounded-t-[8px]"
            >
              <Image
                className="h-[210px] max-md:h-[120px] md:h-[120px] xl:h-[150px] rounded-t-[8px]"
                src={product.mainImageUrl}
                alt={""}
                width={400}
                height={0}
              />
              <div className="border-[1px] border-[#C3C3C3] border-t-0 pr-1">
                <p className="line-clamp-2 font-[Tajawal] xl:pr-1 text-[#007580] text-[20px] max-md:text-[12px] md:text-[14px] text-right ">
                  <strong>{product.name}</strong>
                </p>
                <div className="max-md:mt-2 max-sm:pr-0 pr-5 lg:mt-4 xl:mb-2 md:mt-1 text-right max-md:gap-0 md:gap-0 max-md:text-[12px] gap-[7px] flex justify-end">
                  <p className="pr-3 text-[12px] line-through">
                    {/* {products.oldPrice} */}
                  </p>
                  <p className=" text-lg  text-[#F55157]">
                    <strong>{product.price}</strong>
                  </p>
                </div>
                <div className="my-1 flex justify-around max-md:justify-between items-center w-full">
                  <div className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                    <AiOutlineHeart
                      className="w-[20px] h-[20px]"
                      color="#D5D5D5"
                    />
                  </div>
                  <div className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-700 max-md:w-32 max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
                    <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
                    <p className="max-md:text-[7px]">اضف للسلة</p>
                  </div>
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
