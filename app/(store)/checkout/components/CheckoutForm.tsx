"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "./SelectComponent";
import { checkoutSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckoutType } from "@/types/checkout";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/navigation";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutType>({
    resolver: zodResolver(checkoutSchema),
  });

  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-bound"],
    mutationFn: (data: CheckoutType) =>
      postApi("Orders/CompleteCustomerPurchase", {
        body: {
          bankId: 3,
          note: data.note,
          amount: data.amount,
          bondNumber: data.number,
          bondDate: data.date,
          bondImageUrl: "image name",
          bondTyep: 1,
          isUrgenOrder: true,
        },
        isPage: false,
      }),
    onError: (err) => {
      console.log(err);
      toast({
        variant: "destructive",
        description: err.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
    onSuccess: () => {
      router.push("/checkout-success");
    },
  });

  const onsubmit: SubmitHandler<CheckoutType> = (data) => {
    mutate(data);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <h1 className="font-bold text-xl text-center">أجراءات الدفع</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className={`font-bold text-lg `} htmlFor="name">
              البنك / المصرف <span className="mr-2 text-red-400">*</span>
            </Label>
            <SelectComponent register={register} />
            {errors.bank?.message && (
              <span className="text-sm text-red-500 ">
                {errors.bank?.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className={`font-bold text-lg `}>
              المبلغ المدفوع<span className="mr-2 text-red-400">*</span>
            </Label>
            <Input
              type="number"
              {...register("amount")}
              placeholder="يجب اخال قيمة المبلغ الذي تم دفعه"
            />
            {errors.amount?.message && (
              <span className="text-sm text-red-500 ">
                {errors.amount?.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className={`font-bold text-lg `} htmlFor="name">
              رقم السند <span className="mr-2 text-red-400">*</span>
            </Label>
            <Input
              type="number"
              placeholder="تأكد من أدخال رقم السند بشكل صحيح"
              {...register("number")}
            />
            {errors.number?.message && (
              <span className="text-sm text-red-500 ">
                {errors.number?.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label className={`font-bold text-lg `} htmlFor="name">
              تاريخ السند <span className="mr-2 text-red-400">*</span>
            </Label>
            <Input
              type="date"
              {...register("date")}
              placeholder="أدخل تاريخ اصدار السند "
            />
            {errors.date?.message && (
              <span className="text-sm text-red-500 ">
                {errors.date?.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className={`font-bold text-lg `} htmlFor="name">
              صورة السند <span className="mr-2 text-red-400">*</span>
            </Label>
            <Input type="file" {...register("image")} />
            {errors.image?.message && (
              <span className="text-sm text-red-500 ">
                {errors.image?.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className={`font-bold text-lg `} htmlFor="name">
              ملاحظة<span className="mr-2 text-red-400">*</span>
            </Label>
            <Input
              type="text"
              placeholder="اكتب ملاحظة"
              {...register("note")}
            />
            {errors.note?.message && (
              <span className="text-sm text-red-500 ">
                {errors.note?.message}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isPending}
            className="w-full hover:bg-orange-600 bg-primary-background transition-colors"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "رفع السند"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckoutForm;
