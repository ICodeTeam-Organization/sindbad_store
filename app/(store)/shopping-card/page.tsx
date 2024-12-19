import ShoppingCart from "./components/shopping-card";

const page = () => {
  return (
    <div className="">
      {/* <div className="flex items-center w-full px-4">
        <SelectShppingAdress />
        <div className="mr-3 flex items-center">
          <span className="ml-3">مستعجلة</span> <Checkbox />
        </div>
      </div> */}
      <ShoppingCart />
    </div>
  );
};

export default page;
