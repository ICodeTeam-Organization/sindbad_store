export type CheckoutType = {
  bank: number;
  number: number;
  date: string;
  image: File;
  note: string;
};
export type Bank = {
  id: number;
  bankName: string;
};
