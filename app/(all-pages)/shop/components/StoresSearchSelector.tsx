"use client";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Store } from "@/types/storeTypes";
import Spinner from "@/app/(home)/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http"; 
import { useShopFiltersStore } from "@/app/stores_mangament/shopFiltersStore";

function StoresSearchSelector({
  onSelected,
}: {
  onSelected: (selectedStore: Store) => void;
}) {
  const { filters , setStoreId} = useShopFiltersStore();
  const [open, setOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store>();
  // const [isInitStore, setisInitStore] = React.useState(false)

  const [params, setParams] = React.useState({
    storeName: "",
    pageNumber: 1,
    pageSize: 20,
  });

  const [storeId, setstoreId] = React.useState("")
  

  const { isLoading: loadInitStore, data: dataInitStore } = useQuery<{
    data: Store;
  }>({
    queryKey: ["getStoreFromInitDataFIltering", storeId],
    queryFn: () => getApi(`Stores/GetStoreDetailsById/` + storeId),
    enabled:storeId != "" && params.storeName == "" && !selectedStore?.id ,
    retry:false
  });

  const { isLoading, data } = useQuery<{ data: { items: Store[] } }>({
    queryKey: ["getStoresForSearchFilter", params.pageNumber, params.storeName],
    queryFn: () =>
      postApi(`Stores/GetStoresWithFilter`, {
        body: {
          name: params.storeName,
          pageSize: params.pageSize,
          pageNumber: params.pageNumber,
        },
      }),
    // enabled: params.storeName != "" || storeId != "",
  });

  // const [stores, setStores] = React.useState<Store[]>([]);

  // this to set data
  // React.useEffect(() => {
  //   setStores(data?.data?.items || []);
  // }, [data]);

  // this to set the store Filter if send from url query
  React.useEffect(() => {
    if (dataInitStore?.data) {
      setSelectedStore(dataInitStore?.data);
      setstoreId("")
    }
  }, [dataInitStore]);

  // this to set storeId in state for trigged requist to get detail of store
  React.useEffect(() => {
    if ((params?.storeName == "" || !selectedStore?.id)) {
      setstoreId(filters.storeId)
    }
    return;
  }, [filters?.storeId])
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStore
            ? selectedStore.name
            : "المحلات"}
         {loadInitStore ? <Spinner className="h-4 w-4" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="w-full">
          <Input
            placeholder="البحث عن محل"
            value={params.storeName}
            onChange={(e) => {
              setParams((o) => ({ ...o, storeName: e.target.value }));
            }}
          />
          <div className="max-h-[180px] overflow-auto">
            {!isLoading ? (
             data?.data && data?.data?.items?.length > 0 ? (
              <>
              <div
              key="hg;g"
              onClick={() => {
                setSelectedStore(undefined);
                setStoreId("")
                setOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-slate-50"
            >
              <p className="text-xs">الكل</p>
            </div>
               { data?.data?.items.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store);
                      onSelected(store);
                      setOpen(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-slate-50"
                  >
                    <p className="text-xs">{store.name}</p>
                  </div>
                ))}</>
              ) : (
                // for length condition
                <div className="p-5 flex items-center justify-center pt-6">
                  <p className="text-sm text-gray-600"> لاتوجد محلات </p>
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
        {/* <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command> */}
      </PopoverContent>
    </Popover>
  );
}

export default StoresSearchSelector;
