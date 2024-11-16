"use client";

import { registerFormField } from "@/types/authTypes";
import { Input } from "./ui/input";
import { InputHTMLAttributes, useState } from "react";
import { Register } from "react-hook-form"; // تعديل هنا
import { BsEye, BsEyeSlash } from "react-icons/bs";

type PasswordComponentProps = {
  fieldName?: keyof registerFormField;
  register?: Register<registerFormField>; // تعديل هنا
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FC<PasswordComponentProps> = ({
  fieldName,
  register,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative text-end ">
      <Input
        {...(fieldName && register && { ...register(fieldName) })}
        {...rest}
        type={showPassword ? "text" : "password"}
      />
      {showPassword ? (
        <BsEyeSlash
          onClick={handleShowPassword}
          className="absolute left-2 top-3 bg-white cursor-pointer"
        />
      ) : (
        <BsEye
          onClick={handleShowPassword}
          className="absolute left-2 top-3 bg-white cursor-pointer"
        />
      )}
    </div>
  );
};

export default PasswordInput;