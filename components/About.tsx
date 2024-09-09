import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsSnapchat,
  BsTwitterX,
} from "react-icons/bs";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

const About = () => {
  return (
    <div className="container mx-auto pr-3  sm:px-4 md:px-8 lg:px16 xl:px-32   flex flex-col  lg:flex-row gap-4 lg:justify-evenly ">
      <div className="text-start">
        <h3 className="font-bold text-lg text-black mb-3">عن متجرنا</h3>
        <p className="md:max-w-96 xm:max-w-64 text-gray-500">
          متجر افاست من أفضل المتاجر التي تقوم ببيع المنتجات الرقمية و الماركات
          العالمية و باسعار مناسبة في متناول الجميع و ايضا يوجد هناك عدة عروض
          وخصومات كبيرة تسوق الان و اطلع على جميع العروضات.
        </p>
      </div>
      <div className="block md:flex md:justify-between">
        <div className="lg:text-start ">
          <h3 className="font-bold text-lg text-black mb-3">حسابي</h3>
          <ul>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" />
              حسابي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> طلباتي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> سلة
              المشتريات
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> المفضلة
            </li>
          </ul>
        </div>
        <div className="lg:text-start lg:mx-16">
          <h3 className="font-bold text-lg text-black mb-3">روابط مهمة</h3>
          <ul>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" />
              حسابي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> طلباتي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> سلة
              المشتريات
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> المفضلة
            </li>
          </ul>
        </div>
        <div className="lg:text-start">
          <h3 className="font-bold text-lg text-black mb-3">تواصل معنا</h3>
          <ul>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" />
              حسابي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> طلباتي
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> سلة
              المشتريات
            </li>
            <li className="w-fit flex items-center  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer ">
              <RiArrowLeftDoubleLine className="hidden lg:block" /> المفضلة
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:text-start">
        <h3 className="font-bold text-lg text-black mb-3">تابعنا على</h3>
        <div className="flex  lg:justify-start text-gray-600">
          <BsFacebook className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer ml-3" />
          <BsTwitterX className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer ml-3" />
          <BsInstagram className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer ml-3" />
          <BsSnapchat className="hover:text-orange-400 text-gray-500 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default About;
