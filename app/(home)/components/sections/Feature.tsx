import { FaRetweet, FaShippingFast } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

const Feature = () => {
  return (
    <div className="py-10 container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 p-4 ">
      <ul className="p-5 px-2 lg:p-8 flex flex-wrap lg:flex-nowrap justify-center gap-5  border ">
        <li>
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-start ">
            <FaShippingFast className="text-orange-400 text-5xl ml-5" />
            <div>
              <span className="font-bold text-lg block ">منتجات مضمونة</span>
              <span className="text-gray-500">
                منتجات أمنة اقساط تصل الى 12 شهرا
              </span>
            </div>
          </div>
        </li>
        <li className="lg:mx-8  lg:border-x-2  lg:px-8">
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-start   ">
            <FaRetweet className="text-orange-400 text-5xl ml-5" />
            <div>
              <span className="font-bold text-lg block ">شحن مجاني</span>
              <span className="text-gray-500">
                منتجات أمنة اقساط تصل الى 12 شهرا
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-start  ">
            <MdPayments className="text-orange-400 text-5xl ml-5" />
            <div>
              <span className="font-bold text-lg block ">مدفوعات امنة</span>
              <span className="text-gray-500">
                منتجات أمنة اقساط تصل الى 12 شهرا
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Feature;
