import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface MenuItem {
    title: string;
    icon: ReactNode; 
    onclickFun: () => void; 
    isLogout?: boolean; 
    invisible?:boolean;
}

// using group class to show when hover
const DropdownMenu: React.FC<{ menu: MenuItem[] , dir:"left"|"right" }> = ({ menu , dir="right"}) => {

    const direction = dir == "left" ? "left-0 " : "right-0" 

    return (
        <ul
            role="menu"
            className={cn("absolute opacity-0 invisible  group-hover:visible group-hover:opacity-100 transition-all top-12 z-[999999] min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none ",direction )}
        >
            {menu.map((item, index) => (
               item.invisible 
               ? <></>
               : <React.Fragment key={index}>
                    {item.isLogout && <hr className="my-2 border-slate-200" role="presentation" />}
                    <li
                        role="menuitem"
                        className="cursor-pointer text-slate-800 flex w-full gap-x-2 text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onClick={item.onclickFun}
                    >
                        {item.icon}
                        <p className="text-slate-800 font-medium ml-2 whitespace-nowrap ">{item.title}</p>
                    </li>
                </React.Fragment>
              
            ))}
        </ul>
    );
};

export default DropdownMenu;