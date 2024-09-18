import ImageGallery from './components/ImageGallery';
import ProductDetails from './components/ProductDetails';

// `params` will automatically include the `productId` from the URL
const ProductPage = ({ params }: { params: { productId: string } }) => {
  const productImages = [
    "/images/01.svg",
    "/images/02.svg",
    "/images/03.svg",
    "/images/04.svg",
    "/images/05.svg",
    "/images/06.svg",
  ];

  return <>
   <ProductDetails params={params} />
  </>
    // <div className="flex flex-col lg:flex-row gap-4 mt-12 px-12">
      
      {/* <div className="lg:w-1/2"> */}
      
       
        
      {/* </div> */}
    // </div>
  
};

export default ProductPage;
