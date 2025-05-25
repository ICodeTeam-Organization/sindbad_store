"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/storeTypes";
import SectionTitle from "@/app/(home)/components/section-title";
import ProductCard from "@/app/(home)/components/product-card";

const ProductCarsoule = ({
  products = { data: [] },
  sectionTitle,
  sectionHref
}: {
  products: { data: Product[] };
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
            {products?.data?.map((product: Product) => (
              <CarouselItem key={product.id} className=" sm:basis-[240px] 1xs:basis-[190px] 2xl:basis-1/6 xl:basis-1/5  pr-[0.8rem]">
                <div className="sm:w-[220px]  1xs:w-[180px] w-full">
                  <ProductCard
                    key={product.id}
                    id={product.id+""}
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
                    oneStarCount={product.oneStarCount}
                    twoStarCount={product.twoStarCount}
                    threeStarCount={product.threeStarCount}
                    fourStarCount={product.fourStarCount}
                    fiveStarCount={product.fiveStarCount}
                    // amountYouBuy={product.}
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
 