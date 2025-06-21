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
import useResendCode from "@/hooks/useResendCode";
import PasswordInput from "@/components/PasswordInput";
import { remmainingTime } from "@/lib/timeFuns";

const PhoneValidation = () => {
  const router = useRouter();
  const { saveRetrySendCode, canSendCode } = useResendCode();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof ForgetPasswordSchema>) => {
      await postApi<any>("Auth/ForgotPassword", {
        body: {
          phoneNumber: data.phone,
          newPassword: data.Newpassword,
        },
      });
      return data;
    }, 
    onSuccess: (data: z.infer<typeof ForgetPasswordSchema>) => {
      saveRetrySendCode();
      toast({
        variant: "default",
        description: "تم إرسال كود التحقق الى هاتفك",
      });
      sessionStorage.setItem("forgotdata", JSON.stringify({ phone: data.phone, newPass: data?.Newpassword }));
      router.push("/verification-code");
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
      confirmPassword: "",
      Newpassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
    if (!canSendCode()?.canSend) {
      toast({
        variant: "destructive",
        description:
          "لا يمكنك إرسال كود التحقق الآن، يرجى الانتظار." +
          remmainingTime(canSendCode()?.remaining),
      });
      return;
    } 
    mutate(values);
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
        <FormField
          control={form.control}
          name="Newpassword"
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
        <Button
          className="min-w-[150px] w-full h-[48px] mt-10 text-white bg-[#FA8232] hover:bg-orange-600 transition-all duration-300 rounded text-sm flex justify-center items-center font-bold"
          type="submit"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "إرسال الرمز"}
          {/* <AiOutlineArrowLeft className="mr-2" /> */}
        </Button>
      </form>
    </Form>
  );
};

export default PhoneValidation;
