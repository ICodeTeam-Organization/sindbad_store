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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../helpers";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => router.push("/"),
    onError: (err) => setError(err.message),
  });
  // valdiate form fields
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormField>({
    resolver: zodResolver(LoginSchema),
  });

  const onsubmit: SubmitHandler<registerFormField> = async (formData) => {
    setError(null);
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <CardContent className="space-y-4">
        {error && <div className="p-2 bg-red-100 text-red-600">{error}</div>}
        <div className="space-y-2">
          <Label className={`font-bold text-lg `} htmlFor="name">
            رقم الهاتف
          </Label>
          <Input {...register("phone")} id="phone" name="phone" type="text" />
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
        <Button
          disabled={isPending}
          className="w-full hover:bg-orange-600 bg-primary-background transition-colors"
        >
          {isPending ? (
            <>
              يرجى الانتظار
              <Loader2 className="animate-spin" />
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
