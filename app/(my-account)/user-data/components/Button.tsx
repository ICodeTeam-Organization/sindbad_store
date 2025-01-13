import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({ text, type, className }) => (
  <button
    type={type}
    className={`px-6 py-2 text-sm font-medium rounded-lg focus:ring-2 focus:outline-none ${className}`}
  >
    {text}
  </button>
);

export default Button;
