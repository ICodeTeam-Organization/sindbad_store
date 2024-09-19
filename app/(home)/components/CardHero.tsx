import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Porps = {
  name: string;
  image: string;
  href: string;
  index: number;
  length: number;
};

const CardHero = ({ name, image, index, length, href }: Porps) => {
  return (
    <Link
      href={href}
      className={cn(
        index === length - 1 && "hidden lg:block",
        "shadow-lg  md:pt-[35px] pt-[15px]   lg:h-[205px] bg-white  md:rounded-[25px] border-[1px] border-[#DCD9D9] text-center hover:cursor-pointer hover:-translate-y-5 transition-transform duration-300"
      )}
    >
      <Image
        className="m-auto lg:h-[52.95px] md:h-[40.95px] h-[35px]"
        src={image}
        alt={"Cardes"}
        width={55}
      />
      <h1 className="md:pt-[35px] pt-[20px] mb-2 md:mb-0 text-[#666666] text-[16px] md:text-[20px] lg:text-[24px]">
        {name}
      </h1>
    </Link>
  );
};

export default CardHero;
