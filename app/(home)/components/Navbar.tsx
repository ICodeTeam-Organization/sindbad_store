"use client";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  let [Nav, setNav] = useState(false);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div>
          <button>
            {Nav ? (
              <AiOutlineClose onClick={() => setNav((nav) => !nav)} size={35} />
            ) : (
              <BiMenu onClick={() => setNav((nav) => !nav)} size={35} />
            )}
          </button>
        </div>
        {Nav ? (
          <nav className="w-24 absolute bg-slate-600 transition-all duration-1000">
            <Link className=" block" href={""}>
              الصفحة الرئيسية
            </Link>
            <Link className=" block" href={""}>
              حولنا
            </Link>
            <Link className=" block" href={""}>
              تواصل معنا
            </Link>
          </nav>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
