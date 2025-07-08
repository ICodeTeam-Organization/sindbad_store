"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import ProductCard from "@/components/product_card/ProductCard";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export const fakeProducts: NormalizedProductType[] = [
  {
    id: 1,
    name: "ساعة جلدية فاخرة",
    image:
      "https://images.unsplash.com/photo-1606813909359-66cc9d3be3c4?auto=format&fit=crop&w=800&q=80",
    price: 250,
    priceAfterDiscount: 199,
    priceBeforeDiscount: 250,
    hasDiscount: true,
    hasOffer: false,
    percentageOfDiscount: 20,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.5,
    quantity: 10,
    extraQuantity: 0,
    shipCost: 10,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 10,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  {
    id: 2,
    name: "تفاح أحمر طازج",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    price: 15,
    priceAfterDiscount: 15,
    priceBeforeDiscount: 15,
    hasDiscount: false,
    hasOffer: false,
    percentageOfDiscount: 0,
    amountYouBuy: 0,
    amountYouGet: 0,
    offerSentence: "",
    offerStartDate: "",
    offerEndDate: "",
    rate: 4.8,
    quantity: 25,
    extraQuantity: 0,
    shipCost: 5,
    mainCategoriesIds: [],
    subCategoriesIds: [],
    mainCategoriesNames: [],
    subCategoriesNames: [],
    numOfReviewers: 8,
    tags: [],
  },
  // اضف باقي المنتجات حسب الحاجة
];

const NewProductsCarousel = ({
  // products = [],
  sectionTitle,
  sectionHref
}: {
  products: NormalizedProductType[];
  sectionTitle: string;
  sectionHref: string;
  
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
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    rtl: true,
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
      <div className="flex justify-between items-center ">
        <div>
          <h3 className={  "  lg:text-lg text-base font-bold relative pr-3"}>
            {sectionTitle} 
          </h3>
        </div>
        <Link href={sectionHref}>
        <button className="btn flex items-center text-sm ml-3 group ">
          <h3 className="mr-2 mdHalf:text-sm  text-xs group-hover:text-primary group-hover:underline  transition duration-500">عرض الكل</h3>
          <IoIosArrowBack className="text-sky-700 group-hover:text-primary group-hover:underline  transition duration-500" />
        </button>
        </Link>
      </div>
    </div>
      <div className="w-full relative overflow-hidden">
        <Slider {...settings} ref={sliderRef}>
          {fakeProducts.map((product) => (
            <div key={product.id} className="px-2 my-2 sm:w-[220px] w-[180px]" >
              <ProductCard data={product} />
            </div>
          ))}
        </Slider>
        <div className="flex w-full items-center justify-between absolute z-50 top-[48%]">
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
        </div>
      </div>
    </div>
  );
};

export default NewProductsCarousel;
