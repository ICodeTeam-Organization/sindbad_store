import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const StoreSearchInput = () => {
  const [query, setQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);

  const storesData = [
    {
      category: "Electronics",
      items: [
        { id: 1, name: "Best Buy" },
        { id: 2, name: "Apple Store" },
      ],
    },
    {
      category: "Groceries",
      items: [
        { id: 3, name: "Walmart" },
        { id: 4, name: "Whole Foods" },
      ],
    },
  ];

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredStores([]);
      return;
    }

    const filtered:any = storesData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);

    setFilteredStores(filtered);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder="Search for stores..."
      />
      {filteredStores.length > 0 && (
        <DropdownMenu>
          <DropdownMenuContent className="absolute w-full bg-white shadow-md rounded-md mt-1 z-10">
            {filteredStores.map((category:any) => (
              <div key={category.category}>
                <DropdownMenuLabel className="px-2 py-1 text-gray-700 font-bold">
                  {category.category}
                </DropdownMenuLabel>
                {category.items.map((item:any) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => console.log(item)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default StoreSearchInput;
