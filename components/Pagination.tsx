import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const Pagination = () => {
  const arr = ["01", "02", "03", "04", "05"];
  return (
    <div className="flex items-center justify-center cursor-pointer mt-16 mb-10">
      <BsArrowRightCircle
        className="text-primary-background mx-3 hover:text-white hover:bg-primary transition-all duration-700 rounded-full"
        size={30}
      />
      {arr.map((itm, index) => (
        <div
          key={index}
          className=" rounded-full border-2 hover:text-white hover:bg-primary hover:border-none transition-all duration-700 w-8 h-8 p-1 text-center ml-1"
        >
          {itm}
        </div>
      ))}
      <BsArrowLeftCircle
        className="text-primary-background mx-3 hover:text-white hover:bg-primary transition-all duration-700 rounded-full"
        size={30}
      />
    </div>
  );
};

export default Pagination;
