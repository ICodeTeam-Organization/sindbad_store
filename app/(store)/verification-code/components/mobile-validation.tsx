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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import useResendCode from "@/hooks/useResendCode";
import { postApi } from "@/lib/http";
import { cn, remmainingTime } from "@/lib/utils";
const MobileValidation = () => {
  const form = useForm<z.infer<typeof VertificationCodeSchema>>({
    resolver: zodResolver(VertificationCodeSchema),
    defaultValues: {
      activation: "",
    },
  });

  const { toast } = useToast();
  const { timeLeft , handleReSendCode , handleReset} = useResendCode();

   const { mutate: mutateForResendCode, isPending: isPendingForResendCode } =
      useMutation({
        mutationFn: async (phoneNumber: string) => {
          console.log(phoneNumber, "phoneNumber");
          
          await postApi(
            "Auth/Register/VerificationCode?isRegisted=true&number=" +
              phoneNumber
          );
          return phoneNumber;
        },
        // mutationFn: registerUser,
        onSuccess: ( ) => {
          toast({
            variant: "default",
            description: "تم إعادة إرسال كود التحقق الى هاتفك",
          });
          handleReSendCode()
          // sessionStorage.setItem("forgo.
        },
        onError: (err) => {
          console.log(err.message);
          toast({
            variant: "destructive",
            description: err.message || "حدث خطأ ما",
          });
        },
      });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast({
        variant: "default",
        description: "تم إنشاء حسابك بنجاح",
      });
      sessionStorage.removeItem("verficationAuthData");
      handleReset()
      window.location.replace("/");
    },
    onError: (err) => {
      console.log(err.message, "dlldldl");
      toast({
        variant: "destructive",
        description: err.message || "حدث خطاء",
      });
    },
  });
  

  function onSubmit(values: z.infer<typeof VertificationCodeSchema>) {
    const userData = JSON.parse(
      sessionStorage.getItem("verficationAuthData") as string
    ) as registerFormField;  
    if (userData) {
      userData.code = values.activation;
      mutate(userData);
    } else {
      toast({
        variant: "destructive",
        description: "حدث خطاء يرجى إعادة التسجيل مره أخرى ",
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
        <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-[#344054] font-normal">
                    لم يصلك كود التحقق؟
                  </p>
                  <Button
                    variant="link"
                    type="button"
                    disabled={timeLeft > 0}
                    onClick={() => {
                      const userData = JSON.parse(
                        sessionStorage.getItem("verficationAuthData") as string
                      ) as registerFormField;  
                      const phonenum = userData?.phone;
                      if (!phonenum) {
                        toast({
                          variant: "destructive",
                          description: "حدث خطاء يرجى إعادة التسجيل مره أخرى ",
                        });
                        return;}
                      console.log(phonenum, "phonenum");
                       mutateForResendCode(phonenum);
                    }}
                    className={cn("text-sm text-[#FA8232] font-bold",
                      timeLeft > 0 && '  cursor-not-allowed text-xs' 
                    )}
                  >
                    {isPendingForResendCode ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      timeLeft > 0 ? `إعادة الإرسال بعد ${remmainingTime(timeLeft)}  ` : 'إعادة إرسال كود التحقق'
                    )}
                  </Button>
                </div>
        <Button
          className="min-w-[150px] w-full h-[48px] mt-4 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-base flex justify-center items-center font-bold"
          type="submit"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "تأكيـــد"}
        </Button>
      </form>
    </Form>
  );
};

export default MobileValidation;
