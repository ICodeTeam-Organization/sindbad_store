"use client";
import React from "react";
import PriceSection from "./price-section";
import ImageGallery from "./image-gallery";
import AddToBasketBtnForProductDetails from "./add-to-basket-proDetails";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { getRemainingTimeForOffer } from "@/lib/timeFuns";
import { NormalizedProductType } from "@/Data/normalizTypes";

type ProductDetailsProps = {
  product: NormalizedProductType;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-12 mdHalf:px-12 px-4">
      <div className=" ml-8 mdHalf:w-[400px] w-full">
        <ImageGallery images={[product.image, ...(product.images ?? [])]} />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {/* <ProductTitle name={product.name} description={product.name} rating={5} /> */}

        {/* <div className="flex gap-x-2 text-sm text-gray-700">

         

          <div className="flex items-center mb-2">
            <span className="font-medium ml-1">
              {product.brandName !== null ? "الماركة: " : ""}
            </span>
            <span>{product.brandName !== null ? product.brandName : ""}</span>
          </div>

          <div className="" >
          {product.attributesWithValues?.length > 3
            ? product.attributesWithValues
                ?.slice(0, 3)
                .map((attribute: AttributeWithValues, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="font-medium ml-1">
                      {attribute.attributeName} : {" "}
                    </span>
                    <span>{attribute.values.join(", ")}</span>
                  </div>
                ))
            : product.attributesWithValues?.map((attribute, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="font-medium ml-1">
                    {attribute.attributeName}:{" "}
                  </span>
                  <span>{attribute.values.join(", ")}</span>
                </div>
              ))}
          </div>
        </div> */}

        {/* <ProductInfoRow
          label1="الألوان"
          value1={
            <select className="border border-gray-300 rounded-md p-2">
              {product.attributesWithValues
                .find((attr: any) => attr.attributeName === "Color")
                ?.values.map((color: any, index: any) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                )) || <option>N/A</option>}
            </select>
          }
          label2="الحجم"
          value2={
            <select className="border border-gray-300 rounded-md p-2">
              {product.attributesWithValues
                .find((attr: any) => attr.attributeName === "Size")
                ?.values.map((size: any, index: any) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                )) || <option>N/A</option>}
            </select>
          }
        /> */}
        <div>
          <div className="mb-4 my-6">
            <h2 className="text-black text-2xl font-bold">{product?.name}</h2>

            <div className="flex  my-4 mt-6 items-center gap-x-4 ">
              <div className=" border-l-2 pl-4 border-l-gray-200 py-1 flex">
                <span className="text-gray-500 text-xs mx-1">
                  {product?.rate?.toFixed(1)}
                </span>
                <Rating
                  style={{ maxWidth: 60 }}
                  halfFillMode="svg"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#eee",
                  }}
                  readOnly
                  value={product?.rate}
                />
              </div>
              <PriceSection
                discountedPrice={product?.price} // product?.price هذا اذا فيه خصم يكون فيه السعر بعد الخصم واذا مافيه خصم يكون فيه السعر الاصلي
                originalPrice={product.priceBeforeDiscount ?? product?.price}
                discount={product.percentageOfDiscount ?? 0}
              />
            </div>

            {getRemainingTimeForOffer(product.offerEndDate ?? "") != "" && (
              <div>
                {product.offerSentence && (
                  <div className="flex items-center col-span-2 mb-2 text-xs bg-primary-background text-white p-1 w-fit px-2 rounded-md tajawal">
                    <span>
                      {product.offerSentence ? product.offerSentence : ""}
                    </span>
                  </div>
                )}

                {/* OFFER TIME  */}
                {product.hasOffer ||
                  product.hasDiscount ||
                  (product.offerSentence !== null && (
                    <div className="flex flex-wrap gap-x-4 text-sm text-primary-background ">
                      <div className="text-red-600 text-sm mt-2">
                        الوقت المتبقي لنهاية العرض :{" "}
                        {getRemainingTimeForOffer(product.offerEndDate ?? "")}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <hr className="my-4   border border-primary-background border-opacity-15" />
            <p className="text-base text-gray-600 mt-4">
              {product?.description}
            </p>
          </div>

          <div className="text-sm">
            <div className="  mb-2">
              <p className="  ml-1 mb-2 font-bold">
                {product.categoryName !== null ? "الفئات : " : ""}
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  ...(product?.mainCategoriesNames ?? []),
                  ...(product?.subCategoriesNames ?? []),
                ]
                  .filter((e) => !!e)
                  .map((category: any, x) => (
                    <span
                      className="bg-zinc-100 px-2 py-1 shadow rounded text-xs  "
                      key={category + x}
                    >
                      {category !== null ? category : ""}
                    </span>
                  ))}
              </div>
              {/* <span className="bg-zinc-100 px-2 py-1 shadow rounded" >
              {product.categoryName !== null ? product.categoryName : " "}
            </span> */}
            </div>

            <div className="flex items-center col-span-2 mb-2 mt-4">
              <span className="font-medium ml-1 ">رقم المنتج : </span>
              <span className="bg-primary-background mx-1 text-white px-2  ">
                {product.productNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-8">
          <AddToBasketBtnForProductDetails
            id={product.id}
            productInfo={{
              image: product.image,
              productName: product.name,
              price: product.price,
              oldPrice: product.priceBeforeDiscount,
              amountYouBuy: product.amountYouBuy,
              amountYouGet: product.amountYouGet,
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
