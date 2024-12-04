"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";

function StoresSearchSelector({
  onSelected,
}: {
  onSelected: (selectedStore: Store) => void;
}) {
  const { filters } = useShopFiltersStore();
  const [open, setOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store>();
  // const [isInitStore, setisInitStore] = React.useState(false)

  const [params, setParams] = React.useState({
    storeName: "",
    pageNumber: 1,
    pageSize: 50,
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
    enabled: params.storeName != "" || storeId != "",
  });

  const [stores, setStores] = React.useState<Store[]>([]);

  React.useEffect(() => {
    setStores(data?.data?.items || []);
  }, [data]);

  React.useEffect(() => {
    
    if (dataInitStore?.data) {
      setSelectedStore(dataInitStore?.data);
      setstoreId("")
    }
  }, [dataInitStore]);

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
              stores.length > 0 ? (
                stores.map((store) => (
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
                ))
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
