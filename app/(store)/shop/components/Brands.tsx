import React, { useState } from 'react';

// Define the type for the props
interface BrandsProps {
  brands: string[];
}

const Brands: React.FC<BrandsProps> = ({ brands }) => {

  const [SelectedBrands, setSelectedBrands] = useState<string>();


  return (
    <div className="mb-6">
      <h3 className=" mb-2">الماركات</h3>
      <div className="grid grid-cols-2 gap-2 gap-x-6">
        {brands.map((brand, index) => (
          <label key={index} className="flex text-xs items-center">
            <input
              type="checkbox"
              defaultChecked={false}

              className="form-checkbox text-orange-500 ml-2"
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  )
};

export default Brands;
