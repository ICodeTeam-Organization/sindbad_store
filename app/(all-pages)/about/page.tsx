import WhatIsSpecialProduct from "./sections/WhatIsSpecialProduct";
import AboutSindbad from "./sections/AboutSindbad";
import FAQs from "./sections/FAQs";
import AboutSidebar from "./components/AboutSidebar";

export default function AboutPage() {


  return (
    <div className="xl:container mx-auto flex py-12">
      <div className="w-[20%] max-2lg:hidden ">
        <AboutSidebar />
      </div>
      <div className=" flex-1  mx-auto px-4   text-gray-800 relative  ">
        {/* خلفية */}
        <div className="fixed top-20 right-20 inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none bg-[url('/images/bg_about_page.svg')]" />
        <AboutSindbad />
        <WhatIsSpecialProduct />
        <FAQs />
      </div>
    </div>
  );
}
