import Link from "next/link";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsSnapchat,
  BsTwitterX,
} from "react-icons/bs";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

const About = () => {

  const myAccount = [
    { title: "حسابي", href: "/account" },
    { title: "طلباتي", href: "/orders" },
    { title: "سلة المشتريات", href: "/shopping-card" },
    { title: "المفضلة", href: "/Favorites" }
  ] as const;

  const importantLinks = [
    { title: "من نحن", href: "/about" },
    { title: "سياسة الخصوصية", href: "/orders" },
    { title: "الشروط والأحكام", href: "/shopping-card" },
    { title: "الدعم الفني", href: "/Favorites" }
  ]as const;

  const contactWithUs = [
    { title: "واتساب", body: "00969000000000" },
    { title: "موبايل", body: "00969784545454" },
    { title: "البريد", body: "info@sendbad.com" },
  ]as const;
  
  const socialIcons = [
    { icon: <BsFacebook />, href: "https://facebook.com" },
    { icon: <BsTwitterX />, href: "https://twitter.com" },
    { icon: <BsInstagram />, href: "https://instagram.com" },
    { icon: <BsSnapchat />, href: "https://snapchat.com" }
  ];

  return (
    <div className="bg-[#F8F8F8] pt-10" >
      <div className="container mx-auto pr-3 my-10 sm:px-4 md:px-8 lg:px16 xl:px-32   flex flex-col  lg:flex-row gap-4 lg:justify-evenly  ">
      <div className="text-start">
        <h3 className="font-bold text-lg text-black mb-3">عن متجرنا</h3>
        <p className="md:max-w-96 xm:max-w-64 text-gray-500">
          متجر سندباد من أفضل المتاجر التي تقوم ببيع المنتجات الرقمية و الماركات
          العالمية و باسعار مناسبة في متناول الجميع و ايضا يوجد هناك عدة عروض
          وخصومات كبيرة تسوق الان و اطلع على جميع العروضات.
        </p>
      </div>
      <div className="block md:flex md:justify-between">
        <div className="lg:text-start ">
          <h3 className="font-bold text-lg text-black mb-3">حسابي</h3>
          <ul>
              {myAccount.map((ele,ix)=>(
                <Link href={ele.href} key={ix} className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
                <RiArrowLeftDoubleLine className="hidden lg:block" />
                {ele.title}
              </Link>
              ))}            
          </ul>
        </div>
        <div className="lg:text-start lg:mx-16">
          <h3 className="font-bold text-lg text-black mb-3">روابط مهمة</h3>
          <ul>
          {importantLinks.map((ele,ix)=>(
                <Link href={ele.href} key={ix} className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
                <RiArrowLeftDoubleLine className="hidden lg:block" />
                {ele.title}
              </Link>
              ))} 
          </ul>
        </div>
        <div className="lg:text-start">
          <h3 className="font-bold text-lg text-black mb-3">تواصل معنا</h3>
          <ul>
          {contactWithUs.map((ele,ix)=>(
                <li  key={ix} className="w-fit  mb-2 text-gray-500  cursor-pointer ">
                  <div className="w-fit flex items-center  lg:justify-start  text-gray-500  cursor-pointer " >
                  <RiArrowLeftDoubleLine className="hidden lg:block" />
                  {ele.title}
                  </div>
                <p>{ele.body}</p>
              </li>
              ))} 
          </ul>
        </div>
      </div>
      <div className="lg:text-start">
        <h3 className="font-bold text-lg text-black mb-3">تابعنا على</h3>
        <div className="flex  lg:justify-start text-gray-600">
        {socialIcons.map((item, index) => (
              <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                <div className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer ml-3 border p-2 rounded-full hover:border-primary-background duration-300">
                  {item.icon}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
