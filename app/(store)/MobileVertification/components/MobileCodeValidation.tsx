"use client";
import { Input } from "@/components/ui/input";
import { MobileVertificationSchema } from "@/app/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";
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
import Link from "next/link";

const MobileCodeValidation = () => {
  const form = useForm<z.infer<typeof MobileVertificationSchema>>({
    resolver: zodResolver(MobileVertificationSchema),
    defaultValues: {
      activation: "",
    },
  });
  function onSubmit(values: z.infer<typeof MobileVertificationSchema>) {
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
              <div className="flex justify-between">
                <FormLabel className="text-xl">رمز التحقق</FormLabel>
                <Link className="text-[20px]  text-[#2DA5F3]" href={""}>
                  إعادة إرسال الرمز
                </Link>
              </div>
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
          {" "}
          <AiOutlineArrowRight className="ml-3" />
          تحقق لي
        </Button>
      </form>
    </Form>
  );
};

export default MobileCodeValidation;
