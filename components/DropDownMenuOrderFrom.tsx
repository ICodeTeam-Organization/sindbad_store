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
import { useState } from "react";

import { GrDown } from "react-icons/gr";
import { RiArrowLeftLine } from "react-icons/ri";
import { Alert } from "./Alert";


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
      {
        name: "عدن",
        key: "YE-ADN",
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


  const [
    selectedCountry, 
    // setselectedCountry
  ] = useState({
    name: "السعودية",
    key: "SA",
  });
  const [openAlert, setOpenAlert] = useState(false)

  const onSelect = (item: { name: string; key: string }) => {
    if (item.key != selectedCountry.key) {
      // toast({
      //   variant: "destructive",
      //   description: `سيتم إضافة هذي المناطق قريبا`,
      // });
      setOpenAlert(true)
    }
    // setselectedCountry(item)
  };

  

  return (
    <div className="flex items-center gap-x-2 w-full">
      <Alert open={openAlert} onClose={setOpenAlert} />
      <h3 className="text-[13px]"> أطلب مــن </h3>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="border p-1 rounded-sm px-3 flex gap-x-2 items-center mdHalf:bg-white">
            <p className=" text-[13px] "> {selectedCountry.name} </p>
            <GrDown size={10} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-[13px] z-[9999999] cursor-pointer">
          <DropdownMenuGroup>
            {orderFrom.map((ele) =>
              ele.sub ? (
                <DropdownMenuSub key={ele.name}>
                  <DropdownMenuSubTrigger
                    onClick={() => onSelect({ name: ele.name, key: ele.key })}
                    className={cn(
                      "flex items-center justify-between cursor-pointer",
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
                        key={subEle.key}
                        onClick={() =>
                          onSelect({ name: subEle.name, key: subEle.key })
                        }
                        className={cn(
                          "cursor-pointer",
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
                  key={ele.name}
                  className={cn(
                    "cursor-pointer",
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
