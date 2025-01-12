import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

// Define the props for the Counter component
interface CounterProps {
  initialValue?: number;
  onIncrement?: (newCount: number) => void;
  onDecrement?: (newCount: number) => void;
  isEditingProp?: boolean;
  onChange?: (newCount: number) => void; // Add onChange prop to handle value change
}

// Counter Component
const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  onIncrement,
  onDecrement,
  isEditingProp = false,
  onChange, // Destructure the onChange prop
}) => {
  // State to manage counter value
  const [count, setCount] = useState<number>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(isEditingProp);

  // Handlers for increment and decrement
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (onIncrement) onIncrement(newCount);
    if (onChange) onChange(newCount); // Call onChange when count changes
  };

  const decrement = () => {
    if (count === 0) return;
    const newCount = count - 1;
    setCount(newCount);
    if (onDecrement) onDecrement(newCount);
    if (onChange) onChange(newCount); // Call onChange when count changes
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setCount(value);
      if (onChange) onChange(value); // Call onChange when count changes
    }
  };

  return (
    <div className=" ">
      <div className="flex justify-between text-xs border rounded-md ">
        <button onClick={decrement} className="px-4 bg-gray-100 ">
          <AiOutlineMinus size={16} />
        </button>
        {isEditing ? (
          <input
            type="number"
            value={count}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="text-lg  outline-none w-20 text-center remove-arrow font-semibold text-gray-800 border-none rounded-md"
          />
        ) : (
          <span
            className="text-lg  w-20 text-center font-semibold text-gray-800 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {count}
          </span>
        )}
        <button onClick={increment} className="px-4 bg-gray-100 ">
          <AiOutlinePlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
