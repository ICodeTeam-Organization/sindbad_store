import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import { useState } from "react";
import { BiDockLeft, BiDownArrow, BiLeftArrow } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { FcDown, FcLeft } from "react-icons/fc";
import { GrDown } from "react-icons/gr";
import { RiArrowLeftLine } from "react-icons/ri";

const orderFrom = [
  {
    name: "السعودية",
    key: "SA",
  },
  {
    name: "اليمن",
    key: "YE",
    sub: [
      {
        name: "حضرموت",
        key: "YE-HAD",
      },
      {
        name: "صنعاء",
        key: "YE-SA",
      },
    ],
  },
  {
    name: "الإمارات",
    key: "UA",
  },
  {
    name: "مصر",
    key: "EJ",
  },
];

export default function DropDownMenuOrderFrom() {
  const [selectedCountry, setselectedCountry] = useState({
    name: "السعودية",
    key: "SA",
  });

  const onSelect = (item: { name: string; key: string }) => {
    setselectedCountry(item)
  };

  return (
    <div className="flex items-center gap-x-2 w-full">
      <h3 className="text-[13px]"> أطلب مــن </h3>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild className="">
          <div className="border p-1 rounded-sm px-3 flex gap-x-2 items-center mdHalf:bg-white">
            <p className=" text-[13px] "> {selectedCountry.name} </p>
            <GrDown size={10} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-[13px] z-[9999999]">
          <DropdownMenuGroup>
            {orderFrom.map((ele) =>
              ele.sub ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger
                    onClick={() => onSelect({ name: ele.name, key: ele.key })}
                    className={cn(
                      "flex items-center justify-between",
                      selectedCountry.key == ele.key && "bg-slate-100"
                    )}
                  >
                    <div className="flex w-full items-center justify-between ">
                      <span className="text-[13px]">{ele.name}</span>
                      <RiArrowLeftLine />
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {ele.sub.map((subEle) => (
                      <DropdownMenuItem
                        onClick={() =>
                          onSelect({ name: subEle.name, key: subEle.key })
                        }
                        className={cn(
                          selectedCountry.key == subEle.key && "bg-slate-100"
                        )}
                      >
                        <span className="text-[13px]">{subEle.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  className={cn(
                    selectedCountry.key == ele.key && "bg-slate-100"
                  )}
                  onClick={() => onSelect({ name: ele.name, key: ele.key })}
                >
                  <span className="text-[13px]">{ele.name}</span>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
