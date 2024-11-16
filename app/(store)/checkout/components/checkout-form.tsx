"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { checkoutSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Bank, CheckoutType } from "@/types/checkout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputField from "./input-field";
import { Input } from "@/components/ui/input";

const CheckoutForm = () => {
  const { data } = useQuery<any>({
    queryKey: ["banks"],
    queryFn: async () => await getApi("Cart/GetAllBanksForViewInCartPage"),
  });

  const form = useForm<CheckoutType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      amount: "",
      bank: "",
      date: "",
      image: undefined,
      note: "",
      number: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-bound"],
    mutationFn: (data: z.infer<typeof checkoutSchema>) =>
      postApi("Orders/CompleteCustomerPurchase", {
        body: {
          bankId: 3, 
          note: data.note,
          amount: data.amount,
          bondNumber: data.number,
          bondDate: data.date,
          bondImageUrl: data.image[0],
          bondTyep: 1,
          isUrgenOrder: true,
        },
        isPage: false,
      }),
    onError: (err) => {
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

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <h1 className="font-bold text-xl text-center">أجراءات الدفع</h1>
      </CardHeader>
      <FormProvider {...form}>
        <form encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="bank"
              render={({ field }: { field: any }) => ( // تحديد نوع field هنا
                <FormItem className="w-full">
                  <Select dir="rtl" onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="حدد الصراف/البنك" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {data?.data?.map((bank: Bank) => (
                          <SelectItem key={bank.id} value={bank.id.toString()}>
                            {bank.bankName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputField
              name="amount"
              label="المبلغ المدفوع"
              control={form.control}
              type="number"
            />
            <InputField
              name="number"
              label="رقم السند"
              control={form.control}
              type="number"
            />
            <InputField
              name="date"
              label="تاريخ الدفع"
              control={form.control}
              type="date"
            />
            <InputField
              name="note"
              label="ملاحظة"
              control={form.control}
              type="text"
            />
            <Input type="file" {...form.register("image")} />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full hover:bg-orange-600 bg-primary-background transition-colors"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "رفع السند"}
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CheckoutForm;