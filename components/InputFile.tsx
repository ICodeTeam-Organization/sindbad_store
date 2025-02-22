import { Plus, X } from "lucide-react";
import React, { useState } from "react";

interface InputFileProps   {
  labelText?: string;
  placeholderText?: string;
  onChange?: (e: File[]) => void;
  orderKey: string;
}

const InputFile: React.FC<InputFileProps> = ({
  labelText = "إضافة صورة",
  placeholderText = "إختر صورة",
  orderKey,
  onChange,
  ...inputProps
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const allFiles = [...selectedImages, ...newFiles]
      setSelectedImages(allFiles);
      if (onChange) {
        onChange(allFiles);
      }
    } 
  };

  const handleRemoveImage = (index: number) => {
    const imagesAfterRemove = selectedImages?.filter((_, i) => i !== index)
    setSelectedImages(imagesAfterRemove);
    if (onChange) {
      onChange(imagesAfterRemove);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
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
          multiple
          onChange={handleFileChange}
        />
        <p className="mx-4">
          {selectedImages.length > 0 ? `تم اختيار ${selectedImages.length} صورة` : placeholderText}
        </p>
      </label>

      {/* Display selected images */}
      {selectedImages.length > 0 && (
        <ul className="mt-2 w-full border p-2 rounded-lg">
          {selectedImages.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-1"
            >
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button onClick={() => handleRemoveImage(index)} className="text-red-500 hover:text-red-700">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputFile;
