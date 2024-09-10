import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckoutType } from "@/types/checkout";
import { UseFormRegister } from "react-hook-form";

type Banks = {
  id: number;
  name: string;
};

type SelectComponentProps = {
  register: UseFormRegister<CheckoutType>;
};

const SelectComponent: React.FC<SelectComponentProps> = ({ register }) => {
  const banks: Banks[] = [
    { id: 1, name: "الراجحي" },
    { id: 2, name: "القرشي" },
    { id: 3, name: "بنك الكويت" },
    { id: 4, name: "بنك جيزان" },
    { id: 5, name: "بنك عسفان" },
    { id: 6, name: "STS" },
  ];

  return (
    <div>
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="أختر المصرف أو البنك" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>أختر المصرف أو البنك</SelectLabel>
            {banks.map((bank) => (
              <SelectItem key={bank.id} {...register("bank")} value={bank.name}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
