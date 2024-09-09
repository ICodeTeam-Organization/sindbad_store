import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserLoginData } from "@/types/authTypes";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import { LoginSchema } from "../schema";
import { handleChange } from "../utils/handleChangeForm";

const LoginForm = () => {
  const [formData, setFormData] = useState<UserLoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserLoginData, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            className={`font-bold text-lg ${errors.email && "text-red-500"}`}
            htmlFor="name"
          >
            البريد الألكتروني
          </Label>
          <Input
            id="email"
            name="email"
            type="text"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
            placeholder=""
          />
          {errors.email && (
            <span className="text-sm text-red-500 ">{errors.email}</span>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label
              className={`font-bold text-lg ${
                errors.password && "text-red-500"
              }`}
              htmlFor="passowrd"
            >
              كلمة المرور
            </Label>
            <Link href={""} className="text-sky-500">
              نسيت كلمة المرور
            </Link>
          </div>
          <PasswordInput
            name="password"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
          />{" "}
          {errors.password && (
            <span className="text-sm text-red-500 ">{errors.password}</span>
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
