import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

const SocialAuthButtons = () => {
  return (
    <>
      <div className="relative w-full mb-5">
        <span className="bg-white p-1 text-sm absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
          أو
        </span>
        <span className="block bg-gray-200 w-full h-[1px] "></span>
      </div>
      <Button variant={"outline"} className="w-full mb-2">
        أستخدم حساب قوقل لتسجيل الدخول
        <FcGoogle size={20} className="mr-3" />
      </Button>
      <Button variant={"outline"} className=" w-full">
        أستخدم حساب فيسبوك لتسجيل الدخول
        <ImFacebook2 className="mr-3" size={20} />
      </Button>
    </>
  );
};

export default SocialAuthButtons;
