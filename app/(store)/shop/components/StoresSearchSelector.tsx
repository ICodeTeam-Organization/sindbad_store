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
import { getApi } from "@/lib/http";

const stores1: Store[] = [
  {
    id: 1,
    name: "Tech World",
    websiteLink: "https://techworld.com",
    description: "Your one-stop shop for all tech gadgets.",
    mainImageUrl: "https://example.com/images/techworld-main.jpg",
    imagesUrl: [
      "https://example.com/images/techworld1.jpg",
      "https://example.com/images/techworld2.jpg",
    ],
  },
  {
    id: 2,
    name: "Fashion Hub",
    websiteLink: "https://fashionhub.com",
    description: "Explore the latest trends in fashion.",
    mainImageUrl: "https://example.com/images/fashionhub-main.jpg",
    imagesUrl: [
      "https://example.com/images/fashionhub1.jpg",
      "https://example.com/images/fashionhub2.jpg",
    ],
  },
  {
    id: 3,
    name: "Gourmet Delights",
    websiteLink: "https://gourmetdelights.com",
    description: "Premium foods and beverages delivered to your door.",
    mainImageUrl: "https://example.com/images/gourmet-main.jpg",
    imagesUrl: [
      "https://example.com/images/gourmet1.jpg",
      "https://example.com/images/gourmet2.jpg",
    ],
  },
  {
    id: 4,
    name: "Home Comforts",
    websiteLink: "https://homecomforts.com",
    description: "Enhance your living spaces with our curated home products.",
    mainImageUrl: "https://example.com/images/homecomforts-main.jpg",
    imagesUrl: [
      "https://example.com/images/homecomforts1.jpg",
      "https://example.com/images/homecomforts2.jpg",
    ],
  },
  {
    id: 5,
    name: "Active Lifestyle",
    websiteLink: "https://activelifestyle.com",
    description: "Everything you need for sports and outdoor activities.",
    mainImageUrl: "https://example.com/images/activelifestyle-main.jpg",
    imagesUrl: [
      "https://example.com/images/activelifestyle1.jpg",
      "https://example.com/images/activelifestyle2.jpg",
    ],
  },
  {
    id: 6,
    name: "Gadget Galaxy",
    websiteLink: "https://gadgetgalaxy.com",
    description: "Innovative gadgets for everyday use.",
    mainImageUrl: "https://example.com/images/gadgetgalaxy-main.jpg",
    imagesUrl: [
      "https://example.com/images/gadgetgalaxy1.jpg",
      "https://example.com/images/gadgetgalaxy2.jpg",
    ],
  },
  {
    id: 7,
    name: "Book Haven",
    websiteLink: "https://bookhaven.com",
    description: "Dive into a world of literature and knowledge.",
    mainImageUrl: "https://example.com/images/bookhaven-main.jpg",
    imagesUrl: [
      "https://example.com/images/bookhaven1.jpg",
      "https://example.com/images/bookhaven2.jpg",
    ],
  },
  {
    id: 8,
    name: "Pet Palace",
    websiteLink: "https://petpalace.com",
    description: "Care, food, and accessories for your furry friends.",
    mainImageUrl: "https://example.com/images/petpalace-main.jpg",
    imagesUrl: [
      "https://example.com/images/petpalace1.jpg",
      "https://example.com/images/petpalace2.jpg",
    ],
  },
  {
    id: 9,
    name: "Wellness Works",
    websiteLink: "https://wellnessworks.com",
    description: "Discover products that promote health and well-being.",
    mainImageUrl: "https://example.com/images/wellnessworks-main.jpg",
    imagesUrl: [
      "https://example.com/images/wellnessworks1.jpg",
      "https://example.com/images/wellnessworks2.jpg",
    ],
  },
  {
    id: 10,
    name: "Artistic Vibes",
    websiteLink: "https://artisticvibes.com",
    description: "Inspiring art and creative tools for artists.",
    mainImageUrl: "https://example.com/images/artisticvibes-main.jpg",
    imagesUrl: [
      "https://example.com/images/artisticvibes1.jpg",
      "https://example.com/images/artisticvibes2.jpg",
    ],
  },
];

function StoresSearchSelector({onSelected}:{onSelected:(selectedStore:Store)=>void}) {
  const [open, setOpen] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState<Store>();

  const [params, setParams] = React.useState({
    storeName: "",
    pageNumber: 1,
    pageSize: 50,
  });

  const { isLoading, data } = useQuery<{ data: { items: Store[] } }>({
    queryKey: ["getStoresForSearchFilter", params.pageNumber, params.storeName],
    queryFn: () =>
      getApi(
        `Stores/GetStoresByFilter?Name=${params.storeName}&PageSize=${params.pageSize}&PageNumber=${params.pageNumber}`
      ),
    enabled: params.storeName != "",
  });

  const [stores, setStores] = React.useState<Store[]>([]);
  
  React.useEffect(() => {
    setStores(data?.data?.items || [])
  }, [data])
  



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
            ? stores.find((store) => store.id === selectedStore.id)?.name
            : "المحلات"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                      onSelected(store)
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
