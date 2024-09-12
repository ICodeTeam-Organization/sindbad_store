import Image from "next/image";
import Stores from "@/public/images/Stores.svg";
const Adresses = () => {
  const data = [
    {
       title : "4K UHD LED Smart TV with Chromecast Built-in",
       image: Stores,
       price: 70,
       quantity: 1
    },
     {
       title : "4K UHD LED Smart TV with Chromecast Built-in",
       image: Stores,
       price: 140,
       quantity: 6
    },
 ];
  return (
    <div className="grid grid-cols-6 text-center items-center font-bold w-full text-gray-600">
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full col-span-3 text-xl max-sm:text-sm text-right pr-5">
        المنتجات
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
        السعر
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
        الكمية
      </h1>
      <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
        الاجمالي
      </h1>

      {/* fetch api from here */}
      {data.map((itm) => (
        <>
          <div className="flex justify-between items-center text-right px-3 max-md:text-xs  mt-9 col-span-3">
            <Image src={itm.image} alt={itm.title} className="" width={50} />
            <h1 className=" pr-3 line-clamp-3">
              {itm.title}
            </h1>
          </div>
          <h1 className="m-auto px-3 line-clamp-3 max-sm:text-xs mt-9">{itm.price}$</h1>
          <h1 className="m-auto mt-9 line-clamp-3 max-sm:text-xs">{itm.quantity}</h1>
          <h1 className="m-auto mt-9 line-clamp-3 max-sm:text-xs">{itm.price*itm.quantity}</h1>
        </>
      ))}
    </div>
  );
};

export default Adresses;
