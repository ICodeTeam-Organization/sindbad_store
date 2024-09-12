"use client";
import { Input } from "@/components/ui/input";
import { VertificationCodeSchema } from "@/app/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
const MobileValidation = () => {
  const form = useForm<z.infer<typeof VertificationCodeSchema>>({
    resolver: zodResolver(VertificationCodeSchema),
    defaultValues: {
      activation: "",
    },
  });
  function onSubmit(values: z.infer<typeof VertificationCodeSchema>) {
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
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-[20px] flex justify-center items-center font-bold"
          type="submit"
        >
          تأكيـــد
        </Button>
      </form>
    </Form>
  );
};

export default MobileValidation;
