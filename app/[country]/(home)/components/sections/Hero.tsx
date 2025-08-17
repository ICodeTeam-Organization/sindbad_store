import React from "react";

import Image from "next/image";
import MainHeader from "@/components/MainHeader/MainHeader";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { getCookie } from "@/lib/coockie-utls";

const Hero = async () => {

  const session = await getServerSession(authOption);
  const defaultCountry = getCookie("country");

  return (
    <>
      <div className="sticky top-0 z-[50]">
        <div className="relative overflow-visible ">
          {/* <HomeHeader /> */}
          <MainHeader isHomePage isAuth={!!session} defaultCountry={defaultCountry??"1"} />
        </div>
      </div>
      <div className="relative">
        <div className="xl:container mx-auto">
          <div className="absolute mdHalf:top-0 -top-10 -z-50 xl:container mx-auto">
            <Image
              src={"/images/sndbadBG.svg"}
              width={2000}
              height={200}
              alt="hero-image"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
