import { Button } from "@/components/ui/button";

type Props = {
  MyNewOrder: boolean;
  OrdersWaitingForAccept: boolean;
  PreviousOrders: boolean;
  handleChangeForm: () => void;
  handleChangeForm2: () => void;
  handleChangeForm3: () => void;
};

const TabButton = ({
  MyNewOrder,
  OrdersWaitingForAccept,
  PreviousOrders,
  handleChangeForm,
  handleChangeForm2,
  handleChangeForm3,
}: Props) => {
  return (
    <div className="flex">
      <Button
        variant={"ghost"}
        className={`${
          !MyNewOrder && "border-none text-gray-400"
        }  border-b-2 border-b-orange-500 w-1/3  rounded-none font-bold text-lg transition-all duration-200`}
        onClick={handleChangeForm}
      >
        <p className="max-sm:text-sm">طلباتي الجديدة</p>
      </Button>
      <Button
        variant={"ghost"}
        className={`${
          !OrdersWaitingForAccept && "border-none text-gray-400"
        }  border-b-2 border-b-orange-500 w-1/3  rounded-none font-bold text-lg transition-all duration-200  `}
        onClick={handleChangeForm2}
      >
        <p className="max-sm:text-sm max-sm:text-wrap max-sm:w-10">طلبات بانتظار الموافقة على السعر</p>
      </Button>
      <Button
        variant={"ghost"}
        className={`${
          !PreviousOrders && "border-none text-gray-400"
        }  border-b-2 border-b-orange-500 w-1/3  rounded-none font-bold text-lg transition-all duration-200  `}
        onClick={handleChangeForm3}
      >
        <p className="max-sm:text-sm">طلبات سابقة</p>
      </Button>
    </div>
  );
};

export default TabButton;
