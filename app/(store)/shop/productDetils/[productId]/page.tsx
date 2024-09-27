// import ImageGallery from './components/ImageGallery';
import ProductDetails from './components/ProductDetails';
import TabsComponent from './components/taps';

const ProductPage = ({ params }: { params: { productId: string } }) => {
  // const productImages = [
  //   "/images/01.svg",
  //   "/images/02.svg",
  //   "/images/03.svg",
  //   "/images/04.svg",
  //   "/images/05.svg",
  //   "/images/06.svg",
  // ];

  return <>
   <ProductDetails params={params} />
   <TabsComponent />
  </>
  
  
};

export default ProductPage;
