import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApi } from "@/lib/http";

type AddressType = {
  addressName: string;
};

const SelectShppingAdress = async () => {
  const addresses = await getApi<any>(
    "Cart/GetCustomnerAddressesForViewInCartPage"
  );

  return (
    <div className="w-72 ml-10 ">
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="عنوان الشحن" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>عنوان الشحن</SelectLabel>
            {addresses ? (
              addresses.data.map((address: AddressType) => (
                <SelectItem
                  key={address.addressName}
                  value={address.addressName}
                >
                  {address.addressName}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="">لا يتوفر اي عنوان شحن</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectShppingAdress;
