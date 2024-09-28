

export interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    oldPrice?: number;
  }
  
  export interface ProductDetailsProps {
    description: string;
    rating: number;
    availability: string;
    productNumber: string;
    category: string;
    brand: string;
    discountedPrice: string;
    originalPrice: string;
    discount: number;
    colors: string;
    size: string;
    memory: string;
    storage: string;
  }
  
  export interface ImageGalleryProps {
    images: string[];
  }
  
  export interface QuantitySelectorProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
  }
  
  export interface PriceSectionProps {
    discountedPrice: string;
    originalPrice: string;
    discount: number;
  }
  
  export interface ProductInfoRowProps {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
  }

  export interface ProductFeature {
    label: string;
    value: string;
  }

  export interface ProductFeaturesTableProps {
    features: ProductFeature[];
  }
  export interface ReviewProps {
    customerName: string;
    reviewText: string;
    reviewDate: string;
    customerImage: string | null;
    numOfRate: number;
  };
  