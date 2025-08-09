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
// for e shops

export interface Store {
  id: string;
  name: string;
  websiteUrl: string;
  description: string;
  imageUrl: string;
  images:{imageUrl:string}[];
  storeCategoriesIds:{id: number, categoryName: string}[];

}
 

export interface EcommerceStoreImage {
  id: number;
  imageUrl: string;
}

export interface Shop {
  id: number;
  name: string;
  urlLinkOfStore: string;
  description: string;
  logo: string;
  categories: string[];
  ecommerceStoreImages: EcommerceStoreImage[];
  coupon:string;
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
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type FavoriteEcommerces = {
  id: number;
  description: string;
  logo: string;
  name?:string
  urlLinkOfStore:string
};


//this Product type just for testing
export type Product = {
    id: number;
    name: string;
    price: number;
    priceAfterOffer: number;
    amountYouBuy?:number;
    amountYouGet?:number;
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
type ProductQuantityPriceDto = {
  id: number;
  productId: number;
  minQuantity: number;
  pricePerUnit: number;
};
export type CartItem =  {
  cartId: number,
  productId: number,
  specialProductId?: number,
  name: string,
  price: number,
  priceAfterDiscount: number,
  finalPrice?: number,
  percentageDiscount?: number,
  imageUrl: string,
  quantity: number,
  amountYouBuy?: number,
  amountYouGet?: number,
  shipCost: number,
  country?:string,
  quantityPrices :ProductQuantityPriceDto[]
}


// for  /Stores/GetStoresWithFilter endpoint

export type ApiResponse = {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    items: Item[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

type Item = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  storeCategoriesIds: StoreCategory[];
  images: Image[];
  createdAt: string;
  updatedAt: string;
};

type StoreCategory = {
  id: number;
  categoryName: string;
  categoryImageUrl: string;
  subCategories: SubCategory[];
};

type SubCategory = {
  id: number;
  subCategoryName: string;
  subCategoryImageUrle: string;
};

type Image = {
  id: number;
  imageUrl: string;
};
export type OrderTrackType = {
  id: number;
  orderDate: string;  
  orderStatus: string;
  orderStatusNumber: number;
  orderNumber: string;
  numOfOrderDetails: number;
  totalPrice: number;
  customerName: string;
  customerAdress: string | null;
  receiveCode: string;
  approvedAt: string | null;
  purchasedAt: string | null;
  shippedAt: string | null;
  rejectedByStoreAt: string;
  receivedByDeliveryAt: string;
  deliveredAt: string | null;
  arrivedAtDistributionArea: string | null;
  deliverdToCustomerAt: string | null;
  country:string
};
export type OrderTrackResponseType = {
  success: boolean;
  message: string;
  data: OrderTrackType
};

export type BtnAddTobascketProps = {
  id: string | number;
  productInfo: {
    image: string;
    productName: string;
    price: number;
    oldPrice?: number;
    amountYouBuy?:number;
    amountYouGet?:number;
    shipCost?:number;
  };
};