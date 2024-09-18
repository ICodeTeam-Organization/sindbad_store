export type Category = {
  id: string;
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
  product: Product;
  quantity: number;
};
