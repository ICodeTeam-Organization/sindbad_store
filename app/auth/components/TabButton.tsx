import { Button } from "@/components/ui/button";

type Props = { showLoginForm: boolean; handleChangeForm: () => void };

const TabButton = ({ showLoginForm, handleChangeForm }: Props) => {
  return (
    <div className="flex ">
      <Button
        variant={"ghost"}
        className={`${
          showLoginForm && "border-none text-gray-400"
        } border border-b-2 border-b-orange-500 w-1/2  rounded-none font-bold text-lg transition-all duration-200  `}
        onClick={handleChangeForm}
      >
        حساب جديد
      </Button>
      <Button
        variant={"ghost"}
        className={`${
          !showLoginForm && "border-none text-gray-400"
        } border border-b-2 border-b-orange-500 w-1/2  rounded-none font-bold text-lg transition-all duration-200  `}
        onClick={handleChangeForm}
      >
        تسجيل الدخول
      </Button>
    </div>
  );
};

export default TabButton;
