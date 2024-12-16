import React, { useState } from "react";
const CategorySelector = () => {
  const categories = [
    {
      id: 1,
      name: "Banana",
      subCategories: [
        { id: 15, name: "Green Banana" },
        { id: 254, name: "Ripe Banana" },
      ],
    },
    {
      id: 2,
      name: "Apple",
      subCategories: [
        { id: 11, name: "Red Apple" },
        { id: 27, name: "Green Apple" },
      ],
    },
  ];

  // State to manage which categories and subcategories are expanded/checked
  const [expandedCategories, setExpandedCategories] = useState<any>({});
  const [categoryChecked, setCategoryChecked] = useState<any>({});
  const [subCategoryChecked, setSubCategoryChecked] = useState<any>({});

  const toggleCategory = (categoryId:number) => {
    setExpandedCategories((prev:any) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryChange = (categoryId:any, checked:any) => {
    setCategoryChecked((prev:any) => ({
      ...prev,
      [categoryId]: checked,
    }));

    // Update all subcategories based on the category checkbox state
    const updatedSubCategoryChecked = categories
      .find((category) => category.id === categoryId)
      ?.subCategories.reduce((acc:any, subCategory:any) => {
        acc[subCategory.id] = checked;
        return acc;
      }, {});

    setSubCategoryChecked((prev:any) => ({
      ...prev,
      ...updatedSubCategoryChecked,
    }));
  };

  const handleSubCategoryChange = (categoryId:any, subCategoryId:any, checked:any) => {
    setSubCategoryChecked((prev:any) => ({
      ...prev,
      [subCategoryId]: checked,
    }));

    // Update the main category checkbox based on subcategory states
    const subCategories = categories.find((category) => category.id === categoryId)
      ?.subCategories;

    const allSubCategoriesChecked = subCategories?.every(
      (subCategory) => subCategoryChecked[subCategory.id]
    );

    setCategoryChecked((prev:any) => ({
      ...prev,
      [categoryId]: allSubCategoriesChecked,
    }));
  };

  return (
    <div className="font-sans p-5">
      <h2 className="text-2xl font-semibold mb-5">Select Categories and Subcategories</h2>

      {/* Loop through each category */}
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <span
            className="text-blue-600 cursor-pointer inline-flex items-center"
            onClick={() => toggleCategory(category.id)}
          >
            <span
              className={`transition-transform inline-block mr-2 ${
                expandedCategories[category.id] ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
            {category.name}
          </span>
          <label>
            <input
              type="checkbox"
              checked={categoryChecked[category.id] || false}
              onChange={(e) =>
                handleCategoryChange(category.id, e.target.checked)
              }
              className="ml-2"
            />
          </label>

          {/* Subcategories */}
          {expandedCategories[category.id] && (
            <div className="ml-5 mt-2">
              {category.subCategories.map((subCategory) => (
                <div key={subCategory.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={subCategoryChecked[subCategory.id] || false}
                      onChange={(e) =>
                        handleSubCategoryChange(
                          category.id,
                          subCategory.id,
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    {subCategory.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
