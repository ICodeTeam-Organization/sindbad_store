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

export interface Shop {
  id: number;
  name: string;
  urlLinkOfStore: string;
  description: string;
  logo: string;
  ecommerceStoreImages: EcommerceStoreImage[];
}


//this Product type just for testing
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};
//////////////////////

export type CartItem = {
  cartId: number;
  name: string;
  price: number;
  priceAfterDiscount: number | null;
  imageUrl: string;
  quantity: number;
  shipCost: number;
};
