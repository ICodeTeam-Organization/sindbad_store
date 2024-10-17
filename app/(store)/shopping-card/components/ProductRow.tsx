import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { deleteApi, putApi } from "@/lib/http";

type Props = {
  id: number;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  shipCost: number;
  refreshItems: () => void;
};

const ProductRow = ({ ...props }: Props) => {
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { toast } = useToast();

  const updateQuantity = useMutation({
    mutationFn: async ({
      quantity,
      cartId,
    }: {
      quantity: number;
      cartId: number;
    }) =>
      await putApi(
        "Cart/UpdateCart",
        {
          body: {
            cartId: cartId,
            quantity: quantity,
          },
        },
        "PATCH"
      ),
    onSuccess: () => props.refreshItems(),
    onError: (res) => {
      toast({
        variant: "destructive",
        description: res.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) =>
      await deleteApi("Cart/DeleteCart?cartId=" + id),

    onSuccess: () => props.refreshItems(),
    onError: (res: any) => {
      toast({
        variant: "destructive",
        description: res.response.data.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const handleQuantity = (quantity: number) => {
    setIsUpdated(true);
    setQuantity(quantity);
  };

  const debounceQuantity = useDebounce(quantity, 500);
  useEffect(() => {
    if (debounceQuantity && isUpdated) {
      setIsUpdated(false);
      updateQuantity.mutate({
        cartId: props.id,
        quantity: quantity,
      });
    }
  }, [debounceQuantity]);

  const handleDeleteItem = async (id: number) => {
    deleteItem.mutate(id);
  };

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
          <IoMdAdd
            onClick={() => handleQuantity(quantity + 1)}
            className="cursor-pointer"
          />
          <span className="w-5 mx-2 text-center">{quantity}</span>

          <HiMinusSm
            onClick={() => handleQuantity(quantity - 1)}
            className="cursor-pointer"
          />
        </div>
      </td>
      <td className="py-4">{props.shipCost} رس</td>
      <td className="py-4">
        {deleteItem.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <BiTrash
            className="cursor-pointer hover:text-red-500 transition-colors duration-100"
            onClick={() => handleDeleteItem(props.id)}
          />
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
