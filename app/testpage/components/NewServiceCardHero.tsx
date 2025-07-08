"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
 

type PropsType = {
  name: string;
  image: string; // or `StaticImageData` if you're using `next/image`
  // href?: string;
  onClick: () => void;
  color: string;
  transpColor: string;
  desc: string;
};

function NewServiceCardHero(ele: PropsType) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group "
    >
      <div
        onClick={ele.onClick}
        className={cn(
          "card    cursor-pointer education mdHalf:w-[170px] mdHalf:h-[220px] w-[140px] h-[200px]  bg-white rounded-xl overflow-hidden flex flex-col  items-center relative  transition-all duration-300 ease-out text-decoration-none hover:translate-y-[-5px]  "
        )}
        style={{
          boxShadow:
            isHovered && ele?.transpColor
              ? `0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px ${ele.transpColor}`
              : `0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px rgba(0, 0, 0, 0.11)`,
        }}
      >
        <div
          className={cn(
            "overlay  absolute mdHalf:w-[60px] mdHalf:h-[60px]  w-[40px] h-[40px] rounded-full border-1 border-black  mdHalf:top-[50px] mdHalf:left-[55px] top-[25px] -z-5 transition-transform duration-300 ease-out",
             isHovered &&  `scale-[20] `
          )}
          style={{ backgroundColor: ele.transpColor }}
        ></div>

        <div
          className={`circle mdHalf:group-hover:-translate-y-5   mdHalf:w-[80px] mdHalf:h-[80px]  w-[50px] h-[50px]  mdHalf:top-[40px] top-[20px] rounded-full border-2   flex justify-center items-center relative z-[40] transition-all duration-300 ease-out `}
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
      </div>
    </div>
  );
}

export default NewServiceCardHero;
