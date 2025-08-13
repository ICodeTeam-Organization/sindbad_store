"use client"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselItems = [
  {
    id: 1,
    title: "سندباد يوصلك لين بيتك",
    subtitle: "بكل دقة وأمان.",
    discount: "خصومات مذهلة حتى 70%",
    image: "/placeholder-veqhb.png",
    bgGradient: "from-orange-800 to-orange-900",
  },
  {
    id: 2,
    title: "سندباد حتى باب الدار",
    subtitle: "راحتك أولويتنا.",
    discount: "عروض حصرية يوميًا",
    image: "/placeholder-4dbhq.png",
    bgGradient: "from-blue-800 to-blue-900",
  },
  {
    id: 3,
    title: "كل العروض في مكان واحد",
    subtitle: "من الإلكترونيات إلى البقالة.",
    discount: "وفر حتى 50%",
    image: "/placeholder-2zcub.png",
    bgGradient: "from-green-800 to-green-900",
  },
  {
    id: 4,
    title: "رحلة تسوق ممتعة مع سندباد",
    subtitle: "توصيل سريع وأسعار منافسة.",
    discount: "هدايا وعروض خاصة",
    image: "/fitness-tracker-heart-rate.png",
    bgGradient: "from-purple-800 to-purple-900",
  },
]


function CustomPrevArrow(props: any) {
  const { onClick } = props
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-4 top-1/2 rounded-full  -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg z-20 w-10 h-10"
      onClick={onClick}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

function CustomNextArrow(props: any) {
  const { onClick } = props
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute   right-4 top-1/2 rounded-full  -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg z-20 w-10 h-10"
      onClick={onClick}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

export default function AdsCarousel({   }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: ( ) => (
      <button className="w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300 focus:bg-slate-800 focus:scale-110" />
    ),
    dotsClass: "slick-dots !flex !justify-center !mt-6 !space-x-2",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className="relative w-full md:my-8 my-4  ">
      <div className="">
        <Slider {...settings} className="h-full  ">
          {carouselItems.map((item) => (
            <div key={item.id} className="h-full md:aspect-[24/6]  sm:aspect-[24/8] aspect-[24/10]">
              <div className="relative overflow-hidden rounded-md shadow-2xl h-full flex" dir="rtl">
                <div
                  className={`bg-gradient-to-r ${item.bgGradient} flex-1 flex items-center justify-between relative px-4 sm:px-8 text-center lg:px-12`}
                >
                  {/* Background decorative elements */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex space-x-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 rounded-full"></div>
                    ))}
                  </div>

                  {/* Decorative circles - responsive sizing */}
                  <div className="absolute top-4 right-16 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-4 sm:bottom-8 right-20 sm:right-32 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-white/10 rounded-full"></div>

                  {/* Content - responsive layout */}
                  <div className="flex-1 text-white z-10 pr-4 space-y-4">
                    <p className="text-sm sm:text-base lg:text-2xl font-medium mb-1 sm:mb-2 opacity-90 leading-tight">
                      {item.title}
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
                      {item.subtitle}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{item.discount}</p>
                  </div>

                  {/* Watch Image - responsive sizing */}
                  {/* <div className="flex-shrink-0">
                    <img
                      src={images[0]}
                      alt="Smart Watch"
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain drop-shadow-2xl"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
