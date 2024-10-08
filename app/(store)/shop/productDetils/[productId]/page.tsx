
import React from 'react';
import ProductDetails from './components/ProductDetails';
import TabsComponent from './components/taps';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;
  return (
    <>
      <ProductDetails params={params} />
      <TabsComponent productId={productId} />
    </>
  );
};

export default ProductPage;
