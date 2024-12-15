export type Category = {
  id: number;
  name: string;
  imageUrl?: string;
};

export type CategoryWithSub = {
  id: number;
  name: string;
  imageUrl?: string;
  subCategoriesForVeiw:[]
};

export interface MainCategory {
  id: number;
  name: string;
  imageUrl: string;
  categoryTypeName: string;
  categoryTypeNumber: number;
  subCategories?:MainCategory[]
  parentCategoryId?:number
}

// for e shops
interface EcommerceStoreImage {
  id: number;
  imageUrl: string;
}


export interface Store {
  id: string;
  name: string;
  websiteLink: string;
  description: string;
  mainImageUrl: string;
  imagesUrl:string[];
}

export interface Shop {
  id: number;
  name: string;
  urlLinkOfStore: string;
  description: string;
  logo: string;
  ecommerceStoreImages: EcommerceStoreImage[];
}

export type FavoriteProduct = {
  favoriteId: number;
  productId: number;
  customerId: string;
  productName: string;
  productDescription: string;
  price: number;
  mainImageUrl: string;
};


export type FavoriteStores = {
  id?: string;
  storeId: string;
  storeName: string;
  description: string;
  imageUrl: string;
};

export type FavoriteEcommerces = {
  id: number;
  ecommerceStoreId: number;
  description: string;
  logo: string;
  ecommerceStoreName?:string
  urlLinkOfStore:string
};


//this Product type just for testing
export type Product = {
    id: number;
    name: string;
    price: number;
    priceAfterOffer: number;
    amountYouShouldToBuyForGetOffer: number;
    amountYouWillGetFromOffer: number;
    offerSentence: string;
    percentageOfDiscount: number;
    offerStartDate: string; // Use `Date` if you want a Date object instead of ISO string
    offerEndDate: string;   // Use `Date` if you want a Date object instead of ISO string
    mainImageUrl: string;
    oneStarCount: number;
    twoStarCount: number;
    threeStarCount: number;
    fourStarCount: number;
    fiveStarCount: number;
  }
  
//////////////////////

export type CartItem = {
  cartId: number;
  productId: number,
  name?: string;
  price?: number;
  priceAfterDiscount?: number | null;
  imageUrl?: string;
  quantity: number;
  shipCost?: number;
};
