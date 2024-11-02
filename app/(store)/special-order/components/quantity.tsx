import React, { useState } from "react";
import { HiMinusSm } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
type QuantityProps = {
    classname?: string;
}
const Quantity = (classname:QuantityProps) => {
  const [Quantity, setQuantity] = useState(1);
  return (
    <div
      className={
        Quantity === 1
          ? classname +"  flex items-center bg-gray-200 w-16"
          : classname + ` flex items-center bg-gray-200 w-24`
      }
    >
      <IoMdAdd
        onClick={() => setQuantity(Quantity + 1)}
        className="cursor-pointer m-auto"
      />
      <span className="text-center w-8 bg-white  border-y">{Quantity}</span>
      {Quantity === 1 ? null : (
        <HiMinusSm
          onClick={() => setQuantity(Quantity - 1)}
          className="cursor-pointer m-auto "
        />
      )}
    </div>
  );
};

export default Quantity;
