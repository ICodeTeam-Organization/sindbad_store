import TabsComponent from "./components/tabs";
import OrdersWaitingPricingTable from "./components/tabsContent/OrdersWaitingPricingTable";
import { SpecialOrdersResponseType } from "./types";
import { getApi } from "@/lib/http";
import OrdersPricedTable from "./components/tabsContent/OrdersPricedTable";

const MyAccountPage = async () => {
  try {
    const [
      OrdersPricedData,
      OrdersWaitingPricingData,
      // PreviousOrdersData,
    ] = await Promise.all([
      getApi<SpecialOrdersResponseType>(
        "SpecialProducts/Market/GetSpecialProductsByCustomerFilter/200/10/1"
      ), // تم تسعبرها
      getApi<SpecialOrdersResponseType>(
        "SpecialProducts/Market/GetSpecialProductsByCustomerFilter/100/10/1"
      ), // في انتظار المراجعه من قبل المندوب
      // getApi<SpecialOrdersResponseType>(
      //   "SpecialProducts/Market/GetSpecialProductsByCustomerFilter/300/10/1"
      // ), //
    ]);

    // console.log(OrdersWaitingPricingData.data.items);
    

    const tabsData = [
      {
        label: "طلبات تم تسعيرها",
        value: "details",
        initData: null,
        content: <OrdersPricedTable initData={OrdersPricedData} />,
      },
      {
        label: "طلبات بانتظار التسعير",
        value: "features",
        initData: null,
        content: <OrdersWaitingPricingTable initData={OrdersWaitingPricingData} />,
      },
      // {
      //   label: "طلبات سابقة",
      //   value: "reviews",
      //   initData: null,
      //   content: <PreviousOrdersTable initData={PreviousOrdersData} />,
      // },
    ];

    return (
      <div className="mdHalf:p-6 p-1">
        <div className="w-full overflow-hidden rounded-lg mt-4">
          <TabsComponent tabs={tabsData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    // Fallback UI if an error occurs
    return (
      <div className="p-6 h-[70vh] flex items-center justify-center">
        <div className="w-full text-center text-red-500">
          <p>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.</p>
        </div>
      </div>
    );
  }
};

export default MyAccountPage;
