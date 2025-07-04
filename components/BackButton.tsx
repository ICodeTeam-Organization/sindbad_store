"use client";
import { useRouter } from "next-nprogress-bar";
import { TiArrowLeftThick } from "react-icons/ti";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Button
      onClick={handleBack}
      variant={"outline"}
      className="font-bold hover:bg-primary hover:text-white"
    >
      <span className="ml-2">رجوع</span> <TiArrowLeftThick size={15} />
    </Button>
  );
};

export default BackButton;
