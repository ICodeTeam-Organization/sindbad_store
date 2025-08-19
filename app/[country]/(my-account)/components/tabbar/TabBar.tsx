"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { IoNotifications } from "react-icons/io5"
import { MdShoppingBag } from "react-icons/md"
import { RiVipCrownFill } from "react-icons/ri"
import { IoLocationSharp } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import { Tabs,   TabsList,   } from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
 
const sidebarItems = [
  {
    name: "الإشعارات",
    icon: IoNotifications,
    href: "/my-notifications",
    alt: "الإشعارات",
  },
  {
    name: "طلباتي",
    icon: MdShoppingBag,
    href: "/my-orders",
    alt: "طلباتي",
  },
  {
    name: "طلباتي الخاصة",
    icon: RiVipCrownFill,
    href: "/my-special-orders",
    alt: "الطلبات الخاصة",
  },
  {
    name: "عناويني",
    icon: IoLocationSharp,
    href: "/user-addresses",
    alt: "العناوين",
  },
  {
    name: "حسابي",
    icon: FaUser,
    href: "/profile",
    alt: "بيانات المستخدم",
  },
]

export function TabBar() {

  const pathname = usePathname();
  const itemsWithActive = sidebarItems.map((item) => ({
    ...item,
    isActive: pathname === item.href,
  }))


  return (
     <div   className="w-full sticky top-0 z-10   bg-white shadow-sm rounded-md flex  ">
      <Tabs className="w-full">
        <TabsList
          className=" w-full flex items-center mdHalf:justify-center overflow-x-auto "  
        >
          {itemsWithActive.map((item,x) => ( 
              <Link href={item.href} key={item.name+x} className={cn(
                "flex items-center justify-center p-4 gap-x-3 whitespace-nowrap text-gray-500 max-mdHalf:text-sm ",
                item.isActive && "text-secondary border-b-2 border-secondary"
              )}>
                <item.icon />
                {item.name}
              </Link>  
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
