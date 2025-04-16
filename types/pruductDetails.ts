export type ProductImage = {
  imageUrl: string;
};
export type AttributeWithValues = {
  attributeName: string;
  values: string[];
};
export type Product = {
  id: number;
  name: string;
  description: string;
  priceBeforOffer: number; // ملاحظة: يمكن تغيير الاسم إلى priceBeforeOffer لتصحيح الإملاء
  priceAfterOffer: number;
  isDisable: boolean;
  percentageOfDiscount: number;
  amountYouShouldToBuyForGetOffer: number;
  amountYouWillGetFromOffer: number;
  offerSentence: string | null;
  offerStartDate: string; // بصيغة ISO
  offerEndDate: string;
  mainImageUrl: string;
  number: string;
  brandId: number | null;
  brandName: string | null;
  categoryName: string;
  mainCategoriesIds: number[];
  subCategoriesIds: (number | null)[];
  mainCategoriesNames: string[];
  subCategoriesNames: (string | null)[];
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  productImages: string[]; // حالياً مصفوفة فارغة، بس ممكن تكون روابط صور
  attributesWithValues: any[]; // يعتمد على تركيبة السمات (يمكنك تخصيصه أكثر إذا عندك التفاصيل)
};