"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const sidebarItems = [
    {
      name: "الإشعارات",
      icon: "/images/MyAccountImages/notifications.svg",
      href: "/my-notifications",
      alt: "الإشعارات",
    },
    {
      name: "طلباتي",
      icon: "/images/MyAccountImages/my-orders.svg",
      href: "/my-orders",
      alt: "طلباتي",
    },
    {
      name: "طلباتي الخاصة",
      icon: "/images/MyAccountImages/my-special-orders.svg",
      href: "/my-special-orders",
      alt: "الطلبات الخاصة",
    },
    {
      name: "عناويني",
      icon: "/images/MyAccountImages/my-address.svg",
      href: "/user-addresses",
      alt: "العناوين",
    },
    {
      name: "بيانات المستخدم",
      icon: "/images/MyAccountImages/user-data.svg",
      href: "/user-data",
      alt: "بيانات المستخدم",
    },
  ];

  return (
    <>
      {/* Menu/Close Icon */}
      <button
        onClick={toggleSidebar}
        className="absolute top-28 right-2 z-50 p-2 md:hidden"
        aria-label="Toggle Sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`absolute top-[110px] right-0 z-40 w-64  shadow-lg transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="px-3 py-8">
          <div className="mb-10">
            <a
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
                <div className="flex flex-col">
                  <p>سالم علي بافضل</p>
                  <p>m.williams@example.com</p>
                </div>
              </div>
            </a>
          </div>
          <ul className="space-y-8 font-medium">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  onClick={closeSidebar}
                >
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={24}
                      height={24}
                    />
                    <span>{item.name}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </>
  );
};

export default SideBar;
