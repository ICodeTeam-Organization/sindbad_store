

  type OrderItem = {
    productId: number;
    specialProductId: number | null;
    productName: string;
    productNumber: string;
    specialProductName: string | null;
    price: number;
    discount: number;
    quantity: number;
    imageUrl: string;
    shipCost: number;
  };

  export type PagedOrderDetails = {
    items: OrderItem[]; // يمكنك تحديد نوع العناصر إذا كنت تعرفه
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  
  export type OrderData = {
    id: number;
    totalDiscount: number;
    orderDate: string; // ISO Date string e.g., '2025-04-07'
    orderStatus: string;
    totalPrice: number;
    orderNumber: string;
    pagedOrderDetails: PagedOrderDetails
    totalOrderDetailsPrice: number;
    totalShipCost: number;
    customerAddress: {
      id: number;
      directorateId: number;
      directorateName: string;
      customerName: string;
      phoneNumper: string; // Note: Possibly should be "phoneNumber"
    };
    receiptCode: string;
    isUrgentOrder: boolean;
  };
  
  export type ApiResponseTypeForOrderDetails = {
    success: boolean;
    message: string;
    data: OrderData;
  };