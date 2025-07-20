import WhatIsSpecialProduct from "./sections/WhatIsSpecialProduct";
import AboutSindbad from "./sections/AboutSindbad";
import FAQs from "./sections/FAQs";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16 text-gray-800  relative  ">
      <div className="fixed top-20 right-20 inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none bg-[url('/images/bg_about_page.svg')]" />
      <AboutSindbad/> 
      <WhatIsSpecialProduct  />
      <FAQs/>
    </div>
  );
}

