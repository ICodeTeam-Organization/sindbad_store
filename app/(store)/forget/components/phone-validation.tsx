"use client";
import { ForgetPasswordSchema } from "@/app/auth/schema";
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
import { Input } from "@/components/ui/input";
import { postApi } from "@/lib/http";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next-nprogress-bar";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const PhoneValidation = () => {

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (phoneNumber:string) =>{
           await postApi("Auth/Register/VerificationCode?number=" + phoneNumber);
           return phoneNumber
        },
    // mutationFn: registerUser,
    onSuccess: (phoneNumber:string) => {
      toast({
        variant: "default",
        description: "تم إرسال كود التحقق الى هاتفك",
      });
      sessionStorage.setItem("forgotPasswordData",JSON.stringify(phoneNumber));
      router.push("/verification-code")
    },
    onError: (err) => {
      console.log(err.message);
      toast({
        variant: "destructive",
        description: err.message || "حدث خطأ ما",
      });
    },
  });
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    mutate(values.phone);       
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-sm">رقم الجوال</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded text-sm flex justify-center items-center font-bold"
          type="submit"
        >
          {isPending?<Loader2 className="animate-spin" />:"إرسال الرمز"}
          {/* <AiOutlineArrowLeft className="mr-2" /> */}
        </Button>
      </form>
    </Form>
  );
};

export default PhoneValidation;
