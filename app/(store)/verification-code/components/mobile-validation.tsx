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
import { registerFormField } from "@/types/authTypes";
import { registerUser } from "@/app/auth/helpers";
import { useMutation } from "@tanstack/react-query";
import {  useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
const MobileValidation = () => {
  const form = useForm<z.infer<typeof VertificationCodeSchema>>({
    resolver: zodResolver(VertificationCodeSchema),
    defaultValues: {
      activation: "",
    },
  });

  const {toast} = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: ( ) => {
      toast({
        variant: "default",
        description: "تم إرسال كود التحقق الى هاتفك",
      });
      sessionStorage.removeItem("verficationAuthData");
      window.location.replace("/") 
    },
    onError: (err) => {
      console.log(err.message,"dlldldl");
      toast({
        variant: "destructive",
        description: err.message || "حدث خطاء",
      });
    },
  });

  function onSubmit(values: z.infer<typeof VertificationCodeSchema>) {
    let userData = JSON.parse(sessionStorage.getItem("verficationAuthData") as string) as registerFormField;
    if(userData) {
      userData.code = values.activation ;
      mutate(userData)
     
    } else{
      toast({
        variant: "destructive",
        description:"حدث خطاء يرجى إعادة التسجيل مره أخرى ",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
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
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-base flex justify-center items-center font-bold"
          type="submit"
        >
        {isPending ? <Loader2 className="animate-spin" /> :  "تأكيـــد"}
        </Button>
      </form>
    </Form>
  );
};

export default MobileValidation;
