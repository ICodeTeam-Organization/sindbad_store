"use client";
import * as React from "react";
import {  Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Shop } from "@/types/storeTypes";
import Spinner from "@/app/(home)/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import {   postApi } from "@/lib/http";
import Link from "next/link";

function EcommerceSearchInput({onSelected}:{onSelected:(e:Shop)=>void}) {
  const [open, setOpen] = React.useState(false);
  const [selectedEcommerce, setSelectedEcommerce] = React.useState<Shop>();
  // const [isInitStore, setisInitStore] = React.useState(false)

  const [params, setParams] = React.useState({
    ecommerceName: "",
    pageNumber: 1,
    pageSize: 30,
  });


  const { isLoading, data } = useQuery<{ data: { items: Shop[] } }>({
    queryKey: [
      "getStoresForSearchFilter",
      params.pageNumber,
      params.ecommerceName,
    ],
    queryFn: () =>
      postApi(`EcommercesStores/FilterECommerce`, {
        body: {
          name: params.ecommerceName,
          pageSize: params.pageSize,
          pageNumber: params.pageNumber,
        },
      }),
  });

  return (
    <div className="w-full flex gap-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedEcommerce ? selectedEcommerce.name : "المتاجر"}
            <Search className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 m-0 z-[999999] ">
          <div className="w-full">
            <Input
              placeholder="البحث عن متجر"
              value={params.ecommerceName}
              onChange={(e) => {
                setParams((o) => ({ ...o, ecommerceName: e.target.value }));
              }}
            />
            <div className="max-h-[180px] overflow-auto  z-50">
              {!isLoading ? (
                data?.data && data?.data?.items?.length > 0 ? (
                  data?.data?.items.map((store) => (
                    <div
                      key={store.id}
                      onClick={() => {
                        setSelectedEcommerce(store);
                        onSelected(store)
                        setOpen(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-slate-50 z-50 "
                    >
                      <p className="text-xs z-50">{store.name}</p>
                    </div>
                  ))
                ) : (
                  // for length condition
                  <div className="p-5 flex items-center justify-center pt-6">
                    <p className="text-sm text-gray-600"> لاتوجد متاجر </p>
                  </div>
                )
              ) : (
                // for loading condition
                <div className="p-5 flex items-center justify-center pt-6">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {selectedEcommerce?.urlLinkOfStore && <Link href={selectedEcommerce?.urlLinkOfStore??"?"}  target="_blank">
        <Button className="mdHalf:text-xs text-[9px] text-black flex flex-col bg-[#288B5338] hover:bg-[#288B5339] hover:bg-opacity-[0.7] tajawal">
          <span className="mx-2 font-bold">الإنتقال الى المتجر</span>
          <span className="mx-2 mdHalf:text-[9px] text-[7px] text-primary-background">
            {" "}
            مع نسخ كوبون الخصم
          </span>
        </Button>
      </Link>}
    </div>
  );
}

export default EcommerceSearchInput;
