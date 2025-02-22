export type PagedOrderDetails = {
    items: any[]; // يمكنك تحديد نوع العناصر إذا كنت تعرفه
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  
  export type OrderData = {
    id: number;
    totalDiscount: number;
    orderDate: string;
    orderStatus: string;
    totalPrice: number;
    orderNumber: string;
    pagedOrderDetails: PagedOrderDetails;
    totalOrderDetailsPrice: number;
    totalShipCost: number;
  };
  
  export type ApiResponseTypeForOrderDetails = {
    success: boolean;
    message: string;
    data: OrderData;
  };