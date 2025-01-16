import { Plus } from "lucide-react";
import React, { useState } from "react";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholderText?: string;
  // className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional for custom onChange handling
  orderKey:string
}

const InputFile: React.FC<InputFileProps> = ({
  labelText = "إضافة صورة",
  placeholderText = "إختر صورة",
  // className = "",
  orderKey,
  onChange,
  ...inputProps // This will pass all other props down to the input element
}) => {
  const [fileName, setFileName] = useState<string | null>(null); // State to store the file name

  // Handle the change when a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name); // Set the file name to state
    } else {
      setFileName(null); // Reset if no file is selected
    }

    // Call the provided onChange function if it exists
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`flex items-center justify-center`}>
      <label
        htmlFor={"picture" + orderKey} 
        className="flex items-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
      >
        <div className="flex flex-col items-center justify-center p-2 text-sm bg-white text-black border-l">
          <Plus className="text-gray-500 mb-2" />
          <span className="text-gray-700">{labelText}</span>
        </div>
        <input
          {...inputProps} 
          id={"picture" + orderKey}
          type="file"
          className="hidden"
          onChange={handleFileChange} // Use the local file change handler
        />
        <p className="mx-4">{fileName ? `تم اختيار: ${fileName}` : placeholderText}</p> {/* Display file name or placeholder */}
      </label>
    </div>
  );
};

export default InputFile;
