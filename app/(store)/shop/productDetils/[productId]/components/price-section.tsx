import { PriceSectionProps } from '../types';

const PriceSection = ({ discountedPrice, originalPrice, discount } : PriceSectionProps) => {
    return (
      <div className="flex items-center gap-4 mt-12">
        <div className='flex justify-between'>
        <span className="text-3xl font-bold text-blue-500">{discountedPrice ? discountedPrice : originalPrice }</span>
        {discountedPrice && <span className="text-xl line-through text-gray-500">{originalPrice}</span>}
        </div>
        {discountedPrice && <div className="px-3 py-2 bg-yellow-500 text-black font-medium">
  {discount !== null ? discount : 0} % خصم
</div>}
      </div>
    );
  };
  
  export default PriceSection;
  