"use client";
 
import ProductCard from "@/components/product_card/ProductCard";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Slider from "react-slick";
import { useRef } from "react";

const ProductCarsoule = ({
  products = [],
  sectionTitle,
  sectionHref,
}: {
  products: NormalizedProductType[];
  sectionTitle: string;
  sectionHref?: string;
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };
  const settings: import("react-slick").Settings = {
    dots: false,
    infinite:products?.length > 2? true : false,
    speed: 200,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true, 
    autoplaySpeed: 5000,
    arrows: true,
    // rtl: true, 
    responsive: [
      {
        breakpoint: 1530, // أقل من XL (1280px)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1280, // أقل من XL (1280px)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 934, // أقل من XL (1280px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 660, // أقل من MD (768px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 300, // أقل من SM (480px)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div dir="rtl" className="lg:container mx-auto sm:p-4 p-2">
      <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5 ">
          <h3 className={" lg:text-lg text-base font-bold relative p-3"}>
            {sectionTitle}
          </h3>
          <div className="w-[150px] h-[2px] rounded-full bg-primary" />
        </div>
      </div>
      <div className="w-full relative overflow-hidden " >
        <Slider {...settings} ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className="px-2 my-2 sm:w-[220px] w-[180px]" dir="rtl" >
              <ProductCard data={product} />
            </div>
          ))}
        </Slider>

        <>
          <button
            className="bg-white opacity-85 absolute   top-[50%] -translate-y-[50%]  z-10 hover:opacity-100 p-3 border rounded-full text-primary hover:text-black hover:shadow-sm transition duration-300 -right-4"
            onClick={next}
          >
            <ArrowRight />
          </button>
          <button
            className="bg-white p-3 absolute z-[0] top-[50%]  -translate-y-[50%]   border opacity-85 hover:opacity-100 rounded-full text-primary hover:text-black hover:shadow-sm transition duration-300 -left-4"
            onClick={previous}
          >
            <ArrowLeft />
          </button>
        </>


      </div>

      {sectionHref && <div className="flex items-center justify-center my-4 border-b mt-8" >
        <Link href={sectionHref}>
          <button className="btn bg-secondary flex items-center gap-x-4 text-sm p-3   rounded-t-md   text-white group ">
            <h3 className="mdHalf:text-sm  text-xs -translate-y-[1px] transition duration-500 pr-1">
              عرض المزيد
            </h3>
            <IoIosArrowBack className=" transition duration-500 text-lg" />
          </button>
        </Link>
      </div>}
    </div>
  );
};
export default ProductCarsoule;

// "use client";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import SectionTitle from "@/app/(home)/components/section-title";
// import ProductCard from "@/app/(home)/components/product-card";
// import { NormalizedProductType } from "@/Data/normalizTypes";

// const ProductCarsoule = ({
//   products = [],
//   sectionTitle,
//   sectionHref
// }: {
//   products: NormalizedProductType[];
//   sectionTitle: string;
//   sectionHref: string;

// }) => {

//   return (
//     <div className="   ">
//       <SectionTitle title={sectionTitle} href={sectionHref} />
//       <div className="md:w-[99%] w-full ">
//         <Carousel
//           opts={{
//             direction: "rtl",
//             slidesToScroll:1,
//             breakpoints:{
//               '(min-width: 934px)': {
//                 slidesToScroll: 2,
//               },
//             }
//           }}
//           plugins={[
//             Autoplay({
//               delay: 5000,
//               active: true,
//               stopOnMouseEnter:true,
//               stopOnFocusIn:true,
//               playOnInit:true,
//             }),
//           ]}
//           className="m-auto cursor-pointer md:mx-5 "
//         >
//           <CarouselContent dir="rtl" className="py-10 w-full">
//             {products?.map((product: NormalizedProductType) => (
//               <CarouselItem key={product.id} className=" sm:basis-[240px] 1xs:basis-[190px] 2xl:basis-1/6 xl:basis-1/5  pr-[0.8rem]">
//                 <div className="sm:w-[220px]  1xs:w-[180px] w-full">
//                   <ProductCard
//                     key={product.id}
//                     data={product}
//                   />
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="hidden mdHalf:block"  >
//           <CarouselNext className="-right-2  bg-white opacity-100 shadow-lg  w-12 h-12 " />
//           <CarouselPrevious className="-left-2  bg-white opacity-100 shadow-lg  w-12 h-12" />
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default ProductCarsoule;
