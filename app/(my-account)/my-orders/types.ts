export interface DropdownProps {
    placeholder: string;
    options: {key:number,status:string}[];
    icon: React.ReactNode;
    onSelect: (option: {key:number,status:string}) => void;
}
export type Order = {
    id: number;
    orderDate: string; // ISO date string format
    orderStatus: string; // This is in Arabic and represents the status of the order
    totalPrice: number; // Total price of the order
    orderNumber: string;orderStatusNumber:number;
    country: string; // Country code as a string
};

export type ResponsiveOrdersTypes = {
    success: boolean; // Indicates if the operation was successful
    message: string;  // Message about the operation's result
    data: {
      items: Order[];
      totalCount: number;    // Total number of items
      totalPages: number;    // Total number of pages
      currentPage: number;   // Current page number
      pageSize: number;      // Number of items per page
    };
  };
  

 