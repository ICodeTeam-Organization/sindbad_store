import { AiOutlinePlus } from "react-icons/ai";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = () => {
  const onDrop = useCallback(() => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="border text-center grid items-center cursor-pointer w-28 h-24"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>ضع الصورة</p> : <AiOutlinePlus className="m-auto" />}
    </div>
  );
};

export default DropZone;
