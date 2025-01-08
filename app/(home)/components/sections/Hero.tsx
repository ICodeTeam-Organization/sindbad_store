import React from "react";

import Image from "next/image";
import HomeHeader from "../HomeHeader";

const Hero = () => {
  return (
    <div className="relative" >
      <div className="relative overflow-visible">
        <HomeHeader />
      </div>

      <div className="xl:container mx-auto"  style={{paddingTop: "116px"}} >
        <div className="absolute top-0 -z-50 xl:container mx-auto" style={{paddingTop: "116px"}}>
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

  );
};

export default Hero;
