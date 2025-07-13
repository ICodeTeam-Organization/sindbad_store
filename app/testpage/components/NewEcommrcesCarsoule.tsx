"use client";

import Slider from "react-slick";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import {
  Loader2, 
} from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SafeImage from "@/components/SafeImage";

type EcommerceImage = {
  id: number;
  imageUrl: string;
};

type Shop = {
  id: number;
  name: string;
  description: string;
  logo: string;
  urlLinkOfStore: string;
  ecommerceStoreImages: EcommerceImage[];
  categories: string[];
  coupon: string;
};

const shops: Shop[] = [
  {
    id: 1,
    name: "متجر التقنية",
    description: "أحدث الإلكترونيات وأدوات التكنولوجيا.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://techstore.com",
    ecommerceStoreImages: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["إلكترونيات", "هواتف", "ملحقات"],
    coupon: "TECH10",
  },
  {
    id: 2,
    name: "متجر الأزياء",
    description: "موضة عصرية لجميع الأعمار.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://fashionhub.com",
    ecommerceStoreImages: [
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["رجالي", "نسائي", "أطفال"],
    coupon: "FASHION15",
  },
  {
    id: 1,
    name: "متجر التقنية",
    description: "أحدث الإلكترونيات وأدوات التكنولوجيا.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://techstore.com",
    ecommerceStoreImages: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["إلكترونيات", "هواتف", "ملحقات"],
    coupon: "TECH10",
  },
  {
    id: 2,
    name: "متجر الأزياء",
    description: "موضة عصرية لجميع الأعمار.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://fashionhub.com",
    ecommerceStoreImages: [
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["رجالي", "نسائي", "أطفال"],
    coupon: "FASHION15",
  },
  {
    id: 1,
    name: "متجر التقنية",
    description: "أحدث الإلكترونيات وأدوات التكنولوجيا.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://techstore.com",
    ecommerceStoreImages: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["إلكترونيات", "هواتف", "ملحقات"],
    coupon: "TECH10",
  },
  {
    id: 2,
    name: "متجر الأزياء",
    description: "موضة عصرية لجميع الأعمار.",
    logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    urlLinkOfStore: "https://fashionhub.com",
    ecommerceStoreImages: [
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
      },
    ],
    categories: ["رجالي", "نسائي", "أطفال"],
    coupon: "FASHION15",
  },
  // أضف بقية المتاجر هنا بنفس الهيكل
];

// const NextArrow = (props: any) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !text-[#F58634] z-10 right-[-35px]`}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     >
//       <ChevronLeft />
//     </div>
//   );
// };

// const PrevArrow = (props: any) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !text-[#F58634] z-10 left-[-35px]`}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     >
//       <ChevronRight />
//     </div>
//   );
// };

const NewEcommrcesCarsoule = () => {
  const [favoriteShops, setFavoriteShops] = useState<number[]>([]);
  const [loadingShopId, setLoadingShopId] = useState<number | null>(null);

  const toggleFavorite = (id: number) => {
    setLoadingShopId(id);
    setTimeout(() => {
      setFavoriteShops((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
      setLoadingShopId(null);
    }, 600);
  };

  const sliderRef = useRef<Slider | null>(null);
  // const next = () => {
  //   sliderRef.current?.slickNext();
  // };
  // const previous = () => {
  //   sliderRef.current?.slickPrev();
  // };
  const settings: import("react-slick").Settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    rtl: true,
    responsive: [ 
      {
        breakpoint: 1280, // أقل من XL (1280px)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800, // أقل من XL (1280px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      }, 
      {
        breakpoint: 660, // أقل من XL (1280px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      }, 
      {
        breakpoint: 430, // أقل من XL (430px)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      }, 
    ],
  };

  return (
    <div className="bg-[#F8F8F8] w-full pb-6">
      <div className="pb-6  ">
        <div className="lg:container mx-auto relative sm:p-4 p-2">
          <div className="pt-10 mb-5 pr-3">
            <h1 className="text-[#333333] font-bold text-lg">جميع المتاجر</h1>
            <p className="text-sm text-[#666666]">
              تسوق أحدث المنتجات المميزة المضافة حديثًا
            </p>
          </div>

          <div className="w-full relative overflow-hidden ">
            <Slider {...settings} ref={sliderRef}>
              {shops.map((shop) => {
                const isFavorite = favoriteShops.includes(shop.id);
                const isLoading = loadingShopId === shop.id;

                return (
                  <div key={shop.id} className="px-2">
                    {" "}
                    {/* 👈 المسافة الجانبية لكل عنصر */}
                    <div
                      dir="rtl"
                      className="group  lgHalf:h-[135px]   overflow-hidden hover:cursor-pointer border border-gray-300 rounded-[10px] bg-white hover:border-[#F58634] transition-all duration-700"
                    >
                      <div className=" lgHalf:flex flex-row items-stretch h-full lgHalf:p-3 p-2 gap-3">
                        {/* Logo section */}
                        <div className="flex justify-center items-center lgHalf:aspect-[10/7]  aspect-square  overflow-hidden rounded-[8px]   relative ">
                         
                            <SafeImage
                            src={shop.logo}
                            alt={shop.name}
                            fill
                            className="object-cover" width={0} height={0}                            />
                         
                          <div
                              onClick={() => toggleFavorite(shop.id)}
                              className={cn(
                                "cursor-pointer top-2 right-2 p-2 rounded-full absolute shadow-sm   group bg-[#fff] hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300   flex justify-center items-center ",
                              )}
                            >
                              {isLoading ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <AiFillHeart
                                  className={cn(
                                    "w-[20px] h-[20px] translate-y-[1.5px]",
                                    isFavorite && "block"
                                  )}
                                />
                              )}
                            </div>
                        </div>

                        {/* Details section */}
                        <div className="flex-1 flex flex-col justify-between  h-full  ">
                          <div className="my-2">
                            <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
                              {shop.name}
                            </h1>
                            <p className="mdHalf:text-sm text-[10px] line-clamp-1 my-1 text-[#666666]">
                              {shop.description || "."}
                            </p>
                          </div>

                          <div className="flex w-full gap-x-2">
                            {!shop.urlLinkOfStore ? (
                              <div className="flex-1 p-2 cursor-pointer rounded-[8px] border group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200">
                                <h1 className="text-base">
                                  لا يوجد رابط للمتجر
                                </h1>
                                <IoIosArrowBack />
                              </div>
                            ) : (
                              <Link
                                href={shop.urlLinkOfStore}
                                target="_blank"
                                className="flex-1 p-2 cursor-pointer rounded-[6px] border hover:bg-[#F58634] hover:border-[#F58634] hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
                              >
                                <h1 className="text-sm">زيارة المتجر</h1>
                                {/* <IoIosArrowBack /> */}
                              </Link>
                            )}

                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>

            {/* <div className="flex w-full items-center justify-between absolute z-50 top-[48%]">
              <button
                className="bg-white p-3 border rounded-sm text-primary hover:text-black hover:shadow-sm transition duration-300"
                onClick={next}
              >
                <ArrowRight />
              </button>
              <button
                className="bg-white p-3 border rounded-sm text-primary hover:text-black hover:shadow-sm transition duration-300 -left-5"
                onClick={previous}
              >
                <ArrowLeft />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEcommrcesCarsoule;
