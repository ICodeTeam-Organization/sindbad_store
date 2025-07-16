// import Counter from '@/components/Counter'
// import SafeImage from '@/components/SafeImage'
// import { Checkbox } from '@/components/ui/checkbox'
// import { get_currency_key } from '@/lib/cookie/cookie.clients'
// import { CartItem } from '@/types/storeTypes'
// import React from 'react'

// function CartProductItem({ item, x }: { item: CartItem, x: number }) {
//   return (
//     <div
//         key={x}
//         className="bg-white p-4 flex items-center justify-between rounded shadow-sm mt-1"
//       >
//         <div className="flex items-center justify-center">
//             <div className="pl-2">
//             <Checkbox />
//         </div>

//         <div className="w-20 h-20 flex-shrink-0">
//           <SafeImage
//             width={80}
//             height={80}
//             loading="lazy"
//             src={item.imageUrl}
//             alt="Product"
//             className="w-full h-full object-cover rounded"
//           />
//         </div>
//         </div>

//         {/* معلومات المنتج */}
//         <div className="flex-1 px-4">
//           <p className="text-sm font-semibold">
//             {item.name || "اسم المنتج غير متوفر"}
//           </p>
//             <div className=" flex items-center gap-x-4 mt-2  ">
//             <p className="text-secondary font-bold"> {item?.price} </p>
//             <p className="text-red-500 line-through text-xs">{item?.price}</p>
//             </div>
//           <div className="text-sm text-gray-500 mt-1">رسوم الشحن:  {item?.shipCost} {get_currency_key(item?.country)} </div>
//         </div>

//         {/* السعر */}

//         {/* العمود: الإجمالي + عداد */}
//         <div className="flex flex-col items-center px-4">
//           <p className="text-sm font-bold mb-2">ر.س 50,000</p>
//           <Counter />
//         </div>

//         {/* زر الحذف */}
//         <div className="px-2">
//           <button className="text-gray-400 hover:text-red-500">✕</button>
//         </div>
//       </div>
//   )
// }

// export default CartProductItem

import { BiGift,  } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Spinner from "@/app/(home)/components/Spinner";
import SafeImage from "@/components/SafeImage";
import { CartItem } from "@/types/storeTypes";
import { calculateBonus } from "@/lib/utils";
import { useCartStore } from "@/app/stores_mangament/cartStore";
import { get_currency_key } from "@/lib/cookie/cookie.clients"; 
import { CgClose } from "react-icons/cg";

type Props = {
  cartItemData: CartItem;
  x: number;
};

const CartProductItem = ({ cartItemData, x }: Props) => {
  const {
    name,
    price,
    priceAfterDiscount,
    imageUrl,
    quantity: initialQuantity,
    amountYouBuy,
    amountYouGet,
    shipCost,
    productId,
    specialProductId,
    country,
  } = cartItemData;

  const thePrice = priceAfterDiscount || price;
  const { updateQuantity: updateQuantityInStore, removeItem } = useCartStore();
  const currency = get_currency_key(country);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleQuantity = (quantityPar: number) => {
    if (quantityPar < 0) return;
    setIsUpdated(true);
    setQuantity(quantityPar);
  };

  const debounceQuantity = useDebounce(quantity, 1);
  useEffect(() => {
    if (debounceQuantity >= 0 && isUpdated) {
      setIsUpdated(false);
      if (quantity == 0) {
        if (specialProductId) {
          removeItem(specialProductId, true);
        } else {
          removeItem(productId);
        }
      } else {
        if (specialProductId) {
          updateQuantityInStore(quantity, specialProductId, true);
        } else {
          updateQuantityInStore(quantity, productId);
        }
      }
    }
  }, [debounceQuantity]);

  const handleDeleteItem = async () => {
    setIsUpdated(true);
    setQuantity(0);
  };

  const totalPrice = (
    thePrice * quantity +
    shipCost *
      (quantity +
        (calculateBonus(quantity, amountYouBuy || 0, amountYouGet || 0) || 0))
  ).toFixed(2);

  const hasFreeGift =
    !!amountYouBuy &&
    !!amountYouGet &&
    calculateBonus(quantity, amountYouBuy, amountYouGet) > 0;
  return (
    <div className="bg-white p-4 rounded shadow-sm mt-2 relative">
      {/* Main product card */}
      <div key={x} className="smHalf:flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* <div className="">
              <Checkbox />
            </div> */}

            <div className="w-20 h-20 relative border rounded-lg mx-2 overflow-hidden flex-shrink-0">
              <SafeImage
                // fill
                width={80}
                height={80}
                src={imageUrl || ""}
                alt="Product"
                className="object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1 px-2">
            {!!amountYouBuy && !!amountYouGet && (
              <div className=" mb-1 bg-bg-50  w-fit text-primary text-xs px-2 py-1 rounded flex items-center gap-x-1">
                {/* <BiGift className="text-lg" /> */}
                <span>
                  احصل على هدية مجانية عند شراء {amountYouBuy} منتجات!
                </span>
              </div>
            )}
            <p className="mdHalf:text-base text-sm line-clamp-2 font-bold text-secondary">
              {name}  
            </p>
            <div className="flex items-center gap-x-4 mt-2 my-2">
              <p className="text-secondary font-bold">
                {thePrice?.toFixed(2)} {currency}
              </p>
              {+priceAfterDiscount < +price && priceAfterDiscount > 0 && (
                <p className="text-xs line-through text-red-600">
                  {price?.toFixed(2)} {currency}
                </p>
              )}
              {hasFreeGift && (
                <div className=" border-t border-gray-100 flex items-center bg-bg-100 w-fit rounded-md text-primary">
                  <BiGift className="text-xl" />
                  <span className="mx-2  text-sm">
                    هدية مجاناً (
                    {calculateBonus(quantity, amountYouBuy, amountYouGet)}+)
                  </span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              رسوم الشحن: {shipCost?.toFixed(2)} {currency}
            </div>
          </div>
        </div>

        <div className="flex   items-center max-smHalf:mt-4 max-smHalf:justify-between"  >
          {/* Quantity counter and total price */}
          <div className="flex smHalf:flex-col max-smHalf:gap-x-4 pt-1 items-center px-2">
            <p className="text-sm font-bold mb-2">
              المجموع : {totalPrice} {currency}
            </p>

            <div className="flex items-center border rounded p-1 px-2">
              <IoMdAdd
                onClick={() => handleQuantity(quantity + 1)}
                className="cursor-pointer text-lg"
              />
              {false ? ( // Replace with actual loading state if needed
                <div className="w-14 flex items-center justify-center">
                  <Spinner className="w-4 h-4" />
                </div>
              ) : (
                <input
                  value={quantity}
                  type="number"
                  onChange={(e) => {
                    setQuantity(+e.target.value);
                    setIsUpdated(true);
                  }}
                  className="w-14 text-center remove-arrow outline-none"
                />
              )}
              <HiMinusSm
                onClick={() => handleQuantity(quantity - 1)}
                className="cursor-pointer text-lg"
              />
            </div>
          </div>

          {/* Delete button */}
          <div className="p-2 bg-bg-100 rounded-full mr-2">
            {false ? ( // Replace with actual loading state if needed
              <Loader2 className="animate-spin" />
            ) : (
              <CgClose
                className="text-base cursor-pointer hover:text-red-500 transition-colors duration-100"
                onClick={handleDeleteItem}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
