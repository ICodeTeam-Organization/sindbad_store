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

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutType>({
    resolver: zodResolver(checkoutSchema),
  });

  const onsubmit: SubmitHandler<CheckoutType> = (data) => {
    console.log(data);
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <h1 className="font-bold text-xl text-center">أجراءات الدفع</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onsubmit)}>
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
        </CardContent>
        <CardFooter>
          <Button className="w-full hover:bg-orange-600 bg-primary-background transition-colors">
            رفع السند
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckoutForm;
