"use client";

import { registerFormField } from "@/types/authTypes";
import { Input } from "./ui/input";
import { InputHTMLAttributes, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { BsEye } from "react-icons/bs";

type PasswordComponentProps = {
  fieldName?: keyof registerFormField;
  register?: UseFormRegister<registerFormField>;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FC<PasswordComponentProps> = ({
  fieldName,
  register,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        {...(fieldName && register && { ...register(fieldName) })}
        {...rest}
        type={showPassword ? "text" : "password"}
      />
      <BsEye
        onClick={handleShowPasword}
        className="absolute left-2 top-3 bg-white cursor-pointer"
      />
    </div>
  );
};

export default PasswordInput;
