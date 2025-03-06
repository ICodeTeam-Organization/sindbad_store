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
import { postApi } from "@/lib/http";
import { toast } from "@/hooks/use-toast";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: registerFormField) =>{
           await postApi("Auth/Register/VerificationCode?number=" + formData.phone);
           return formData
        },
    // mutationFn: registerUser,
    onSuccess: (formData: registerFormField) => {
      toast({
        variant: "default",
        description: "تم إرسال كود التحقق الى هاتفك",
      });
      sessionStorage.setItem("verficationAuthData",JSON.stringify(formData));
      router.push("/verification-code")
    },
    onError: (err) => setError(err.message),
  });

  // validate form fields
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormField>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (formData: registerFormField) => { // تعديل هنا
    setError(null);
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {error && <div className="p-2 bg-red-100 text-red-600">{error}</div>}
        <div className="space-y-2">
          <Label className={`font-bold text-lg`} htmlFor="name">
            الاسم
          </Label>
          <Input {...register("name")} id="name" type="text" placeholder="" />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-lg`} htmlFor="phone">
            رقم الهاتف
          </Label>
          <Input {...register("phone")} id="phone" type="text" placeholder="" />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-lg`} htmlFor="email">
            البريد الألكتروني
          </Label>
          <Input {...register("email")} id="email" type="text" placeholder="" />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-lg`} htmlFor="password">
            كلمة المرور
          </Label>
          <PasswordInput register={register} fieldName="password" />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className={`font-bold text-lg`} htmlFor="confirmPassword">
            تأكيد كلمة المرور
          </Label>
          <PasswordInput register={register} fieldName="confirmPassword" />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="space-y-2 w-full flex items-center justify-center">
          هل توافق على شروط وأحكام وسياسة الخصوصية
          <input
            {...register("agreeTerms")}
            type="checkbox"
            className="mr-10"
            name="agreeTerms"
          />
        </div>
        {errors.agreeTerms && (
          <span className="block text-sm text-red-500">
            {errors.agreeTerms.message}
          </span>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-orange-600 bg-primary-background transition-colors">
          {isPending ? (
            <>
              يرجى الانتظار
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "أنشاء حساب"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;