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
  cartId: number;
  name: string;
  price: number;
  priceAfterDiscount: number | null;
  imageUrl: string;
  quantity: number;
  shipCost: number;
};
