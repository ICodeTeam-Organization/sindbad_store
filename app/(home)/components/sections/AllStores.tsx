import { IoIosArrowBack } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
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

const AllStores = async () => {
  // Get all stores for slider in market homepage
  const Allstores = await getApi<any>(
    "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
  );
  if (!Allstores) return notFound();

  return (
    <div className="bg-[#F8F8F8] w-full max-md:h-[270px] h-[331px]">
      <div className="container  max-sm:px-4 md:px-8 lg:px-16 xl:px-32 pt-10">
        <h1 className="text-[#333333] text-[24px]">جميع المتاجر</h1>
        <p className="text-[16px] text-[#666666]">
          تسوق احدث المنتجات المميزة المضافة جديد
        </p>
      </div>
      <Carousel
        dir="ltr"
        className="m-auto max-sm:w-[320px] sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1280px] 2xl:w-[1500px]"
      >
        <CarouselPrevious className=" absolute -top-7 max-md:left-[0px] md:left-[0px] lg:left-[60px]  xl:left-[200px] text-[#F58634]" />
        <CarouselNext className=" absolute -top-7 max-md:left-[35px] md:left-[35px] lg:left-[100px] xl:left-[250px] text-[#F58634]" />
        <CarouselContent>
          {Allstores?.data?.map((store: any) => (
            <CarouselItem
              key={store.id}
              dir="rtl"
              className="flex items-center pl-0  ml-4 xl:basis-1/2 max-md:basis-1/2 md:basis-1/2 border-[2px] border-black rounded-sm bg-white w-[520px] h-56 max-md:h-[130px]  hover:border-[#F58634] transition-all duration-700"
            >
              <div className="w-full flex justify-center items-center">
                {store.mainImageUrl === null ? (
                  <h1>لاتوجد صورة للمتجر</h1>
                ) : (
                  <Image
                    src={store.mainImageUrl}
                    alt={"store"}
                    width={330}
                    height={200}
                  />
                )}
              </div>
              <div className="max-md:w-[300px] max-sm:w-[100px] md:w-[300px] max-sm:pr-1 mr-2  lg:w-[650px] max-md:mt-0 md:mt-0 mt-6">
                <h1 className="text-[25px] max-md:text-[15px] max-sm:mt-1 max-sm:text-xs font-bold text-right line-clamp-2">
                  {store.name}
                </h1>
                <p className="text-[17px] max-sm:text-[10px] line-clamp-2 text-[#666666]">
                  {store.description}
                </p>
                <div className="flex items-center max-md:mt-0 md:mt-2 mt-1 max-sm:w-20 max-sm:mt-0">
                  <AiFillStar className="text-[#FFC62A]" />
                  <AiFillStar className="text-[#FFC62A]" />
                  <AiFillStar className="text-[#FFC62A]" />
                  <AiFillStar className="text-[#FFC62A]" />
                  <AiFillStar className="text-[#D6D6D6]" />
                  <p className="text-[#A5A5A5] max-sm:text-[10px] mr-3">
                    (4.5)
                  </p>
                </div>
                {store.websiteLink === null ? (
                  <div
                    aria-disabled
                    className="max-md:w-[110px] max-sm:w-[70px] md:w-[150px] max-md:h-[25px] md:h-[47px] cursor-pointer xl:w-[260px] h-[56px] text-xl max-lg:w-[200px] rounded-sm border-[1px] bg-gray-400 transition-all duration-700 flex justify-center items-center border-black"
                  >
                    <h1 className="max-md:text-[15px] font-bold max-sm:text-[7px]">
                      لايوجد رابط إلى المتجر
                    </h1>
                    <IoIosArrowBack />
                  </div>
                ) : (
                  <Link href={store.websiteLink}>
                    <div className="max-md:w-[110px] max-sm:w-[70px] md:w-[150px] max-md:h-[25px] md:h-[47px] cursor-pointer xl:w-[260px] h-[56px] text-xl max-lg:w-[200px] rounded-sm border-[1px] hover:bg-[#F58634] hover:text-white transition-all duration-700 flex justify-center items-center border-black">
                      <h1 className="max-md:text-[15px] font-bold max-sm:text-[7px]">
                        زيارة المتجر
                      </h1>
                      <IoIosArrowBack />
                    </div>
                  </Link>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AllStores;
