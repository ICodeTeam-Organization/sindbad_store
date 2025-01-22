import TabsComponent from "./components/tabs";
import OrdersWaitingPricingTable from "./components/tabsContent/OrdersWaitingPricingTable";
import PreviousOrdersTable from "./components/tabsContent/PreviousOrdersTable";
import { SpecialOrdersResponseType } from "./types";
import { getApi } from "@/lib/http";
import OrdersPricedTable from "./components/tabsContent/OrdersPricedTable";

// const special_orders = [
//   {
//     number: "200567",
//     order: "جوال سامسونج نوت 10 مستخدم نظيف",
//     category: "إلكترونيات",
//     details: "جوال سامسونج نوت 10 مستخدم نظيف",
//     date: "10/9/2024",
//     actions: "عرض تفاصيل السعر",
//   },
//   {
//     number: "200567",
//     order: "جوال سامسونج نوت 10 مستخدم نظيف",
//     category: "إلكترونيات",
//     details: "جوال سامسونج نوت 10 مستخدم نظيف",
//     date: "10/9/2024",
//     actions: "عرض تفاصيل السعر",
//   },
//   {
//     number: "200567",
//     order: "جوال سامسونج نوت 10 مستخدم نظيف",
//     category: "إلكترونيات",
//     details: "جوال سامسونج نوت 10 مستخدم نظيف",
//     date: "10/9/2024",
//     actions: "عرض تفاصيل السعر",
//   },
//   {
//     number: "200567",
//     order: "جوال سامسونج نوت 10 مستخدم نظيف",
//     category: "إلكترونيات",
//     details: "جوال سامسونج نوت 10 مستخدم نظيف",
//     date: "10/9/2024",
//     actions: "عرض تفاصيل السعر",
//   },
// ];



const MyAccountPage = async () => {

 
    const [
      OrdersPricedData,
      OrdersWaitingPricingData,
      PreviousOrdersData,
      ] = await Promise.all([
        getApi<SpecialOrdersResponseType>("SpecialProducts/Market/GetSpecialProductsByCustomerFilter/200/10/1"), // تم تسعبرها
        getApi<SpecialOrdersResponseType>("SpecialProducts/Market/GetSpecialProductsByCustomerFilter/100/10/1"), // في انتظار المراجعه من قبل المندوب
        getApi<SpecialOrdersResponseType>("SpecialProducts/Market/GetSpecialProductsByCustomerFilter/300/10/1"), // 
      ]);

      

  const tabsData = [
    {
      label: "طلبات تم تسعيرها",
      value: "details",
      initData:null,
      content: <OrdersPricedTable initData={OrdersPricedData} />,
    },
    {
      label: "طلبات بانتظار التسعير",
      value: "features",
      initData:null,
      content: <OrdersWaitingPricingTable initData={OrdersWaitingPricingData} />,
    },
    {
      label: "طلبات سابقة",
      value: "reviews",
      initData:null,
      content: <PreviousOrdersTable initData={PreviousOrdersData} />,
    },
  ];
 
  return (
    <div className="p-6">
      <div className="w-full overflow-hidden rounded-lg  mt-4"> 
        <TabsComponent tabs={tabsData} />
      </div>
    </div>
  );
};

export default MyAccountPage;
