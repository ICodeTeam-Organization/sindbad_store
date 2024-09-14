import React from 'react';

// Define the type for the props
interface BrandsProps {
  brands: string[];
}

const Brands: React.FC<BrandsProps> = ({ brands }) => (
  <div className="mb-6">
    <h3 className="font-bold mb-2">الماركات</h3>
    <div className="grid grid-cols-2 gap-2 gap-x-6">
      {brands.map((brand, index) => (
        <label key={index} className="flex  items-center">
          <input
            type="checkbox"
            defaultChecked={index === 0}
            className="form-checkbox text-orange-500 mr-2"
          />
          {brand}
        </label>
      ))}
    </div>
  </div>
);

export default Brands;
