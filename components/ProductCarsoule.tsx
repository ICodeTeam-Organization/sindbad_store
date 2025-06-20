"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SectionTitle from "@/app/(home)/components/section-title";
import ProductCard from "@/app/(home)/components/product-card";
import { NormalizedProductType } from "@/Data/normalizTypes";

const ProductCarsoule = ({
  products = [],
  sectionTitle,
  sectionHref
}: {
  products: NormalizedProductType[];
  sectionTitle: string;
  sectionHref: string;
  
}) => {

  
 
  return (
    <div className="   ">
      <SectionTitle title={sectionTitle} href={sectionHref} />
      <div className="md:w-[99%] w-full ">
        <Carousel
          opts={{
            direction: "rtl",
            slidesToScroll:1, 
            breakpoints:{
              '(min-width: 934px)': {
                slidesToScroll: 2,
              },
            }
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              active: true,
              stopOnMouseEnter:true,
              stopOnFocusIn:true,
              playOnInit:true,
            }),
          ]}
          className="m-auto cursor-pointer md:mx-5 "
        >
          <CarouselContent dir="rtl" className="py-10    w-full ">
            {products?.map((product: NormalizedProductType) => (
              <CarouselItem key={product.id} className=" sm:basis-[240px] 1xs:basis-[190px] 2xl:basis-1/6 xl:basis-1/5  pr-[0.8rem]">
                <div className="sm:w-[220px]  1xs:w-[180px] w-full">
                  <ProductCard
                    key={product.id}
                    data={product} 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden mdHalf:block"  >
          <CarouselNext className="-right-2  bg-white opacity-100 shadow-lg  w-12 h-12 " />
          <CarouselPrevious className="-left-2  bg-white opacity-100 shadow-lg  w-12 h-12" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarsoule;
 