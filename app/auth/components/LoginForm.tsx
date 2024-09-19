import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { registerFormField } from "@/types/authTypes";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { LoginSchema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormField>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<registerFormField> = async (
    data: registerFormField
  ) => {
    const res = await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });
    console.log(res?.status);
    if (res?.error) {
      console.log("Login failed: Invalid credentials");
    }
    if (res?.ok) router.push("/");
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleSubmit(onSubmit),
  });

  return (
    <form onSubmit={mutate}>
      <CardContent className="space-y-4">
        {isError && (
          <div className="text-red-600 text-center p-3 bg-red-100">
            {error.message}خطأ اثناء عملية تسجيل الخول
          </div>
        )}
        <div className="space-y-2">
          <Label className={`font-bold text-lg  `} htmlFor="name">
            رقم الهاتف
          </Label>
          <Input
            dir="ltr"
            className=" text-end"
            {...register("phone")}
            id="phone"
            name="phone"
            type="text"
          />
          {errors.phone?.message && (
            <span className="text-sm text-red-500 ">
              {errors.phone?.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className={`font-bold text-lg `} htmlFor="passowrd">
              كلمة المرور
            </Label>
            <Link href={""} className="text-sky-500">
              نسيت كلمة المرور
            </Link>
          </div>
          <PasswordInput register={register} fieldName="password" />
          {errors.password && (
            <span className="text-sm text-red-500 ">
              {errors.password.message}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={isPending}
          className="w-full hover:bg-orange-600 bg-primary-background transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              يرجى الانتظار
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
