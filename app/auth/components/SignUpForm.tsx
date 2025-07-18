"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerFormField } from "@/types/authTypes";
import { Label } from "@radix-ui/react-label";
import { registrationSchema } from "../schema";
import { useForm } from "react-hook-form"; // تم إزالة SubmitHandler
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query"; 
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar"; 
import { toast } from "@/hooks/use-toast"; 
import useResendCode from "@/hooks/useResendCode";
import { registerUser } from "../helpers";
import { remmainingTime } from "@/lib/timeFuns";
import Link from "next/link";

const SignUpForm: React.FC = () => {

 

  const {saveRetrySendCode,canSendCode} = useResendCode();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (formData: registerFormField) =>{
  //          await postApi("Auth/Register/VerificationCode?isRegisted=true&number=" + formData.phone);
  //          return formData
  //       },
  //   // mutationFn: registerUser,
  //   onSuccess: (formData: registerFormField) => {
  //     toast({
  //       variant: "default",
  //       description: "تم إرسال كود التحقق الى هاتفك",
  //     });
      // saveRetrySendCode()
      // sessionStorage.setItem("verficationAuthData",JSON.stringify(formData));
      // router.push("/verification-code")
  //   },
  //   onError: (err) =>{
  //     toast({
  //       variant: "destructive",
  //       description: err.message || "حدث خطأ ما",
  //     });
  //     setError(err.message)
  //   },
  // });

 

  // validate form fields
  const {
    register,
    handleSubmit,
    formState: { errors ,  },
    getValues,
  } = useForm<registerFormField>({
    resolver: zodResolver(registrationSchema),
  });

   const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast({
        variant: "default",
        description: "تم إرسال كود التحقق الى هاتفك",
      });
      saveRetrySendCode()
      sessionStorage.setItem("verficationNumber",JSON.stringify(getValues("phone")));
      sessionStorage.setItem("pswrd",JSON.stringify(getValues("password")));
      sessionStorage.setItem("signupdata",JSON.stringify(getValues()));
      router.push("/verification-code") 
    },
    onError: (err) => {
      console.log(err.message, "dlldldl");
      toast({
        variant: "destructive",
        description: err.message || "حدث خطاء",
      });
    },
  });

  const onSubmit = (formData: registerFormField) => { // تعديل هنا
    setError(null);
    if (!canSendCode()?.canSend) {
      toast({
        variant: "destructive",
        description: "لا يمكنك  إنشاء حساب الآن، يرجى الانتظار." + remmainingTime(canSendCode()?.remaining),
      });
      return;
      
    }
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {error && <div className="p-2 bg-red-100 text-red-600">{error}</div>}
        <div className="space-y-2">
          <Label className={`font-bold text-base `} htmlFor="name">
            الاسم*
          </Label>
          <Input {...register("name")} id="name" type="text" placeholder="" />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-base `} htmlFor="phone">
            رقم الهاتف*
          </Label>
          <Input {...register("phone")} id="phone" type="text" placeholder="" />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-base `} htmlFor="email">
            البريد الألكتروني
          </Label>
          <Input {...register("email")} id="email" type="text" placeholder="" />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-base `} htmlFor="password">
            كلمة المرور*
          </Label>
          <PasswordInput register={register} fieldName="password" />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-base `} htmlFor="confirmPassword">
            تأكيد كلمة المرور*
          </Label>
          <PasswordInput register={register} fieldName="confirmPassword" />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>
       <div>
         <div className="space-y-2 w-full flex items-center justify-center text-sm  ">
          هل توافق على شروط وأحكام وسياسة الخصوصية
          <input
            {...register("agreeTerms")}
            type="checkbox"
            className="mr-10"
            name="agreeTerms"
          />
        </div>
        <Link href="/privacy" className="text-sm  text-blue-600 underline  ">
           سياسة الخصوصية 
        </Link>
       </div>
        {errors.agreeTerms && (
          <span className="block text-sm text-red-500">
            {errors.agreeTerms.message}
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-orange-600 bg-primary transition-colors">
          {isPending ? (
            <>
              يرجى الانتظار
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "إنشاء حساب"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;