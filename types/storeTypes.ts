export type Category = {
  id: number;
  name: string;
  imageUrl?: string;
};

//this Product type just for testing
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};
//////////////////////

export type CartItem = {
  id: number;
  name: string;
  price: number;
  priceAfterDiscount: number | null;
  imageUrl: string;
  quantity: number;
  shopCost: number;
};
