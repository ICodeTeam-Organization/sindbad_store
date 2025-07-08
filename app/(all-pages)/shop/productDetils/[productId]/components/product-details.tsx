import React from "react";
import PriceSection from "./price-section";
import ImageGalleryProductDetails from "./image-gallery";
import AddToBasketBtnForProductDetails from "./add-to-basket-proDetails";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { getRemainingTimeForOffer } from "@/lib/timeFuns";
import { NormalizedProductType } from "@/Data/normalizTypes";
import Link from "next/link";
import CategorisListSection from "./CategorisListSection";
type ProductDetailsProps = {
  product: NormalizedProductType;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-12 mdHalf:px-12 px-4">
      <div className=" ml-8 mdHalf:w-[500px] w-full">
        <ImageGalleryProductDetails
          blurHash={product.blurHash}
          productId={+product.id}
          images={[product.image, ...(product.images ?? [])]}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-4 my-6">
            <div>
              <div className=" border-l-2 pl-4 border-l-gray-200 py-1 flex mb-4">
                <span className="text-gray-500 text-base mx-1">
                  {product?.rate?.toFixed(1)}
                </span>
                <Rating
                  style={{ maxWidth: 100 }}
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
              <h2 className="text-black text-2xl font-semibold">
                {product?.name}
              </h2>
            </div>
            <div className="flex  my-4 mt-6 items-center gap-x-4 ">
              <PriceSection
                discountedPrice={product?.price} // product?.price هذا اذا فيه خصم يكون فيه السعر بعد الخصم واذا مافيه خصم يكون فيه السعر الاصلي
                originalPrice={product.priceBeforeDiscount ?? product?.price}
                discount={product.percentageOfDiscount ?? 0}
              />
            </div>

            <div>
              {product.offerSentence && product.hasOffer && (
                <div className="flex items-center col-span-2 mb-2 text-xs bg-primary text-white p-1 w-fit px-2 rounded-md tajawal">
                  <span>
                    {product.offerSentence ? product.offerSentence : ""}
                  </span>
                </div>
              )}
              {}
              {/* OFFER TIME  */}
              {(product.hasOffer ||
                (product.hasDiscount && product.isOfferStillOn)) && (
                <div className="flex flex-wrap gap-x-4 text-sm text-primary-background ">
                  <div className="text-red-600 text-sm mt-2">
                    الوقت المتبقي لنهاية العرض :{" "}
                    {getRemainingTimeForOffer(product.offerEndDate ?? "")}
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4   border border-primary-background border-opacity-15" />
            <p className="text-base text-gray-600 mt-4">
              {product?.shortDecription}
            </p>
          </div>

          <div className="text-sm">
            <CategorisListSection
              cats={[
                ...(product?.mainCategoriesIds ?? []),
                ...(product?.subCategoriesIds ?? []),
              ].map((e, x) => ({
                id: e,
                name: [
                  ...(product?.mainCategoriesNames ?? []),
                  ...(product?.subCategoriesNames ?? []),
                ][x],
              }))}
            />

            {product.tags.length > 0 && (
              <div className="  mb-2">
                <p className="  ml-1 mb-2 font-bold mt-2">التاقات</p>
                <div className="flex flex-wrap gap-4">
                  {product.tags
                    .filter((e) => !!e)
                    .map((tag, x) => (
                      <Link
                        href={"/shop?tags=" + tag.id}
                        className="bg-zinc-100 px-2 py-1 shadow cursor-pointer rounded text-xs  "
                        key={tag.id + x}
                      >
                        {tag.name.split(" ").join("_")}#
                      </Link>
                    ))}
                </div>
              </div>
            )}

            <div className="flex items-center col-span-2 mb-2 mt-4">
              <span className="font-medium ml-1 ">رقم المنتج : </span>
              <span className="bg-primary mx-1 text-white px-2  ">
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
