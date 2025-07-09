"use client";
import React  from "react"; 
import specialrequist from "@/public/images/specialrequist.svg";
// import Stores from "@/public/images/Stores.svg";
import discounts from "@/public/images/discounts.svg";
import onlineStores from "@/public/images/onlineStores.svg";
import shoppingStore from "@/public/images/shoppingStore.svg";
// import wholesaleSection from "@/public/images/wholesaleSection.svg";
// import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore"; 
import RotatingText from "@/components/animations/RotatingText";
import HeroServiceCard from "./HeroServiceCard";
import HeroCardsFetures from "./HeroCardsFetures";

function Hero() {
   const { setSpecialOrderState } = useSpecialOrdersDialogsStore();
  const router = useRouter();
  const { status } = useSession();
  const isAuth = status === "authenticated";

  const openDialog = (type: "product" | "market") => {
    if (!isAuth) {
      toast({
        variant: "default",
        description: ` يجب عليك تسجيل الدخول اولاً `,
        action: (
          <ToastAction altText="Try again">
            <Link href="/auth" className="text-sm">
              تسجيل الدخول{" "}
            </Link>
          </ToastAction>
        ),
        duration: 2000,
      });
      return;
    }
    if (type == "product") {
      setSpecialOrderState(true, 1);
    } else if (type == "market") {
      setSpecialOrderState(true, 3);
    }
  };

  const cards = [
    {
      name: "طلب خاص",
      image: specialrequist,
      // href: "/special-order/",
      onClick: () => {
        openDialog("product");
      },
      color: "#1EAE98",
      transpColor: "#1EAE9826",
      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    {
      name: "طلب من متجر إلكتروني",
      image: onlineStores,
      // href: "/special-order?sh=1&tab=3",
      onClick: () => {
        openDialog("market");
      },
      color: "#F57C00",
      transpColor: "#F57C0050",
      desc: " كل المتاجر الإلكترونية وضعناها بين يديك بأسعار منافسة ..",
    },
    {
      name: "العروض",
      image: discounts,
      // href: "/shop?newProducts=true",
      onClick: () => {
        router.push("/shop?hasOffer=t");
      },
      color: "#CE2334",
      transpColor: "#CE233450",

      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    {
      name: "تسوق الآن ",
      image: shoppingStore,
      // href: "/shop/",
      onClick: () => {
        router.push("/shop/");
      },
      color: "#B2C1C0",
      transpColor: "#B2C1C026",
      desc: "اطلب ما تريد من السعودية ونحن نوصله لك الى عنوانك باليمن",
    },
    // { name: "المحلات", image: Stores, href: "/stores" },
    // { name: "قسم العاب", image: wholesaleSection, href: "/" },
    // { name: "قسم الجملة", image: wholesaleSection, href: "/" },
  ];


  const introTexts = [ 
    " بدون بطاقة ائتمان", 
    "تسوق اسهل",
    "شحن أسرع وأمن الى اليمن",
   ]


  return (
    <div className=" lg:container mx-auto ">
      <div className=' w-full bg-[url("/images/hero_images/bg_hero.svg")] relative overflow-hidden bg-cover bg-no-repeat bg-center 2lg:h-[550px] flex flex-col items-center justify-center sm:p-4 p-2   '>
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

         {/* INTRO  */}
        <div className="my-6 text-center z-0 mt-16 mb-0">
          <h2 className="text-white 2lg:text-2xl text-[16px] font-bold">
            وفرنا توصيل من السعودية ودول الخليج وبشكل اسهل{" "}
          </h2>
          <p className="text-white 2lg:text-xl   text-sm mt-3 flex gap-x-3  items-center justify-center max-2lg:flex-col  ">
            <span className="  text-end transition-all duration-500  font-bold    ">تسوّق الان بثقة مع خدماتنا{" "}</span>
            <span className="text-secondary font-bold   text-start   max-2lg:mt-2 ">
              <RotatingText
                texts={introTexts}
                mainClassName="inline transition-all duration-500"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025} 
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={5000}
              />
            </span>{" "}
          </p>
        </div>



        {/* CARDS AND VIDEO */}
    
     
<div className="flex items-center justify-center gap-6 mt-14 max-smHalf:flex-wrap  ">
            <HeroServiceCard
              {...cards[0]}
              transpColor={cards[0]?.transpColor}
            />
            <HeroServiceCard
              {...cards[2]}
              transpColor={cards[2]?.transpColor}
            />
            <HeroServiceCard
              {...cards[1]}
              transpColor={cards[2]?.transpColor}
            />
            <HeroServiceCard
              {...cards[3]}
              transpColor={cards[3]?.transpColor}
            />
          </div>


      </div>
      
        {/* MAIN SERVICES FETUREs */}

        <div>
            <HeroCardsFetures/>
        </div>
    </div>
  );
}

  //  <div className="grid grid-cols-1 2lg:grid-cols-11 gap-4 gap-y-2  mb-10">
  //         {/* الفيديو للشاشات الصغيرة - يأخذ كامل العرض */}
  //         <div className="col-span-full w-full 2lg:hidden">
  //           <div className="bg-white w-full rounded overflow-hidden flex">
  //             <ReactPlayer
  //               src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4"
  //               playing={false}
  //               controls={true}
  //               width="100%"
  //               height="auto"
  //               style={{ aspectRatio: "16/9" }}
  //               ref={playerRef}
  //             />
  //           </div>
  //         </div>

  //         {/* التنسيق الأصلي للشاشات الكبيرة */}
  //         <div className="hidden 2lg:flex col-span-2   justify-end ">
  //           <HeroServiceCard
  //             {...cards[0]}
  //             transpColor={cards[0]?.transpColor}
  //           />
  //         </div>

  //         <div className="hidden 2lg:flex justify-end col-span-2 col-start-1 row-start-3">
  //           <HeroServiceCard
  //             {...cards[1]}
  //             transpColor={cards[2]?.transpColor}
  //           />
  //         </div>

  //         <div className="hidden 2lg:flex col-span-7 row-span-4 col-start-3 items-center justify-center">
  //           <div className="bg-white h-[90%] w-full rounded overflow-hidden flex">
  //             <ReactPlayer
  //               src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4"
  //               playing={true}
  //               controls={true}
  //               width="100%"
  //               height="100%"
  //               className="aspect-video"
  //               ref={playerRef}
  //             />
  //           </div>
  //         </div>

  //         <div className="hidden 2lg:block col-span-2 col-start-10 row-start-1">
  //           <HeroServiceCard
  //             {...cards[2]}
  //             transpColor={cards[2]?.transpColor}
  //           />
  //         </div>

  //         <div className="hidden 2lg:block col-span-2 col-start-10 row-start-3">
  //           <HeroServiceCard
  //             {...cards[3]}
  //             transpColor={cards[3]?.transpColor}
  //           />
  //         </div>

  //         {/* كروت الخدمات للشاشات الصغيرة - أسفل الفيديو */}
  //         <div className="flex items-center justify-center gap-6 mt-14 max-smHalf:flex-wrap 2lg:hidden">
  //           <HeroServiceCard
  //             {...cards[0]}
  //             transpColor={cards[0]?.transpColor}
  //           />
  //           <HeroServiceCard
  //             {...cards[2]}
  //             transpColor={cards[2]?.transpColor}
  //           />
  //           <HeroServiceCard
  //             {...cards[1]}
  //             transpColor={cards[2]?.transpColor}
  //           />
  //           <HeroServiceCard
  //             {...cards[3]}
  //             transpColor={cards[3]?.transpColor}
  //           />
  //         </div>
  //       </div>

export default Hero