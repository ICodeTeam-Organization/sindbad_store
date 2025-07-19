import React from "react";
import PriceSection from "./price-section";
import ImageGalleryProductDetails from "./image-gallery";
import AddToBasketBtnForProductDetails from "./add-to-basket-proDetails";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { getRemainingTimeForOffer } from "@/lib/timeFuns";
import { NormalizedProductType } from "@/Data/normalizTypes";
import Link from "next/link";
import CategorisListSection from "./CategorisListSection";
import { get_currency_key } from "@/lib/cookie/cookie.clients"; 
import ShareButton from "./ShareButton";
import ButtonAddToFavoriteOfProDetails from "./ButtonAddToFavoriteOfProDetails"; 
type ProductDetailsProps = {
  product: NormalizedProductType;
  // store:Store |null
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex  2lg:flex-row flex-col gap-4 gap-x-0 bg-whi mdHalf:px-12 px-4">
      <div className="max-2lg:hidden">
        <div className="me-4">
          <ShareButton />
        </div>
        <div className="me-4 mt-4">
          <ButtonAddToFavoriteOfProDetails id={product.id} />
        </div>
      </div>
      <div className=" ml-8 lgHalf:w-[500px] 2lg:w-[410px] w-full bg-white p-8 rounded-lg shadow-sm">
        <ImageGalleryProductDetails
          images={[product.image, ...(product.images ?? [])]}
        />
      </div>
      <div className="2lg:hidden   ">
        <div className="flex gap-x-2">
          <div className="2lg:m-4  ">
            <ShareButton />
          </div>
          <div className="2lg:m-4  ">
            <ButtonAddToFavoriteOfProDetails id={product.id} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white 2lg:p-8 p-4 rounded-lg shadow-sm">
        <div>
          <div className="mb-6">
            <div className="flex items-center col-span-2 mb-2 text-sm text-gray-500">
              <span className="font-medium ml-1 ">رقم المنتج : </span>
              <span className=" px-2  ">{product.productNumber}</span>
            </div>

            <div className="my-4">
              <h2 className="text-black mdHalf:text-lg text-base font-semibold">
                {product?.name}
              </h2>
            </div>

            <div className="flex  my-4 mt-6 items-center gap-x-4 justify-between ">
              <div className="flex items-center justify-center">
                <PriceSection
                  discountedPrice={product?.price} // product?.price هذا اذا فيه خصم يكون فيه السعر بعد الخصم واذا مافيه خصم يكون فيه السعر الاصلي
                  originalPrice={product.priceBeforeDiscount ?? product?.price}
                  discount={product.percentageOfDiscount ?? 0}
                  currency={get_currency_key(product.country)}
                />
                {product.offerSentence && product.hasOffer && (
                  <div className="flex items-center col-span-2   text-xs bg-danger text-white p-1 w-fit px-2 rounded-sm tajawal">
                    <span>
                      {product.offerSentence ? product.offerSentence : ""}
                    </span>
                  </div>
                )}
              </div>
              <div className="  border-l-gray-200  flex  pr-2">
                <Rating
                  style={{ maxWidth: 90 }}
                  halfFillMode="svg"
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#ffb700",
                    inactiveFillColor: "#eee",
                  }}
                  readOnly
                  value={product?.rate}
                />
                <span className="text-secondary font-bold text-base mx-2">
                  {product?.rate?.toFixed(1)}
                </span>
              </div>
            </div>

            <div>
              {/* OFFER TIME  */}
              {(product.hasOffer ||
                (product.hasDiscount && product.isOfferStillOn)) && (
                <div className="flex flex-wrap gap-x-4 text-sm text-primary-background ">
                  <div className="text-secondary text-sm mt-2">
                    الوقت المتبقي لنهاية العرض :{" "}
                    {getRemainingTimeForOffer(product.offerEndDate ?? "")}
                  </div>
                </div>
              )}
            </div>

            <hr className="my-4   border-2 border-dashed border-primary-background border-opacity-15" />
            <div>
              <p className="ml-1 font-bold mt-2 text-sm">الوصف</p>
              <p className="text-base text-gray-600 mt-4">
                {product?.shortDecription}
              </p>
            </div>
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
              <div className="mt-4  mb-2">
                <p className="  ml-1 mb-2 font-bold mt-2">التاقات</p>
                <div className="flex flex-wrap gap-4">
                  {product.tags
                    .filter((e) => !!e)
                    .map((tag, x) => (
                      <Link
                        href={"/shop?tags=" + tag.id}
                        className="border border-zinc-100 p-2 cursor-pointer rounded text-xs  "
                        key={tag.id + x}
                      >
                        {tag.name.split(" ").join("_")}#
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>{/* <StoreSectionDetails store={store} /> */}</div>

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
