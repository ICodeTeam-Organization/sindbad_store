'use client'

import React, { useState, ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar= () => {
  const [selectedOption, setSelectedOption] = useState<string>('الأكثر بحثا');

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='px-4 md:px-8 flex flex-col md:flex-row items-center justify-evenly'>
      {/* Search Input */}
      <div className="w-full md:w-96 flex items-center border px-4 rounded-sm mb-4 md:mb-0">
        <input
          type="text"
          placeholder="ابحث هنا"
          className="w-full text-xs py-[11px] outline-none"
        />
        <FaSearch className="text-gray-400 cursor-pointer hover:text-black" />
      </div>

      {/* Dropdown */}
      <div className="w-full md:w-auto flex items-center justify-between p-4 rounded-md">
        <label className="text-gray-700 font-bold ml-4" htmlFor="sort">
          ترتيب حسب:
        </label>
        <select
          id="sort"
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full md:w-[200px] border border-gray-300 rounded-md p-2 ml-4 text-gray-700"
        >
          <option value="الأكثر بحثا">الأكثر بحثا</option>
          <option value="الأعلى تقييما">الأعلى تقييما</option>
          <option value="الأحدث">الأحدث</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
