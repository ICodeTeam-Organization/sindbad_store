import { Card } from "@/components/ui/card";
import Dropdown from "./Dropdown";
import { getApi } from '@/lib/http';
import OrderDetails from "./OrderDetails";

const MyNewOrder = async () => {

  const AllNewOrders = await getApi<any>(
    'SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=15&PageNumber=1'
  )
  
  return (
    <Card className="rounded-none border-black p-6">
      <div className="flex justify-around items-center border m-auto border-black  py-2">
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">نوع الطلب</h1>
          <Dropdown name="منتج" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الرئيسية :</h1>
          <Dropdown name="" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
          <Dropdown />
        </div>
      </div>
      <div className="row">
        
        <OrderDetails classname="ttt" />
      </div>
    </Card>
  );
};

export default MyNewOrder;
