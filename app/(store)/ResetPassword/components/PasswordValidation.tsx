"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPassSchema } from "@/app/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";

const PasswordValidation = () => {
  const form = useForm<z.infer<typeof ResetPassSchema>>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      activation: "",
    },
  });
  function onSubmit(values: z.infer<typeof ResetPassSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="activation"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-xl">رمز التفعيل</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-xl">كلمة المرور</FormLabel>
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
              <FormLabel className="text-xl">تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center font-bold"
          type="submit"
        >
          إعادة تعيين كلمة المرور
          <AiOutlineArrowLeft className="mr-2" />
        </Button>
      </form>
    </Form>
  );
};

export default PasswordValidation;
