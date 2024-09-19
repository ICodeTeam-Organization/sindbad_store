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

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormField>({
    resolver: zodResolver(LoginSchema),
  });

  const onsubmit: SubmitHandler<registerFormField> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className={`font-bold text-lg `} htmlFor="name">
            البريد الألكتروني
          </Label>
          <Input {...register("email")} id="email" name="email" type="text" />
          {errors.email?.message && (
            <span className="text-sm text-red-500 ">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className={`font-bold text-lg `} htmlFor="passowrd">
              كلمة المرور
            </Label>
            <Link href={"/forget/"} className="text-sky-500">
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
        <Button className="w-full hover:bg-orange-600 bg-primary-background transition-colors">
          تسجيل الدخول
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
