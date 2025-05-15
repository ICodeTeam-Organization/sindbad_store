"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { changePassSchema } from "@/app/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { putApi } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
 
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useToast } from "@/hooks/use-toast";

type resetfiled = {
  currentPassword: string;
  newPassword: string;
};

const ChangePassForm = () => {

  const router = useRouter();
  const {toast} = useToast()

  const { mutate , isPending } = useMutation({
    mutationFn: async ({ currentPassword, newPassword }: resetfiled) =>
      await putApi<any>("Auth/ChangePassword", {
        body: {
          currentPassword,
          newPassword,
        },
      }),
    onSuccess: ( ) => {
        toast({
            variant:"default",
            description:"تم تغيير كلة المرور"
        })
        router.replace("/profile")
    },
    onError: (err) => {
        console.log(err.message || "حدث خطاء ");
        toast({
            variant: "destructive",
            description: (err.message || "كلمة المرور الحالية غير صحيحة"),
            // action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
          });
    },
  });

  const form = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      CurrentPassword: "",
      Newpassword: "",
      confirmPassword: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          mutate({
            currentPassword: data.CurrentPassword,
            newPassword: data.Newpassword,
          })
        )}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="CurrentPassword"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-sm">كلمة المرور الحالية</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Newpassword"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-sm">كلمة المرور الجديدة</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-sm">تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-base flex justify-center items-center font-bold"
          type="submit"
        >
          {isPending ? <Loader2 className="animate-spin" />:"إعادة تعيين كلمة المرور"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassForm;
