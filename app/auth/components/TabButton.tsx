import { Button } from "@/components/ui/button";

const TabButton = () => {
  return (
    <div className="flex py-2">
      <Button
        variant={"ghost"}
        className="w-1/2 border-b-2 rounded-none font-bold text-lg  "
      >
        حساب جديد
      </Button>
      <Button
        variant={"ghost"}
        className="w-1/2 border-b-2 rounded-none font-bold text-lg  "
      >
        تسجيل الدخول
      </Button>
    </div>
  );
};

export default TabButton;
