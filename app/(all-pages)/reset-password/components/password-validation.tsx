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
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { postApi } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next-nprogress-bar";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import useResendCode from "@/hooks/useResendCode";
import { remmainingTime } from "@/lib/timeFuns";


 


const PasswordValidation = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    timeLeft,
    handleReSendCode,
    handleReset,
} = useResendCode()

 

  const { mutate: mutateForResendCode, isPending: isPendingForResendCode } =
    useMutation({
      mutationFn: async (phoneNumber: string) => {
        await postApi(
          "Auth/Register/VerificationCode?isRegisted=false&number=" +
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
    mutationFn: async (data: {
      phoneNumber: string;
      code: string;
      newPassword: string;
    }) => {
      return await postApi("Auth/ForgotPassword", {
        body: {
          PhoneNumber: data?.phoneNumber,
          code: data?.code,
          newPassword: data?.newPassword,
        },
      });
    },
    onSuccess: () => {
      toast({
        variant: "default",
        description: "تم تغيير كلمة المرور يرجى تسجيل الدخول",
      });
      handleReset()
      sessionStorage.removeItem("forgotPasswordData");
      router.push("/auth");
      // window.location.replace("/")
    },
    onError: (err) => {
      console.log(err.message, "dlldldl");
      toast({
        variant: "destructive",
        description: err.message || "حدث خطاء",
      });
    },
  });

  const form = useForm<z.infer<typeof ResetPassSchema>>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      // phone:  "",
      newPassword: "",
      code: "",
      confirmPassword: "",
    },
  });

 

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          const phonenum =
            sessionStorage.getItem("forgotPasswordData")?.toString() || "";
          mutate({
            newPassword: data.newPassword,
            code: data.code,
            phoneNumber: phonenum,
          });
        })}
        className="space-y-8"
      >
        {/* <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-base">  الحالية</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-base">كلمة المرور الجديدة</FormLabel>
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
              <FormLabel className="text-base">تأكيد كلمة المرور </FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="m-auto mt-[30px]">
              <FormLabel className="text-base"> كود التحقق</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-[#344054] font-normal">
            لم يصلك كود التحقق؟
          </p>
          <Button
            variant="link"
            type="button"
            disabled={timeLeft > 0}
            onClick={() => {
              const phonenum = sessionStorage.getItem("forgotPasswordData")?.toString() || "";
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
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded-[2px] text-base flex justify-center items-center font-bold"
          type="submit"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "إعادة تعيين كلمة المرور"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordValidation;
