import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

interface MenuItem {
  title: string;
  icon: ReactNode;
  onclickFun?: () => void;
  isLogout?: boolean;
  invisible?: boolean;
  href?: string;
}

// using group class to show when hover
const DropdownMenu: React.FC<{ menu: MenuItem[]; dir: "left" | "right" }> = ({
  menu,
  dir = "right",
}) => {
  const direction = dir == "left" ? "left-0 " : "right-0";

  return (
    <ul
      role="menu"
      className={cn(
        "mdHalf:absolute mdHalf:opacity-0 mdHalf:invisible  group-hover:visible group-hover:opacity-100 transition-all top-12 z-[999999] mdHalf:min-w-[180px] mdHalf:w-auto w-full  overflow-auto rounded-lg mdHalf:border border-slate-200 bg-white p-1.5 mdHalf:shadow-lg focus:outline-none ",
        direction
      )}
    >
      {menu.map((item, index) =>
        item.invisible ? (
          <></>
        ) : (
          <React.Fragment key={index}>
            {item.isLogout && (
              <hr className="my-2 border-slate-200" role="presentation" />
            )}
            {item.href ? (
              <Link
                href={item?.href}
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-3 transition-all hover:bg-[#FF8F7E22]"
                onClick={item.onclickFun}
              >
                {item.icon}
                <p className="text-slate-800  ml-2 whitespace-nowrap  text-[12px]">
                  {item.title}
                </p>
              </Link>
            ) : (
              <li
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-3 transition-all hover:bg-[#FF8F7E22]"
                onClick={item?.onclickFun}
              >
                {item.icon}
                <p className="text-slate-800  ml-2 whitespace-nowrap  text-[12px]">
                  {item.title}
                </p>
              </li>
            )}
          </React.Fragment>
        )
      )}
    </ul>
  );
};

export default DropdownMenu;
