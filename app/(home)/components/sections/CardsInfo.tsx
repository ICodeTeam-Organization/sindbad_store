"use client"
 
import { useSpecialOrdersDialogsStore } from '@/app/stores_mangament/specialordersDialogsStore';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa';

function CardsInfo() {

    const {setWholeSalesOrderState} = useSpecialOrdersDialogsStore();

    const cards = [
        {
          title: "المحلات  والمراكز التجارية",
          desc: "مئات المحلات بالسعودية  وضعنا منتجاتها بين يديك",
          image: "/images/store_ic.svg",
          bgc: "#DCF1F4",
          more: "المزيد",
          href:"/stores",
          onClick:()=>{
            // router.push("/stores")
          }
        },
        {
          title: "المتاجر الإلكترونية",
          desc: "هناك المئات من المتاجر الالكترونية التي تقدم منتجات مختلف وباسعار منافسة .. كلها وضعناها بين يديك",
          image: "/images/EShop_ic.svg",
          bgc: "#FAE29B",
          more: "المزيد",
          href:"/e-commerce",
          onClick:()=>{
            // router.push("/e-commerce")
          }
        },
        {
          title: "أطلب بالجملة",
          desc: "نوفر لك ما تريد من كل الأصناف والمنتجات",
          image: "/images/track_ic.svg",
          bgc: "#DCEBFF",
          more: "أطلب الآن",
          // href:"/special-order?sh=1&tab=3",
          onClick:()=>{
            setWholeSalesOrderState(true)
          }
        },
      ];

  return (
    <div className="xlHalf:mt-52 mdHalf:mt-20 mt-10 p-4  flex items-center lg:justify-between justify-center xl:gap-14 lg:gap-6 mdHalf:gap-5 gap-4 xl:mx-12 lg:mx-4 mdHalf:mx-4 lg:flex-nowrap flex-wrap " >
    {cards.map((item,ix)=>(
      item.href ? 
      <Link key={ix} href={item.href} style={{backgroundColor:item.bgc}} className="bg-white cursor-pointer p-5  flex justify-between h-[160px] w-[400px] rounded-[10px] " >
       
         <div className="w-[60%] h-full flex-col flex justify-between" >
           <h1 className="font-bold mb-4 " > {item.title} </h1>
           <h3 className="text-[13px]" >{item.desc}</h3>
        </div>
        <div className="w-[40%] flex flex-col items-end mdHalf:px-3 justify-between" >
          <Image alt={item.title} src={item.image} width={60} height={60} />
          <div className="flex items-center  text-[#222222] mdHalf:text-xs text-xs" >
            <p className="" >
              {item.more}
            </p>
            <FaAngleLeft />
          </div>
        </div> 
       </Link>
      :
      <div key={ix} onClick={item.onClick} style={{backgroundColor:item.bgc}} className="bg-white cursor-pointer p-5 flex justify-between h-[160px] w-[400px] rounded-[10px] " >
         <div className="w-[60%] h-full flex-col flex justify-between" >
           <h1 className="font-bold mb-4 " > {item.title} </h1>
           <h3 className="text-[13px]" >{item.desc}</h3>
        </div>
        <div className="w-[40%] flex flex-col items-end mdHalf:px-3 justify-between" >
          <Image alt={item.title} src={item.image} width={60} height={60} />
          <div className="flex items-center  text-[#222222] mdHalf:text-xs text-xs" >
            <p className="" >
              {item.more}
            </p>
            <FaAngleLeft />
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default CardsInfo