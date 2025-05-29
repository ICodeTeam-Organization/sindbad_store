import { BiTrash, BiGift } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi"; 
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce"; 
import Spinner from "@/app/(home)/components/Spinner";
import { useCartStore } from "@/app/stores/cartStore";
import SafeImage from "@/components/SafeImage";
import { CartItem } from "@/types/storeTypes";
import { calculateBonus } from "@/lib/utils";

// type Props = {
//   id: number;
//   name: string;
//   image?: string;
//   price: number;
//   quantity: number;
//   shipCost: number;
//   freeProducts?: number;
//   refreshItems: () => void;
// };

type Props = {
  cartItemData: CartItem;
  // refreshItems: () => void;
  // onRemove?: () => void;
};

const ProductRow = ({ cartItemData }: Props) => {
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
  } = cartItemData;
  
  const thePrice = priceAfterDiscount || price;
  const { updateQuantity: updateQuantityInStore , removeItem} = useCartStore();

  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  // const { toast } = useToast();
  // const freeProducts = 0;

  // const updateQuantity = useMutation({
  //   mutationFn: async ({
  //     quantity,
  //     cartId,
  //   }: {
  //     quantity: number;
  //     cartId: number;
  //   }) =>
  //     await putApi(
  //       "Cart/UpdateCart",
  //       {
  //         body: {
  //           cartId: cartId,
  //           quantity: quantity,
  //         },
  //       },
  //       "PATCH"
  //     ),
  //   onSuccess: () => {
  //     refreshItems();
  //     updateQuantityInStore(quantity, cartId);
  //   },
  //   onError: (res) => {
  //     toast({
  //       variant: "destructive",
  //       description: res.message,
  //       action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
  //     });
  //   },
  // });

  // const deleteItem = useMutation({
  //   mutationFn: async (id: number) => {
  //     await deleteApi("Cart/DeleteCart?cartId=" + id);
  //     return id;
  //   },

  //   onSuccess: (id) => {
  //     refreshItems();
  //     removeItem(id);
  //   },
  //   onError: (res: any) => {
  //     toast({
  //       variant: "destructive",
  //       description: res.response.data.message,
  //       action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
  //     });
  //   },
  // });

  const handleQuantity = (quantityPar: number) => {
    setIsUpdated(true);
    setQuantity(quantityPar);
  };

  const debounceQuantity = useDebounce(quantity, 1);
  useEffect(() => {
    if (debounceQuantity >= 0 && isUpdated) {
      setIsUpdated(false);
      if (quantity == 0) {
        // updateQuantityInStore(0, productId);
        removeItem(productId);
      } else {
        updateQuantityInStore(quantity, productId);
      }
    }
  }, [debounceQuantity]);

  const handleDeleteItem = async () => {
    setIsUpdated(true);
    removeItem(productId);
    setQuantity(0); 
  };

  return (
    <>
      <tr className="text-center ">
        <td className="py-2">
          <div className="flex items-center ">
            <div className="w-20 h-20 relative  border rounded-lg me-4 overflow-hidden">
              <SafeImage
                fill
                className="ml-3"
                src={imageUrl || ""}
                alt="Product"
              />
            </div>
            <span className="text-sm font-bold">{name}</span>
          </div>
        </td>
        <td className="">
          <p>{thePrice?.toFixed(2)} رس</p>
          { priceAfterDiscount < price && <p className="text-xs line-through text-red-600" >{price?.toFixed(2)} رس</p>}
          {/* <span className="text-[10px] text-gray-400" >{percentageDiscount}%</span> */}
        </td>

        <td className="py-2">
          <div className="flex items-center justify-center">
            <IoMdAdd
              onClick={() => handleQuantity(quantity + 1)}
              className="cursor-pointer"
            />
            {
              // updateQuantity.isPending || deleteItem.isPending
              false ? (
                <div className="w-14 flex items-center justify-center ">
                  {" "}
                  <Spinner className="w-4 h-4" />{" "}
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
              )
            }

            <HiMinusSm
              onClick={() => handleQuantity(quantity - 1)}
              className="cursor-pointer"
            />
          </div>
        </td>
        <td className="py-2">{shipCost?.toFixed(2)} رس</td>
        {/* <td className="py-2">{finalPrice?.toFixed(2)} رس</td> */}
        <td className="py-2">
          {(
            thePrice * quantity +
            shipCost *
              (quantity +
                (calculateBonus(
                  quantity,
                  amountYouBuy || 0,
                  amountYouGet || 0
                ) || 0))
          )?.toFixed(2)}{" "}
          رس
        </td>
        <td className="py-2">
          {
            // deleteItem.isPending
            false ? (
              <Loader2 className="animate-spin" />
            ) : (
              <BiTrash
                className="text-2xl cursor-pointer hover:text-red-500 transition-colors duration-100"
                onClick={() => {
                  handleDeleteItem();
                }}
              />
            )
          }
        </td>
      </tr>
      {!!amountYouBuy &&
      !!amountYouGet &&
      calculateBonus(quantity, amountYouBuy, amountYouGet) > 0 ? (
        <tr className="opacity-90 text-center">
          <td className="">
            {/* <div className="flex items-center ">
              <div className="h-[50px] w-[50px] mx-4 relative bg-slate-400 rounded-lg overflow-hidden">
                <SafeImage
                  fill
                  className="ml-3"
                  src={imageUrl || ""}
                  alt="Product"
                />
              </div>
              <span className="text-sm font-bold">{name}</span>
            </div> */}
          </td>
          <td className="text-primary-background">هدية مجاناً</td>

          <td className="">
            <div className="flex items-center justify-center text-primary-background">
              {calculateBonus(quantity, amountYouBuy, amountYouGet)}+
            </div>
          </td>
          <td className=""></td>
          <td className=""></td>
          <td className="">
            <BiGift className=" text-2xl text-primary-background cursor-pointer hover:text-red-500 transition-colors duration-100" />
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default ProductRow;
