"use client";
import { deleteApi } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { GrTrash } from "react-icons/gr";
import { toast } from "sonner";
type prop = {
  id: number;
};
const DeleteAdress = ({ id }: prop) => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async (deleteAdr: number) =>
      await deleteApi<any>(
        `CustomerAddress/DeleteCustomerAddress?id=${deleteAdr}`
      ),
    onSuccess: () => {
      toast.success("تم حذف العنوان بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ ما"),
  });
  return (
    <div className=" pt-3">
      <GrTrash
        onClick={() => mutate(id)}
        className="max-sm:size-4 cursor-pointer m-auto"
        size={25}
      />
    </div>
  );
};

export default DeleteAdress;
