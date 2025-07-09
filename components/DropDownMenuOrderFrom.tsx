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
import Cookies from "js-cookie";
import { GrDown } from "react-icons/gr";
import { RiArrowLeftLine } from "react-icons/ri";
import { Alert } from "./Alert";
import LoadingAlert from "./LoadingAlert";

const orderFrom = [
  {
    name: "السعودية",
    key: "1",
  },
  {
    name: "اليمن",
    key: "3",
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
    key: "2",
  },
  {
    name: "مصر",
    key: "4",
  },
];

interface PropsType {
  defaultCountry: string;
}

export default function DropDownMenuOrderFrom({ defaultCountry }: PropsType) {
  const [selectedCountry] = useState(
    orderFrom.find((e) => e.key == defaultCountry) ?? {
      name: "السعودية",
      key: "1",
    }
  );
  const [openAlert, setOpenAlert] = useState(false);
  const [changeCountryLoader, setchangeCountryLoader] = useState(false)

  const onSelect = (item: { name: string; key: string }) => {
    if (["1", "2"].includes(item.key)) {
      setchangeCountryLoader(true)
      Cookies.remove("country");
      Cookies.set("country", item?.key, {
        path:'/', sameSite:"Lax"
      });
      window.location.replace("/");
    } else {
      setOpenAlert(true);
    }
    // setselectedCountry(item)
  };

  // useEffect(() => {
  //   (async () => {
  //     const country = await getCookie("country");
  //     if (country) {
  //       const countryDefault = orderFrom.find((e) => e.key == country);
  //       setselectedCountry({
  //         name: countryDefault?.name ?? orderFrom[0]?.name,
  //         key: countryDefault?.key ?? orderFrom[0]?.key,
  //       });
  //     }
  //   })();
  // }, []);

  return (
    <div className="flex items-center gap-x-2 w-full ">
      <LoadingAlert open={changeCountryLoader} placeholder="جاري تغيير المنطقة"  />
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
