"use client";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

function FooterServicesSection() {
  const { setShowSpecialOrderDialog } = useSpecialOrdersDialogsStore();

  const servicesLinks = [
    {
      title: "طلب خاص",
      click: () => {
        setShowSpecialOrderDialog(true);
      },
      href: "",
    },
    { title: "العروض", href: "/shop?hasOffer=t", click: () => {} },
    { title: "المحلات التجارية", href: "/stores", click: () => {} },
    { title: "متاجر الكترونية", href: "/e-commerce", click: () => {} },
  ] as const;

  return (
    <div className="lg:text-start lg:mx-16">
      <h3 className="font-bold text-lg text-black mb-3">خدمات</h3>
      <ul>
        {servicesLinks.map((ele, ix) =>
          ele.href != "" ? (
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
          ) : (
            <div
              onClick={ele.click}
              key={ix}
              className="w-fit flex items-center gap-x-2  lg:justify-start mb-2 text-gray-500 hover:text-orange-400 cursor-pointer "
            >
              <FaChevronLeft
                className="hidden lg:block text-primary-background"
                size={12}
              />
              <span>{ele.title}</span>
            </div>
          )
        )}
      </ul>
    </div>
  );
}

export default FooterServicesSection;
