import React from "react";

import Header from "../Header";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="relative -z-50">
        <Image
          src={"images/HeadBackground.svg"}
          width={2000}
          height={200}
          alt="hero-image"
          className="  object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
