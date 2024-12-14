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
  priceBeforOffer: number;
  priceAfterOffer: number;
  percentageOfDiscount: number;
  amountYouShouldToBuyForGetOffer: number;
  amountYouWillGetFromOffer: number;
  offerSentence: string;
  offerStartDate: string; 
  offerEndDate: string; 
  mainImageUrl: string;
  number: string;
  brandName: string;
  categoryName: string;
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  productImages: ProductImage[];
  attributesWithValues: AttributeWithValues[];
}