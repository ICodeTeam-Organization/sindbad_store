import { Checkbox } from "@/components/ui/checkbox";
import SelectShppingAdress from "./components/select-shpping-adress";
import ShoppingCart from "./components/shopping-card";

const page = () => {
  return (
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  py-20 ">
      <div className="flex items-center w-full px-4">
        <SelectShppingAdress />
        <div className="mr-3 flex items-center">
          <span className="ml-3">مستعجلة</span> <Checkbox />
        </div>
      </div>
      <ShoppingCart />
    </div>
  );
};

export default page;
