import React from "react";

import Header from "../Header";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <div>
        <Image
          src={"images/sndbad.svg"}
          width={1000}
          height={500}
          alt="hero-image"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
