import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserRegisterData } from "@/types/authTypes";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { registrationSchema } from "../schema";
import { handleChange } from "../utils/handleChangeForm";

const SignUpForm = () => {
  const [formData, setFormData] = useState<UserRegisterData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserRegisterData, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = registrationSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.format();
      setErrors({
        name: fieldErrors.name?._errors[0],
        phone: fieldErrors.phone?._errors[0],
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
        confirmPassword: fieldErrors.confirmPassword?._errors[0],
        agreeTerms: fieldErrors.agreeTerms?._errors[0],
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
            className={`font-bold text-lg ${errors.name && "text-red-500"}`}
            htmlFor="name"
          >
            الاسم
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
            placeholder=""
          />
          {errors.name && (
            <span className="text-sm text-red-500 ">{errors.name}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label
            className={`font-bold text-lg ${errors.phone && "text-red-500"}`}
            htmlFor="phone"
          >
            رقم الهاتف
          </Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
            placeholder=""
          />
          {errors.phone && (
            <span className="text-sm text-red-500 ">{errors.phone}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label
            className={`font-bold text-lg ${errors.email && "text-red-500"}`}
            htmlFor="email"
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
          <Label
            className={`font-bold text-lg ${errors.password && "text-red-500"}`}
            htmlFor="password"
          >
            كلمة المرور
          </Label>
          <PasswordInput
            key="confirmPassword"
            name="password"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
          />
          {errors.password && (
            <span className="text-sm text-red-500 ">{errors.password}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label
            className={`font-bold text-lg ${errors.password && "text-red-500"}`}
            htmlFor="confirmPassword"
          >
            تأكيد كلمة المرور
          </Label>
          <PasswordInput
            key="confirmPassword"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500 ">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <div className="space-y-2 w-full flex items-center justify-center">
          هل توافق على شروط وأحكام وسياسة الخصوصية
          <input
            className="mr-10"
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(e) => {
              handleChange(e, setFormData, formData);
            }}
          />
        </div>
        {!formData.agreeTerms && (
          <span className="text-sm text-red-500 ">{errors.agreeTerms}</span>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-orange-600 bg-primary-background transition-colors">
          أنشاء حساب
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;
