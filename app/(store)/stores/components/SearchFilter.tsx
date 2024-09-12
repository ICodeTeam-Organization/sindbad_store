"use client"
import { FaMapMarkerAlt , FaAngleDown} from 'react-icons/fa';
import { useState } from 'react';
import { PiHeadphonesLight } from "react-icons/pi";
import { BsInfoCircle } from "react-icons/bs";

export default function SearchFilter() {
  // State for dropdowns
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        {/* Dropdowns */}
        <div className="flex space-x-4">
          {/* Dropdown 1 */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 border bg-gray-300 px-6 py-2 "
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span className='ml-2'>كل الفئات</span>
              <FaAngleDown />
            </button>
            {isCategoryOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md">
                <li className="px-4 py-2 hover:bg-gray-100">Category 1</li>
                <li className="px-4 py-2 hover:bg-gray-100">Category 2</li>
              </ul>
            )}
          </div>

          {/* Dropdown 2 */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-md"
              onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)}
            >
              <span  className='ml-2'>المحلات</span>
              <FaAngleDown />
            </button>
            {isSubCategoryOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md">
                <li className="px-4 py-2 hover:bg-gray-100">Sub Category 1</li>
                <li className="px-4 py-2 hover:bg-gray-100">Sub Category 2</li>
              </ul>
            )}
          </div>
        </div>

        {/* Icons with Text */}
        <div className="flex justify-around text-sm text-gray-600">
          <div className="flex items-center space-x-8">
            <span  className='ml-1'>متابعة الطلب</span>
            <FaMapMarkerAlt />
          </div>
          <div className="flex items-center space-x-8">
            <span  className='ml-2'>طلب خاص</span>
            <PiHeadphonesLight />
          </div>
          <div className="flex items-center space-x-8">
            <span  className='ml-1'>طرق الشراء</span>
            <BsInfoCircle />
          </div>
        </div>
      </div>
    </div>
  );
}
