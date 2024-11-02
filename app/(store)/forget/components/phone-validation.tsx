"use client";
import { ForgetPasswordSchema } from "@/app/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PhoneValidation = () => {
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-xl">رقم الجوال</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center font-bold"
          type="submit"
        >
          إرسال الرمز
          <AiOutlineArrowLeft className="mr-2" />
        </Button>
      </form>
    </Form>
  );
};

export default PhoneValidation;
