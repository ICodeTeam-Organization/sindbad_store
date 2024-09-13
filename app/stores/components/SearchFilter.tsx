"use client";
import { FaMapMarkerAlt, FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { PiHeadphonesLight } from "react-icons/pi";
import { BsInfoCircle } from "react-icons/bs";

export default function SearchFilter() {
  // State for dropdowns
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  return (
    <div className="bg-white py-2">
      <div className="mx-auto flex justify-center items-center flex-wrap space-x-2 w-full px-2">
        {/* Dropdowns */}
        <div className="flex space-x-1 md:space-x-4">
          {/* Dropdown 1 */}
          <div className="relative">
            <button
              className={`flex items-center space-x-1 md:space-x-2 border px-2 py-1 md:px-6 md:py-2 rounded-md ${
                isCategoryOpen ? "bg-gray-200 border-gray-500" : "bg-white"
              }`}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span className="ml-1 md:ml-2 text-xs md:text-base">كل الفئات</span>
              <FaAngleDown className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            {isCategoryOpen && (
              <ul className="absolute left-0 mt-2 w-32 md:w-48 bg-white shadow-lg border rounded-md">
                <li className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100">Category 1</li>
                <li className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100">Category 2</li>
              </ul>
            )}
          </div>

          {/* Dropdown 2 */}
          <div className="relative">
            <button
              className={`flex items-center space-x-1 md:space-x-2 px-2 py-1 md:px-4 md:py-2 border rounded-md ${
                isSubCategoryOpen ? "bg-gray-200 border-gray-500" : "bg-white"
              }`}
              onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)}
            >
              <span className="ml-1 md:ml-2 text-xs md:text-base">المحلات</span>
              <FaAngleDown className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            {isSubCategoryOpen && (
              <ul className="absolute left-0 mt-2 w-32 md:w-48 bg-white shadow-lg border rounded-md">
                <li className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100">Sub Category 1</li>
                <li className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-100">Sub Category 2</li>
              </ul>
            )}
          </div>
        </div>

        {/* Icons with Text */}
        <div className="flex text-gray-600 text-xs md:text-base space-x-2 md:space-x-4">
          <div className="flex items-center space-x-1 md:space-x-2">
            <span className="ml-1 md:ml-2">متابعة الطلب</span>
            <FaMapMarkerAlt className="w-3 h-3 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <span className="ml-1 md:ml-2">طلب خاص</span>
            <PiHeadphonesLight className="w-3 h-3 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <span className="ml-1 md:ml-2">طرق الشراء</span>
            <BsInfoCircle className="w-3 h-3 md:w-5 md:h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
