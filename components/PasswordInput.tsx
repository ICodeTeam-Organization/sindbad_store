"use client";

import { Input } from "./ui/input";
import { useState } from "react";
import { BsEye } from "react-icons/bs";

type Props = {
  name?: string;
  placeholder?: string;
  onChange?: () => void;
};

const PasswordInput = ({ name, placeholder, onChange }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <BsEye
        onClick={handleShowPasword}
        className="absolute left-2 top-3 bg-white cursor-pointer"
      />
    </div>
  );
};

export default PasswordInput;
