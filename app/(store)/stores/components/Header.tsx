"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import { AiOutlineUser, AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { PiShoppingCartSimple } from "react-icons/pi";
import SearchFilter from './SearchFilter';
import Separator from './Separator';
import Logo from '../../../app/../public/images/logo.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref to get the position of the menu icon

  return (
    <>
      <header className="w-full bg-gradient-to-r from-red-100 via-pink-200 to-orange-100 p-4 relative">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image src={Logo} alt="Logo" width={120} height={70} className="rounded-md" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Shopping Cart Icon */}
            <div className="relative cursor-pointer">
              <PiShoppingCartSimple className="w-8 h-8 md:w-12 md:h-12" />
              <span className="absolute top-0 right-0 text-xs bg-white text-blue-400 border border-blue-400 rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </div>

            {/* Wishlist Icon */}
            <AiOutlineHeart className="hidden md:block cursor-pointer w-8 h-8 md:w-12 md:h-12" />

            {/* User Icon */}
            <AiOutlineUser className="hidden md:block cursor-pointer w-8 h-8 md:w-12 md:h-12" />

            {/* Menu Icon for mobile */}
            <div ref={menuRef} className="relative">
              {isMenuOpen ? (
                <AiOutlineClose 
                  className="w-6 h-6 cursor-pointer" 
                  onClick={() => setIsMenuOpen(false)} 
                />
              ) : (
                <AiOutlineMenu 
                  className="w-6 h-6 md:hidden cursor-pointer" 
                  onClick={() => setIsMenuOpen(true)} 
                />
              )}

              {/* Mobile Menu Dropdown */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-4 z-50"
                  style={{ top: '100%', right: 0 }}
                >
                  <AiOutlineHeart className="cursor-pointer w-8 h-8 mb-2" />
                  <AiOutlineUser className="cursor-pointer w-8 h-8" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Curved Background */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-r from-red-100 via-pink-200 to-orange-100 rounded-full" />
      </header>

      <SearchFilter />
      <Separator />
    </>
  );
}
