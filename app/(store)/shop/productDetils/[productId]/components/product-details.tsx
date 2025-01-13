"use client"
import React, { useState } from "react";
import ProductTitle from "./product-title";
import PriceSection from "./price-section";
import ImageGallery from "./image-gallery";
import AddToBasket from "./add-to-basket";
import {Product} from "./../types"
import {AttributeWithValues} from "./../types"

type ProductDetailsProps = {
  product: Product;
};


const ProductDetails = ({ product }: ProductDetailsProps) => {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-12 px-12">
      <div className="lg:w-1/3 ml-8">
        <ImageGallery
          images={[
            product.mainImageUrl,
            ...product.productImages.map((img: any) => img.imageUrl),
          ]}
        />
      </div>
      <div className="lg:w-1/2">
        <ProductTitle name={product.name} description={product.description} rating={5} />

        <div className="grid grid-cols-2 text-sm text-gray-700">
          <div className="flex items-center col-span-2 mb-2">
            <span className="font-medium ml-1 ">رقم المنتج:</span>
            <span>{product.number}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium ml-1">{product.brandName !== null ? "الماركة: " : ""}</span>
            <span>{product.brandName !== null ? product.brandName : ""}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium ml-1">{product.categoryName !== null ? "الفئة: " : ""}</span>
            <span>{product.categoryName !== null ? product.categoryName : ""}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium ml-1">{product.offerStartDate !== null ? "بداية العرض: " : ""}</span>
            <span>{product.offerStartDate !== null ? product.offerStartDate : ""}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="font-medium ml-1">{product.offerEndDate !== null ? "نهاية العرض: " : ""}</span>
            <span>{product.offerEndDate !== null ? product.offerEndDate : ""}</span>
          </div>
          {
            product.attributesWithValues?.length > 3 ? (
              product.attributesWithValues?.slice(0,3).map((attribute:AttributeWithValues , index) =>(
                <div key={index} className="flex items-center mb-2">
                  <span className="font-medium ml-1">{attribute.attributeName}: </span>
                  <span>{attribute.values.join(", ")}</span>
                </div>
              ))
            ):(
              product.attributesWithValues?.map((attribute, index) =>(
                <div key={index} className="flex items-center mb-2">
                  <span className="font-medium ml-1">{attribute.attributeName}: </span>
                  <span>{attribute.values.join(", ")}</span>
                </div>
              ))
            )
          }
        </div>

        <PriceSection
          discountedPrice={product.priceAfterOffer}
          originalPrice={product.priceBeforOffer}
          discount={product.percentageOfDiscount}
        />
        <hr className="my-4 border-gray-300" />

        <div className="flex items-center col-span-2 mb-2">
            <span className="font-medium ml-1">{product.offerSentence !== null ? "جملة العرض: " : ""}</span>
            <span>{product.offerSentence !== null ? product.offerSentence : ""}</span>
          </div>

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
        <div className="flex items-center gap-4 mt-8">
          {/* <div className="flex items-center gap-4">
            <button
              className="bg-gray-200 py-2 px-4 text-lg"
              onClick={handleDecrement}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="bg-gray-200 py-2 px-4 text-lg"
              onClick={handleIncrement}
            >
              +
            </button>
          </div> */}

          <AddToBasket
        id={product.id}
        productInfo={{
          image: product.mainImageUrl,
          productName: product.name,
          price: product.priceAfterOffer,
          oldPrice: product.priceBeforOffer,
        }}
      />        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
