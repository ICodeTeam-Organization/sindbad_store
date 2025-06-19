import { NormalizedProductType } from "../normalizTypes";

export function normalizeProduct(input: any): NormalizedProductType {
  
    const numOfReviewers =
    (input?.oneStarCount || 0) +
    (input?.twoStarCount || 0) +
    (input?.threeStarCount || 0) +
    (input?.fourStarCount || 0) +
    (input?.fiveStarCount || 0);
  const noOfStars =
    (input?.oneStarCount || 0) * 1 +
    (input?.twoStarCount || 0) * 2 +
    (input?.threeStarCount || 0) * 3 +
    (input?.fourStarCount || 0) * 4 +
    (input?.fiveStarCount || 0) * 5;
  const rating =
    numOfReviewers > 0 ? noOfStars / numOfReviewers : input?.rate || 0;

  const originalPrice =
    input.price ?? input.priceBeforeDiscount ?? input.priceBeforOffer ?? 0;
  const discountedPrice =
    input.priceAfterDiscount ??
    input.priceAfterOffer ??
    input.priceAfter ??
    originalPrice;
  const hasDiscount = discountedPrice < originalPrice;
  const percentageOfDiscount =
    hasDiscount && originalPrice > 0
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const hasOffer =
    input.amountYouBuy ||
    input.amountYouGet ||
    input.offerSentence ||
    input.buyAndGet || false;

  const offerSentence = hasOffer
    ? input.offerSentence ??
      input.buyAndGet ??
      (input.amountYouBuy &&
        input.amountYouGet &&
        `اشتري ${input.amountYouBuy} واحصل على ${input.amountYouGet}`) ?? undefined
    : undefined;

  return {
    id: input.id ?? input.productId ?? input._id,

    name: input.name ?? input.productName ,

    description: input.description ?? input.productDescription ?? "",

    price: hasDiscount ? discountedPrice : originalPrice,

    priceAfterDiscount: discountedPrice,
    priceBeforeDiscount:
      input.priceBeforeDiscount ?? input.priceBeforOffer ?? originalPrice,
    percentageOfDiscount: percentageOfDiscount,

    amountYouBuy:
      input.amountYouBuy ?? input.amountYouShouldToBuyForGetOffer ?? undefined,

    amountYouGet:
      input.amountYouGet ?? input.amountYouWillGetFromOffer ?? undefined, 

    offerSentence: offerSentence,

    offerStartDate: input.offerStartDate ?? undefined,

    offerEndDate: input.offerEndDate ?? undefined,

    image: input.image ?? input.mainImageUrl ?? undefined,

    images:
      (input.images || input.productImages)?.map((img: any) => img?.imageUrl || img) ??
      [],

    rate: rating,

    quantity: input.quantity,

    shipCost: input.shipCost,

    favoriteId: input.favoriteId,

    customerId: input.customerId,

    isDisabled: input.isDisable ?? input.isDisabled,

    productNumber: input.number,

    brandId: input.brandId, 

    brandName: input.brandName,

    categoryName: input.categoryName,
    
    mainCategoriesIds: input.mainCategoriesIds,
    subCategoriesIds: input.subCategoriesIds,
    mainCategoriesNames: input.mainCategoriesNames,
    subCategoriesNames: input.subCategoriesNames,
    attributesWithValues: input.attributesWithValues,
    hasDiscount: hasDiscount,
    hasOffer: hasOffer,
    numOfReviewers: numOfReviewers,
    oneStarCount: input.oneStarCount ?? 0,
    twoStarCount: input.twoStarCount ?? 0,
    threeStarCount: input.threeStarCount ?? 0,
    fourStarCount: input.fourStarCount ?? 0,
    fiveStarCount: input.fiveStarCount ?? 0
  };
}
