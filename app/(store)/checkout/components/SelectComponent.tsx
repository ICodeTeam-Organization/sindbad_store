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
import { Bank, CheckoutType } from "@/types/checkout";
import { useQuery } from "@tanstack/react-query";
import { UseFormRegister } from "react-hook-form";

type SelectComponentProps = {
  register: UseFormRegister<CheckoutType>;
};

const SelectComponent: React.FC<SelectComponentProps> = ({ register }) => {
  const { data: banks, error } = useQuery<any>({
    queryKey: ["banks"],
    queryFn: async () => await getApi("Cart/GetAllBanksForViewInCartPage"),
  });

  return (
    <div>
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="أختر المصرف أو البنك" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {error
                ? "حدث خطأ اثناء جلب الينوك المتاحة للدفع"
                : "أختر المصرف أو البنك"}
            </SelectLabel>
            {banks?.data?.map((bank: Bank) => (
              <SelectItem
                key={bank.id}
                value={bank.id.toString()}
                {...register("bank", { valueAsNumber: true })}
              >
                {bank.bankName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
