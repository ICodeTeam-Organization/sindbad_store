import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AddressResponse } from "@/app/(my-account)/user-addresses/types";
import { getApi } from "@/lib/http";

export default function AddressSelector({onSelect}:{onSelect:(id:string)=>void}) {

    const { data: addressData, isPending: isPendingForAdresses } =
    useQuery<AddressResponse>({
      queryKey: ["addresserss-cart"],
      queryFn: async () => await getApi(`CustomerAddress/GetCustomerAddress`),
      staleTime:1000 * 60 * 60 * 24,
    });
  const [selectedAddressId, setSelectedAddressId] = useState<string>(sessionStorage.getItem("cartAddress") || "");
  const selectedAddress = addressData?.data?.find((e: any) => +e.id === +selectedAddressId);

  return (
    <div className="w-full">
      <Label>عنوان الإستلام</Label>
      <Select dir="rtl" onValueChange={(value) => {setSelectedAddressId(value);onSelect(value)}} value={selectedAddressId}>
        <SelectTrigger>
          <SelectValue placeholder="حدد عنوان الإستلام" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {addressData?.data?.map((address: any) => (
              <SelectItem key={address?.id} value={address?.id.toString()}>
                <p>
                  <span>{address?.directorateName} : </span>
                  <span className="text-xs text-gray-500">
                    {address?.locationDescription}
                  </span>
                </p>
              </SelectItem>
            ))}
          </SelectGroup>

          {isPendingForAdresses ? (
            <div className="p-4 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            addressData?.data?.length === 0 && (
              <div className="text-sm flex flex-col items-center justify-center p-4">
                <h1 className="mb-2">لا توجد لديك عناوين</h1>
                <Link href={"/user-addresses"} className="text-primary-background">
                  إضافة عنوان
                </Link>
              </div>
            )
          )}
        </SelectContent>
      </Select>

      {selectedAddressId && selectedAddress && (
        <p className="text-xs mt-2 text-gray-500 mx-1">
          <span>المستلم: {selectedAddress?.userName}</span> -{" "}
          <span>العنوان: {selectedAddress?.locationDescription}</span>
        </p>
      )}
      { selectedAddress && !selectedAddress.isLiberated && <div className="mb-4">
                      <p className="text-xs text-red-500 mt-1 text-right" > تنبيه: قد يتم فرض رسوم إضافية للتوصيل إلى هذه المنطقة.   </p>
                  </div> }
    </div>
  );
}
