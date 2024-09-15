import Image from "next/image";
import specialrequist from "@/public/images/specialrequist.svg";
import Stores from "@/public/images/Stores.svg";
import discounts from "@/public/images/discounts.svg";
import onlineStores from "@/public/images/onlineStores.svg";
import shoppingStore from "@/public/images/shoppingStore.svg";
import wholesaleSection from "@/public/images/wholesaleSection.svg";
import { cn } from "@/lib/utils";
const Cards = () => {
  const cards = [
    { name: "طلب خاص", image: specialrequist },
    { name: "العروض", image: discounts },
    { name: "المتجر ", image: shoppingStore },
    { name: "المحلات", image: Stores },
    { name: "متاجر الكترونية", image: onlineStores },
    { name: "قسم العاب", image: wholesaleSection },
    { name: "قسم الجملة", image: wholesaleSection },
  ];
  return (
    // w-[140px] h-[150px] lg:w-[190px] lg:h-[205px]
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  grid grid-cols-3 lg:grid-cols-7 md:gap-2 xl:gap-3 relative lg:-top-24 xl:-top-32 ">
      {cards.map((card, index) => (
        <div
          key={card.name}
          className={cn(
            index === cards.length - 1 && "hidden lg:block",
            "shadow-lg  md:pt-[35px] pt-[15px]   lg:h-[205px] bg-white  md:rounded-[25px] border-[1px] border-[#DCD9D9] text-center hover:cursor-pointer hover:-translate-y-5 transition-transform duration-300"
          )}
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
