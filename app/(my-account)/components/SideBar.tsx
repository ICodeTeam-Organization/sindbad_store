"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = ({
  user,
}: {
  user?: { fullName: string; email: string };
}) => {
  const pathname = usePathname();
 
  

  const sidebarItems = [
    {
      name: "الإشعارات",
      icon: "/images/MyAccountImages/notifications.svg",
      href: "/my-notifications",
      isActive: pathname.includes("/my-notifications"),
      alt: "الإشعارات",
    },
    {
      name: "طلباتي",
      icon: "/images/MyAccountImages/my-orders.svg",
      href: "/my-orders",
      isActive: pathname.includes("/my-orders"),
      alt: "طلباتي",
    },
    {
      name: "طلباتي الخاصة",
      icon: "/images/MyAccountImages/my-special-orders.svg",
      href: "/my-special-orders",
      isActive: pathname.includes("/my-special-orders"),
      alt: "الطلبات الخاصة",
    },
    {
      name: "عناويني",
      icon: "/images/MyAccountImages/my-address.svg",
      href: "/user-addresses",
      isActive: pathname.includes("/user-addresses"),
      alt: "العناوين",
    },
    {
      name: "بيانات المستخدم",
      icon: "/images/MyAccountImages/user-data.svg",
      href: "/profile",
      isActive: pathname.includes("/profile"),
      alt: "بيانات المستخدم",
    },
  ];

  return (
    <aside>
      <div className=" py-8">
        <div className="mb-10 px-4">
          <Link
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <div className="flex flex-row items-center gap-2">
              <Image
                src="/images/MyAccountImages/user-circle.svg"
                alt="user"
                width={34}
                height={34}
              />
              <div className="flex flex-col text-xs">
                <p>{user?.fullName}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </Link>
        </div>
        <ul className="space-y-4 font-medium tajawal">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-2 py-3 text-gray-900  hover:bg-gray-100 group ",
                  item.isActive && " border-l-[2.5px]  border-gray-900  " // for active
                )}
              >
                <div className="flex flex-row items-center gap-4 px-4">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={24}
                    height={24}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
