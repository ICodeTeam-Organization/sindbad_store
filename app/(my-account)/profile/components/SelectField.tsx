import {SelectFieldProps} from "../types"

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => (
  <div>
    <label className="block text-right text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none">
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  </div>
);

export default SelectField;
