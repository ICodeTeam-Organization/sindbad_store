import { ProductDetailsProps } from '../types';


const ProductTitle = ({name, description, rating }: Pick<ProductDetailsProps, 'name' | 'description' | 'rating'>) => {
    return (
      <div className="mb-4">
        {/* <div className="flex gap-1 mb-2">
          {Array(rating)
            .fill("")
            .map((_, index) => (
              <span key={index} className="text-orange-500 items-end">★</span>
            ))}
        </div> */}

        <h2 className="text-orange-500 text-2xl">{name}</h2>
        <p className="text-xl text-gray-600 mt-2">{description}</p>
      </div>
    );
  };
  
  export default ProductTitle;
  