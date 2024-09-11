import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type shipping = {
  id: number;
  address: string;
};

const SelectShppingAdress = () => {
  const banks: shipping[] = [
    { id: 1, address: "الراجحي" },
    { id: 2, address: "القرشي" },
    { id: 3, address: "بنك الكويت" },
    { id: 4, address: "بنك جيزان" },
    { id: 5, address: "بنك عسفان" },
    { id: 6, address: "STS" },
  ];

  return (
    <div>
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="عنوان الشحن" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>عنوان الشحن</SelectLabel>
            {banks.map((bank) => (
              <SelectItem key={bank.id} value={bank.address}>
                {bank.address}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectShppingAdress;
