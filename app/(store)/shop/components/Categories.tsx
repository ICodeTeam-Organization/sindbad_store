import React from 'react';

interface CategoriesProps {
  categories: string[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => (
  <div className="mb-6">
    <h3 className="font-bold mb-2">الفئات</h3>
    <ul className="space-y-2">
      {categories.map((category, index) => (
        <li key={index}>
          <label className="flex items-center whitespace-nowrap">
            <input
              type="radio"
              name="category"
              defaultChecked={index === 0}
              className="form-radio text-orange-500 ml-2 h-4 w-4 border-orange-500 focus:ring-orange-500 checked:bg-orange-500"
            />
            <span className="ml-2">{category}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default Categories;
