import React from "react";
import {InputFieldProps} from "../types";

const InputField: React.FC<InputFieldProps> = ({label, input_type,input_placeholder=""}) => {
  return (
    <div>
      <label className="block text-right text-sm font-medium text-gray-600 mb-1">
         {label}
      </label>
      <input
        type={input_type}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        placeholder={input_placeholder}
      />
    </div>
  );
};

export default InputField;
