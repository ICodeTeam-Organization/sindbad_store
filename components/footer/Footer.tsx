import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsSnapchat,
  BsTwitterX,
} from "react-icons/bs";
import { FaChevronLeft, FaPhone } from "react-icons/fa";
import FooterServicesSection from "./FooterServicesSection";
 
function Footer() {
  const aboutSindbad = [
    { title: "عن متجر سندباد", href: "/account" },
    { title: "ماهو الطلب الخاص", href: "/orders" },
    { title: "الأسئلة الشائعة", href: "/shopping-card" },
    // { title: "المفضلة", href: "/Favorites" },
  ] as const;

  // const servicesLinks = [
  //   { title: "طلب خاص", href: "/about" },
  //   { title: "العروض", href: "/orders" },
  //   { title: "المحلات التجارية", href: "/shopping-card" },
  //   { title: "متاجر الكترونية", href: "/Favorites" },
  // ] as const;

  const sindbadPrivcy = [
    { title: "الشروط والأحكام", href: "/privacy#terms" },
    { title: "سياسات والخصوصية", href: "/privacy#privacy" },
    { title: "سياسات الستبدال والاستراجاع", href: "privacy#return-policy" },
    { title: "سياسات اتفاقية المستخدم", href: "/privacy#user-agreement" },
  ] as const;

  const socialIcons = [
    { icon: <BsFacebook />, href: "https://facebook.com" },
    { icon: <BsTwitterX />, href: "https://twitter.com" },
    { icon: <BsInstagram />, href: "https://instagram.com" },
    { icon: <BsSnapchat />, href: "https://snapchat.com" },
  ];

  const contactsNumbers = [
    { name: "محافظة حضرموت", number: "(967) 777-555-111" },
    { name: "محافظة الغيظة", number: "(967) 777-555-111" },
    { name: "محافظة عدن", number: "(967) 777-555-111" },
    { name: "محافظة شبوة", number: "(967) 777-555-111" },
  ];

  return (
    <div className=" bg-white z-10 relative">
     

      {/* about */}
      <div className="bg-[url('/images/footer_images/footer_bg.svg')] bg-cover bg-no-repeat  w-full">
        <div className="container pt-6 mx-auto pr-3  sm:px-4 md:px-8   flex flex-col  xl:flex-row gap-4 xl:justify-evenly  ">
          <div className="text-start">
            <h3 className="font-bold text-lg text-black mb-3 flex items-center ">
              <Image
                alt="sendbad"
                src="/images/sedebadLogo.svg"
                width={150}
                height={40}
              />
            </h3>
            <p className="md:max-w-96 xm:max-w-64 text-gray-500">
              متجر سندباد هو أول وأكبر منصة تسوق إلكترونية في اليمن والتي تضم
              آلاف المنتجات والمحلت التي تلبي احتياجك لتحصل عليها بسهولة من
              السعودية والإمارات و دول اخرى وبتوصيل إلى مناطق اليمن
            </p>
          </div>
          <div className="block md:flex md:justify-between mt-16">
            <div className="lg:text-start ">
              <h3 className="font-bold text-lg text-black mb-3">
                عن متجر سندبات
              </h3>
              <ul>
                {aboutSindbad.map((ele, ix) => (
                  <Link
                    href={ele.href}
                    key={ix}
                    className="w-fit flex items-center gap-x-2  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer "
                  >
                    <FaChevronLeft
                      className="hidden lg:block text-primary-background"
                      size={12}
                    />
                    <span>{ele.title}</span>
                  </Link>
                ))}
              </ul>
            </div>
            
            <FooterServicesSection/>

            <div className="lg:text-start">
              <h3 className="font-bold text-lg text-black mb-3">
                سياسات سندباد
              </h3>
              <ul>
                {sindbadPrivcy.map((ele, ix) => (
                  <Link
                    href={ele.href}
                    key={ix}
                    className="w-fit flex items-center gap-x-2  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer "
                  >
                    <FaChevronLeft
                      className="hidden lg:block text-primary-background"
                      size={12}
                    />
                    <span>{ele.title}</span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="font-bold text-lg text-black mb-3 text-center">تابعنا على</h3>
            <div className="flex items-center justify-center text-gray-600">
              {socialIcons.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer ml-3 border p-2 rounded-full hover:border-primary-background duration-300">
                    {item.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="container pt-6 mx-auto pr-3  sm:px-4 md:px-8 flex flex-col  lg:flex-row lg:items-end items-center gap-y-10 mdHalf:gap-4 lg:justify-evenly flex-wrap ">
          {/* contact with us */}
          <div className="text-center ">
            <h2 className="font-bold"> تواصل معنا </h2>
            <p className="text-xs mt-1 mb-3"> خط دولي اتصال - واتساب </p>
            <div className="bg-secondary rounded-full text-white flex items-center justify-around">
              <div className="bg-primary w-[40px] h-[40px] mr-[-1px] p-1 border-4 border-[#fff] items-center justify-center flex rounded-full">
                <Image
                  alt="paper_plane"
                  src="/images/footer_images/paper_plane_ic.svg"
                  className="mt-[1px] mr-[1px] p-1"
                  width={30}
                  height={30}
                />
              </div>
              <span className="px-6">+967 730 505 505</span>
            </div>
          </div>

          {/* contact numbers */}
          <div className="flex items-center justify-between gap-10 my-10 flex-wrap">
            {contactsNumbers.map((ele) => (
              <div key={ele.name} className="flex justify-between items-center gap-x-3">
                <div className="text-white bg-primary p-3 rounded-full w-fit">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs font-bold" >{ele.name}</p>
                  <p className="text-sm font-bold" >{ele.number}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-col items-center justify-center">
            <h1 className="font-bold "> حمل التطبيق الآن </h1>
            <div className="mt-5 flex flex-col items-center justify-center gap-y-2">
              <Image
                alt="google_play"
                src="/images/footer_images/google_play_ic.svg"
                width={120}
                height={25}
              />
              <Image
                alt="apple store"
                src="/images/footer_images/apple_store_ic.svg"
                width={120}
                height={25}
              />
            </div>
          </div>


        </div>
         <div className="bg-secondary mb-10 " >
       <div className="container mx-auto" >
       <div className="p-4 mt-16 flex justify-between items-center mdHalf:flex-row flex-col-reverse gap-y-5">
        <p className="text-white text-sm" >الحقوق محفوظة لمنصة سندباد © 2024</p>
        <div className="flex items-center justify-between  gap-x-8 mdHalf:flex-row flex-col-reverse gap-y-5" >
            <div className="flex items-center justify-center gap-x-2" >
              <Image alt="c" src="/images/taxNumber.svg" width={25} height={25} />
              <p className="text-white text-sm" >
                <span>الرقم الضريبي : </span>
                <span>5094651530</span>
              </p>
            </div>
             <div className="flex items-center justify-center gap-x-2" >
              <p className="text-white text-sm font-bold" >
                خدمات الدفع
              </p>
              <div className="flex items-center justify-center gap-x-1" >
                <Image alt="c" src="/images/footer_images/dwal_ic.svg" width={25} height={25} className="rounded-full" />
                <Image alt="c" src="/images/footer_images/qtp_ic.svg" width={25} height={25} className="rounded-full" />
                <Image alt="c" src="/images/footer_images/bcr_ic.svg" width={25} height={25} className="rounded-full" />
                <Image alt="c" src="/images/footer_images/omg_ic.svg" width={25} height={25} className="rounded-full" />
              </div> 
              
            </div>
        </div>
      </div>
      </div>
    </div>
      </div>

      {/* payments and copy rights */}

   
    </div>
  );
}

export default Footer;
