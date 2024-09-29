import { ProductInfoRowProps } from '../types';


const ProductInfoRow = ({ label1, value1, label2, value2 } : ProductInfoRowProps) => {
  return (
    <div className="grid grid-cols-2 text-sm text-gray-700">
      <div className="flex items-center">
        <span className="font-medium ml-1 ">{label1}:</span>
        <span>{value1}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium ml-1">{label2}:</span>
        <span>{value2}</span>
      </div>
    </div>
  );
};

export default ProductInfoRow;
