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
import { loginUser } from "@/app/auth/helpers";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import useResendCode from "@/hooks/useResendCode";
import { postApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";
import { remmainingTime } from "@/lib/timeFuns";
const MobileValidation = () => {
  const form = useForm<z.infer<typeof VertificationCodeSchema>>({
    resolver: zodResolver(VertificationCodeSchema),
    defaultValues: {
      activation: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const {
    handleReset,
    timeLeft,
    handleReSendCode: handleReSendCodeChange,
  } = useResendCode();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      code,
      phoneNumber,
      pass,
      isForRigester = false,
    }: {
      phoneNumber: string;
      code: string;
      pass: string;
      isForRigester: boolean;
    }) => {
      const data = await postApi<any>(
        "Auth/Register/VerificationCode?code=" + code + "&number=" + phoneNumber
      );
 
      if (data?.success && isForRigester) {
        await loginUser({
          phone: phoneNumber,
          password: pass, 
        }); 
      }
      return isForRigester;
    },
    // mutationFn: registerUser,
    onSuccess: (isRigester: boolean) => {
      handleReset();
      if (isRigester) {
        toast({
          variant: "default",
          description: "تم تسجيل الدخول بنجاح",
        });
        // toast({
        //   variant: "default",
        //   description: "تم تسجيل الدخول بنجاح",
        // });
        sessionStorage.removeItem("signupdata");
        window.location.replace("/");
      } else {
        toast({
          variant: "default",
          description: "تم تغيير كلمة المرور يرجى تسجيل الدخول",
        });
        sessionStorage.removeItem("forgotdata");
        router.replace("/auth");
      }
    },
    onError: (err) => {
      console.log(err);
      toast({
        variant: "destructive",
        description: err.message || "حدث خطأ ما",
      });
    },
  });

  const { mutate: mutateForResendCode, isPending: isPendingForResendCode } =
    useMutation({
      mutationFn: async ({
        data,
        isForRigester = false,
      }: {
        data: registerFormField | { phone: string; newPass: string };
        isForRigester: boolean;
      }) => {
        if (isForRigester && "name" in data) {
          await postApi<any>("Auth/Register/Customer", {
            body: {
              phoneNumber: data.phone,
              email: data.email,
              password: data.password,
              name: data.name,
            },
          });
        } else if ("newPass" in data && !isForRigester) {
          await postApi<any>("Auth/ForgotPassword", {
            body: {
              phoneNumber: data.phone,
              newPassword: data.newPass,
            },
          });
        }
      },
      onSuccess: () => {
        toast({
          variant: "default",
          description: "تم إعادة إرسال كود التحقق بنجاح",
        });
        handleReSendCodeChange();
      },
      onError: (err) => {
        console.log(err.message);
        toast({
          variant: "destructive",
          description: err.message || "حدث خطأ ما",
        });
      },
    });

  const handleReSendCode = () => {
    const userSignupData = JSON.parse(
      sessionStorage.getItem("signupdata") || "null"
    );
    const forgotPassData = JSON.parse(
      sessionStorage.getItem("forgotdata") || "null"
    );

    if (forgotPassData && forgotPassData.phone && forgotPassData.newPass) {
      mutateForResendCode({
        data: forgotPassData as { phone: string; newPass: string },
        isForRigester: false,
      });
    } else if (userSignupData && Object.keys(userSignupData).length > 0) {
      mutateForResendCode({
        data: userSignupData as registerFormField,
        isForRigester: true,
      });
    } else {
      toast({
        variant: "destructive",
        description: "حدث خطأ يرجى إعادة التسجيل أو إدخال البيانات من جديد.",
      });
    }
  };

  function onSubmit(values: z.infer<typeof VertificationCodeSchema>) {
    const userSignupData = JSON.parse(
      sessionStorage.getItem("signupdata") || "null"
    );
    const forgotPassData = JSON.parse(
      sessionStorage.getItem("forgotdata") || "null"
    );

    if (forgotPassData && forgotPassData.phone && forgotPassData.newPass) {
      mutate({
        phoneNumber: forgotPassData.phone,
        code: values.activation,
        pass: forgotPassData.newPass,
        isForRigester: false,
      });
    } else if (
      userSignupData &&
      userSignupData.phone &&
      userSignupData.password
    ) {
      mutate({
        phoneNumber: userSignupData.phone,
        code: values.activation,
        pass: userSignupData.password,
        isForRigester: true,
      });
    } else {
      toast({
        variant: "destructive",
        description: "حدث خطأ، يرجى إعادة التسجيل أو إدخال البيانات من جديد.",
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
            onClick={handleReSendCode}
            className={cn(
              "text-sm text-[#FA8232] font-bold",
              timeLeft > 0 && "  cursor-not-allowed text-xs"
            )}
          >
            {isPendingForResendCode ? (
              <Loader2 className="animate-spin" />
            ) : timeLeft > 0 ? (
              `إعادة الإرسال بعد ${remmainingTime(timeLeft)}  `
            ) : (
              "إعادة إرسال كود التحقق"
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
