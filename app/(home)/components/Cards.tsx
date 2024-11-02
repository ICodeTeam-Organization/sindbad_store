import specialrequist from "@/public/images/specialrequist.svg";
import Stores from "@/public/images/Stores.svg";
import discounts from "@/public/images/discounts.svg";
import onlineStores from "@/public/images/onlineStores.svg";
import shoppingStore from "@/public/images/shoppingStore.svg";
import wholesaleSection from "@/public/images/wholesaleSection.svg";
import CardHero from "./card-hero";
const Cards = () => {
  const cards = [
    { name: "طلب خاص", image: specialrequist, href: "/special-order/" },
    { name: "العروض", image: discounts, href: "/shop" },
    { name: "المتجر ", image: shoppingStore, href: "/shop/" },
    { name: "المحلات", image: Stores, href: "/stores" },
    { name: "متاجر الكترونية", image: onlineStores, href: "/e-commerce/" },
    { name: "قسم العاب", image: wholesaleSection, href: "/" },
    { name: "قسم الجملة", image: wholesaleSection, href: "/" },
  ];
  return (
    // w-[140px] h-[150px] lg:w-[190px] lg:h-[205px]
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  grid grid-cols-3 lg:grid-cols-7 md:gap-2 xl:gap-3 relative lg:-top-24 xl:-top-32 ">
      {cards?.map((card, index) => (
        <CardHero
          key={index}
          href={card.href}
          name={card.name}
          image={card.image}
          index={index}
          length={cards.length}
        />
      ))}
    </div>
  );
};

export default Cards;
