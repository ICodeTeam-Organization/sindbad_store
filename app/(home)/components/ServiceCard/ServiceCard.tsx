"use client";
import React, { useState } from "react";
import "./serviceCard.css";
import Image from "next/image";
import specialrequist from "@/public/images/specialrequist.svg";
import Stores from "@/public/images/Stores.svg";
import discounts from "@/public/images/discounts.svg";
import onlineStores from "@/public/images/onlineStores.svg";
import shoppingStore from "@/public/images/shoppingStore.svg";
import wholesaleSection from "@/public/images/wholesaleSection.svg";
import Link from "next/link";

function ServiceCard() {
  const cards = [
    {
      name: "طلب خاص",
      image: specialrequist,
      href: "/special-order/",
      color: "#1EAE98",
      transpColor: "#1EAE9826",
      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    {
      name: "طلب من متجر إلكتروني",
      image: onlineStores,
      href: "/e-commerce/",
      color: "#F57C00",
      transpColor: "#F57C0050",
      desc: " كل المتاجر الإلكترونية وضعناها بين يديك بأسعار منافسة ..",
    },
    {
      name: "العروض",
      image: discounts,
      href: "/shop",
      color: "#CE2334",
      transpColor: "#CE233450",

      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    {
      name: "تسوق الآن ",
      image: shoppingStore,
      href: "/shop/",
      color: "#B2C1C0",
      transpColor: "#B2C1C026",
      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    // { name: "المحلات", image: Stores, href: "/stores" },
    // { name: "قسم العاب", image: wholesaleSection, href: "/" },
    // { name: "قسم الجملة", image: wholesaleSection, href: "/" },
  ];

  const [isHover, setIsHovered] = useState<number>(-1);

  return (
    <div className="md:m-[3rem]  md:mx-28 mt-5 flex md:flex-nowrap flex-wrap lg:gap-x-8 md:gap-x-4 gap-3 lg:justify-start justify-center">
      {cards.map((ele, x) => {
        const isHovered = isHover >= 0 && x == isHover;
        return (
          <div
            onMouseEnter={() => setIsHovered(x)}
            onMouseLeave={() => setIsHovered(-1)}
          >
            <Link
              href={ele.href}
              className="group card education mdHalf:w-[170px] w-[140px] h-[200px] mdHalf:h-[220px] bg-white rounded-tr-lg overflow-hidden flex flex-col  items-center relative  transition-all duration-300 ease-out text-decoration-none hover:translate-y-[-5px] hover:scale-[1.005] "
              style={{
                boxShadow: isHovered
                  ? `0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px ${ele.transpColor}`
                  : `0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px rgba(0, 0, 0, 0.11)`,
              }}
            >
              <div
                className="overlay absolute mdHalf:w-[60px] mdHalf:h-[60px] w-[40px] h-[40px] rounded-full border-1 border-black  mdHalf:top-[50px] mdHalf:left-[55px] top-[25px] -z-5 transition-transform duration-300 ease-out"
                style={{ backgroundColor: ele.transpColor }}
              ></div>

              <div
                className={`circle mdHalf:group-hover:-translate-y-5   mdHalf:w-[80px] w-[50px]  mdHalf:h-[80px] h-[50px]  mdHalf:top-[40px] top-[20px] rounded-full border-2   flex justify-center items-center relative z-50 transition-all duration-300 ease-out `}
                style={
                  isHovered
                    ? { backgroundColor: "#fff", borderColor: "#fff" }
                    : { borderColor: ele.color }
                }
              >
                <div
                  className="mdHalf:w-[96px] mdHalf:h-[96px] w-[60px] h-[60px] block absolute rounded-[50%] transition-[opacity_0.3s_ease-out]  "
                  style={{
                    border: isHovered ? " 2px solid #fff" : "0",
                  }}
                />

                <div className="mdHalf:block hidden">
                  <Image
                    alt={ele.name}
                    src={ele.image}
                    width={40}
                    height={40}
                    className="z-50"
                  />
                </div>
                <div className="mdHalf:hidden block">
                  <Image
                    alt={ele.name}
                    src={ele.image}
                    width={20}
                    height={20}
                    className="z-50"
                  />
                </div>
              </div>

              <p className="text-[#666666] text-center mdHalf:bottom-8 bottom-[90px] mdHalf:font-thin  font-bold mdHalf:group-hover:-translate-y-7 absolute mdHalf:group-hover:invisible visible group-hover:transition group-hover:duration-700 mdHalf:text-[20px] text-[11px]  mt-[30px] z-10 transition-colors duration-300 ease-out hover:text-[#4C5656] ">
                {ele.name}
              </p>
              <p className="text-[#666666] mdHalf:text-[12px] text-[10px] absolute z-10 transition-all duration-500 text-center ease-out hover:text-[#4C5656] p-5 mdHalf:bottom-2 bottom-0 mdHalf:opacity-0 group-hover:opacity-100">
                {ele.desc}
              </p>

            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceCard;
