

import ImageGallery from './components/ImageGallery';
import ProductDetails from './components/ProductDetails';

const ProductPage = () => {

  const productImages = [
    "/images/01.svg",
    "/images/02.svg",
    "/images/03.svg",
    "/images/04.svg",
    "/images/05.svg",
    "/images/06.svg",
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-12 px-12">
      <div className="lg:w-1/3 ml-8">
        <ImageGallery images={productImages} />
      </div>
      <div className="lg:w-1/2">
        <ProductDetails />
      </div>
    </div>
  );
};

export default ProductPage;
