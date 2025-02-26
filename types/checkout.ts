export type CheckoutType = {
  bank: string;
  number: string;
  date: string;
  image: FileList; 
  note: string;
  amount: string;
  customerAdressId:number
};
export type Bank = {
  id: string;
  bankName: string;
  accountNumber:number
};
