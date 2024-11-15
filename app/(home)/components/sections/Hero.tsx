import React from "react";

import Image from "next/image";
import Header from "../Header";

const Hero = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Header />
      </div>

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
