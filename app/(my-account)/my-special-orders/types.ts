

type SpecialProduct = {
    id: number;
    customerId: string;
    salesmanId: string | null;
    isThisOfferPrice: boolean;
    parentId: number | null;
    packageId: number | null;
    specialCategoryId: number;
    isUrgen: boolean;
    name: string;
    eCommerceName: string | null;
    description: string;
    linkUrl: string | null;
    orderNumber: string | null;
    source: number | null;
    assosiatedFilePath: string | null;
    type: number;
    typeName: string;
    quantity: number;
    price: number;
    shippingCost: number | null;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    status: number;
    statusName: string;
    images: {
      imageUrl: string;
    }[];
    note: string | null;
  };
  

export type SpecialOrdersResponseType = {
    success: boolean;
    message: string;
    data: {
      items: SpecialProduct[];
      totalCount: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    };
  };
  