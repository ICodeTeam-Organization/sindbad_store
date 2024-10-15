import React from 'react';
import ProductDetails from './components/ProductDetails';
import TabsComponent from './components/taps';
import DetailsTap from './components/DetailsTap';
import ProductFeaturesTap from './components/FeaturesTable';
import ProductReviewsTap from './components/ReviewsTap';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;

  const productFeatures = [
    { label: 'Material', value: 'High Quality Leather' },
    { label: 'Warranty', value: '1-Year' },
    { label: 'Environmentally Friendly', value: 'Yes' },
  ];

  return (
    <>
      <ProductDetails params={params} />
      <TabsComponent 
        tabLabels={{
          details: "تفاصيل المنتج",
          features: "مميزات المنتج",
          reviews: "تقييمات المنتج",
        }}
        tabContent={{
          tap1: <DetailsTap />,
          tap2: <ProductFeaturesTap features={productFeatures} />, 
          tap3: <ProductReviewsTap productId={productId} quantity={1} />
        }}
        productId={productId}
      />
    </>
  );
};

export default ProductPage;
