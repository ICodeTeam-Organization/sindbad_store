

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
}

export interface ProductDetailsProps {
  description: string;
  rating: number;
  availability: string;
  productNumber: string;
  category: string;
  brand: string;
  discountedPrice: string;
  originalPrice: string;
  discount: number;
  colors: string;
  size: string;
  memory: string;
  storage: string;
  name:string;
}

export interface ImageGalleryProps {
  images: string[];
}

export interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export interface PriceSectionProps {
  discountedPrice: number;
  originalPrice: number;
  discount: number;
}

export interface ProductInfoRowProps {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
}

export interface ProductFeature {
  label: string;
  value: string;
}

export interface ProductFeaturesTableProps {
  features: ProductFeature[];
}
export interface ReviewProps {
  customerName: string;
  reviewText: string;
  reviewDate: string;
  customerImage: string | null;
  numOfRate: number;
  isDeleted: boolean;
};
// interface Review {
//   customerName: string;     
//   reviewText: string;     
//   reviewDate: string;       
//   customerImage: string;    
//   numOfRate: number;        
//   isDeleted: boolean;        
// }

export interface ReviewFormProps {
  productId: number;
}

export interface ProductImage {
  imageUrl: string;
}
export interface AttributeWithValues {
  attributeName: string;
  values: string[];
}
export interface Product {
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

