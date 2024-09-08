import Image from "next/image";
import specialrequist from "@/app/Images/specialrequist.svg";
import Stores from "@/app/Images/Stores.svg";
import discounts from "@/app/Images/discounts.svg";
import onlineStores from "@/app/Images/onlineStores.svg";
import shoppingStore from "@/app/Images/shoppingStore.svg";
import wholesaleSection from "@/app/Images/wholesaleSection.svg";
const Cards = () => {
  const cards = [
    { name: "طلب خاص", image: specialrequist },
    { name: "العروض", image: discounts },
    { name: "المتجر ", image: shoppingStore },
    { name: "المحلات", image: Stores },
    { name: "متاجر الكترونية", image: onlineStores },
    { name: "قسم الجملة", image: wholesaleSection },
  ];
  return (
    // w-[140px] h-[150px] lg:w-[190px] lg:h-[205px]
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  grid grid-cols-3 lg:grid-cols-6  md:gap-2 xl:gap-3">
      {cards.map((card) => (
        <div
          key={card.name}
          className=" shadow-lg  md:pt-[35px] pt-[15px]   lg:h-[205px] bg-white  md:rounded-[25px] border-[1px] border-[#DCD9D9] text-center hover:cursor-pointer hover:-translate-y-5 transition-transform duration-300"
        >
          <Image
            className="m-auto lg:h-[52.95px] md:h-[40.95px] h-[35px]"
            src={card.image}
            alt={"Cardes"}
            width={55}
          />
          <h1 className="md:pt-[35px] pt-[20px] mb-2 md:mb-0 text-[#666666] text-[16px] md:text-[20px] lg:text-[24px]">
            {card.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Cards;
