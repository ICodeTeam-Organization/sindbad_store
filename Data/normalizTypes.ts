export type ProductQuantityPriceDto = {
  id: number;
  productId: number;
  minQuantity: number;
  pricePerUnit: number;
};
export type NormalizedProductType = {
  id: string | number;
  name: string;
  description?: string;
  shortDecription?: string;

  price: number; // السعر الأساسي
  minPrice: number; //   اقل سعر
  priceRange: any[] | null; //   اقل سعر
  priceAfterDiscount: number; // السعر بعد العرض أو الخصم
  priceBeforeDiscount: number; // السعر قبل العرض أو الخصم
  hasDiscount: boolean; // هل يوجد خصم
  hasOffer: boolean; // هل يوجد خصم
  percentageOfDiscount: number;

  amountYouBuy: number; // كم تشتري لتحصل عرض
  amountYouGet: number; // كم تحصل مجانًا من العرض
  offerSentence: string; // جملة العرض
  offerStartDate: string;
  offerEndDate: string;

  oneStarCount?: number;
  twoStarCount?: number;
  threeStarCount?: number;
  fourStarCount?: number;
  fiveStarCount?: number;
  storeId?: string,
  storeName?: string,

  image: string; // صورة رئيسية
  images?: string[];
  blurHash?: string; // صور إضافية
  productNumber?: string;

  rate: number;
  tags: { id: number; name: string }[];

  quantity: number;
  extraQuantity: number;
  shipCost: number;
  country: string;
  favoriteId?: number;
  customerId?: string;
  isDisabled?: boolean;
  isOfferStillOn?: boolean;

  brandId?: number;
  brandName?: string;
  categoryName?: string;

  mainCategoriesIds: number[];
  subCategoriesIds: number[];

  mainCategoriesNames: string[];
  subCategoriesNames: string[];
  numOfReviewers: number;

  attributesWithValues?: {
    attributeName: string;
    attributeValue: string;
  }[];

  productQuantitiesWithPrices: ProductQuantityPriceDto[]
};

export type NormalizedCategoryType = {
  id: number;
  name: string;
  image?: string;
  categoryTypeName?: string;
  categoryTypeNumber?: number;
  path: string;
  code: string;
  parentCategoryId?: number;
  subCategories?: NormalizedCategoryType[];
  country: string
};

export type NormalizedbgDataItemType = {
  reqType: number;
  reqValue: number;
  Id: number | string;
  reviewText?: string | null;
  primaryValue?: number;
  primaryReviewText?: string | null;
  date?: string;
};
