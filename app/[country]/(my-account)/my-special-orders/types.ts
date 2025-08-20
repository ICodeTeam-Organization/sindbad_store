

export type SpecialProduct = {
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
  

export type SpecialOrderDetailsType = {
    success: boolean;
    message: string;
    data: {
      items:[{
      id: number;
      customerId: string;
      salesmanId: string;
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
      source: string | null;
      assosiatedFilePath: string | null;
      type: number;
      typeName: string;
      quantity: number;
      price: number;
      shippingCost: number | null;
      createdAt: string;
      updatedAt: string;
      status: number;
      statusName: string;
      images: {imageUrl:string}[]; // Array of image URLs or paths
      note: string | null;
      }]
    };
  };
  

  export type Pricing = {
    id: number;
    customerId: string;
    salesmanId: string;
    isThisOfferPrice: boolean;
    parentId: number | null;
    packageId: number | null;
    specialCategoryId: number;
    isUrgen: boolean;
    name: string;
    eCommerceName: string | null;
    description: string | null;
    linkUrl: string | null;
    orderNumber: string | null;
    source: string | null;
    assosiatedFilePath: string | null;
    type: number;
    typeName: string;
    quantity: number;
    price: number;
    shippingCost: number | null;
    createdAt: string;
    updatedAt: string;
    status: number;
    statusName: string;
    images: string[]; // Array of image URLs or paths
    note: string | null;
    country: string | null;
  }
 export type OfferDetailsResponseType = {
    success: boolean;
    message: string;
    data: Pricing[];
  };
  