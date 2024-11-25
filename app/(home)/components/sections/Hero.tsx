import React from "react";

import Image from "next/image";
import Header from "../Header";

const Hero = () => {
  return (
    <div className="relative" >
      <div className="relative overflow-visible">
        <Header />
      </div>

      <div className="xl:container mx-auto" >
      <div className="absolute top-0 -z-50 xl:container mx-auto">
        <Image
          src={"images/sndbadBG.svg"}
          width={2000}
          height={200}
          alt="hero-image"
          className="object-contain "
        />
      </div>
      </div>

      
    </div>

  );
};

export default Hero;
