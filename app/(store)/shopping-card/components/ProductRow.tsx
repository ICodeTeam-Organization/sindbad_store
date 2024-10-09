"use client";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";

type Props = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const ProductRow = ({ ...props }: Props) => {
  return (
    <tr>
      <td className="py-4">
        <div className="flex items-center">
          <Image
            width={50}
            height={50}
            className="ml-3"
            src={"/images/" + props.image}
            alt="Product"
          />
          <span className="font-semibold">{props.name}</span>
        </div>
      </td>
      <td className="py-4">{props.price.toFixed(2)} رس</td>
      <td className="py-4">
        <div className="flex items-center">
          <IoMdAdd onClick={() => {}} className="cursor-pointer" />
          <span className="text-center w-8">{props.quantity}</span>
          <HiMinusSm onClick={() => {}} className="cursor-pointer" />
        </div>
      </td>
      <td className="py-4">{(props.price * props.quantity).toFixed(2)} رس</td>
      <td className="py-4">
        <BiTrash
          className="cursor-pointer hover:text-red-500 transition-colors duration-100"
          onClick={() => {}}
        />
      </td>
    </tr>
  );
};

export default ProductRow;
