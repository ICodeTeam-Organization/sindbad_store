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
  const addresses = await getApi<any>("CustomerAddress/GetCustomerAddress");
  return (
    <div className="w-72 ml-10 ">
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"عنوان الشحن"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {addresses.data ? "عنوان الشحن" : addresses.message}
            </SelectLabel>
            {addresses.data &&
              addresses.data.map((address: AddressType) => (
                <SelectItem
                  key={address.addressName}
                  value={address.addressName}
                >
                  {address.addressName}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectShppingAdress;
