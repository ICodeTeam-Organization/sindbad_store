import { PriceSectionProps } from '../types';

const PriceSection = ({ discountedPrice, originalPrice, discount } : PriceSectionProps) => {
    return (
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-blue-500">{discountedPrice}</span>
        <span className="text-xl line-through text-gray-500">{originalPrice}</span>
        <div className="px-4 py-3 bg-yellow-500 text-black font-medium ">
          {discount}% خصم
        </div>
      </div>
    );
  };
  
  export default PriceSection;
  