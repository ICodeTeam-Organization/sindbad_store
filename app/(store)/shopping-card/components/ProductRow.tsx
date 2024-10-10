import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSm } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import { deleteApi, putApi } from "@/lib/http";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  id: number;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

const ProductRow = ({ ...props }: Props) => {
  const { toast } = useToast();

  const updateQuantity = useMutation({
    mutationFn: async ({
      quantity,
      cartId,
    }: {
      quantity: number;
      cartId: number;
    }) =>
      await putApi("Cart/UpdateCart", "PATCH", {
        body: {
          cartId: cartId,
          quantity: quantity,
        },
      }),
    onSuccess: (res: any) => {
      toast({
        variant: "default",
        description: res.message,
        style: {
          backgroundColor: "green",
        },
      });
    },
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
      await deleteApi("Cart/DeleteCart?cartProductId=" + id),
    onSuccess: (res: any) => {
      toast({
        variant: "default",
        description: res.message,
        style: {
          backgroundColor: "greenyellow",
        },
      });
    },
    onError: (res: any) => {
      toast({
        variant: "destructive",
        description: res.response.data.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const handleQuantity = (id: number, quantity: number) => {
    console.log("quna" + quantity, id);
    updateQuantity.mutate({
      cartId: id,
      quantity: quantity,
    });
  };

  const handleDeleteItem = (id: number) => {
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
          {updateQuantity.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <IoMdAdd
                onClick={() => handleQuantity(props.id, props.quantity + 1)}
                className="cursor-pointer"
              />
              <span className="text-center w-8">{props.quantity}</span>
              <HiMinusSm
                onClick={() => handleQuantity(props.id, props.quantity - 1)}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
      </td>
      <td className="py-4">{(props.price * props.quantity).toFixed(2)} رس</td>
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
