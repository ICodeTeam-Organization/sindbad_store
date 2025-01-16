
import { getApi } from "@/lib/http";
import MyOrdersTable from "./components/MyOrdersTable";
import { ResponsiveOrdersTypes } from "./types";

// const ordersData = [
//   {
//     order_number: "200567",
//     order_value: " 200.50 ريال سعودي",
//     date: "10/9/2024",
//     status: "في الطريق",
//     traking: "تتبع الطلب",
//   },
//   {
//     order_number: "200567",
//     order_value: " 200.50 ريال سعودي",
//     date: "10/9/2024",
//     status: "في الطريق",
//     traking: "تتبع الطلب",
//   },
//   {
//     order_number: "200567",
//     order_value: " 200.50 ريال سعودي",
//     date: "10/9/2024",
//     status: "في الطريق",
//     traking: "تتبع الطلب",
//   },
//   {
//     order_number: "200567",
//     order_value: " 200.50 ريال سعودي",
//     date: "10/9/2024",
//     status: "في الطريق",
//     traking: "تتبع الطلب",
//   },
// ];
const MyAccountPage = async () => {
  // const ordersData: Order[] = [
  //   {
  //     id: 831,
  //     orderDate: "2025-01-14 03:33",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "7",
  //   },
  //   {
  //     id: 832,
  //     orderDate: "2025-01-14 03:34",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "8",
  //   },
  //   {
  //     id: 833,
  //     orderDate: "2025-01-14 03:35",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "9",
  //   },
  //   {
  //     id: 834,
  //     orderDate: "2025-01-14 03:36",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "10",
  //   },
  //   {
  //     id: 835,
  //     orderDate: "2025-01-14 03:37",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "11",
  //   },
  //   {
  //     id: 836,
  //     orderDate: "2025-01-14 03:38",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "12",
  //   },
  //   {
  //     id: 837,
  //     orderDate: "2025-01-14 03:39",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "13",
  //   },
  //   {
  //     id: 838,
  //     orderDate: "2025-01-14 03:40",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "14",
  //   },
  //   {
  //     id: 839,
  //     orderDate: "2025-01-14 03:41",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "15",
  //   },
  //   {
  //     id: 840,
  //     orderDate: "2025-01-14 03:42",
  //     orderStatus: "الطلب قيد انتظار التأكيد على السند التابع له",
  //     totalPrice: 0,
  //     orderNumber: "16",
  //   },
  // ];

  //يجيب بينات من اول صفحة ونمررها لل جدول ك بينات اولية عشان تحسن تجربة المستخمد 
  const data = await getApi<ResponsiveOrdersTypes>("Orders/GetAllCustomerOrdersByFilter?pageNumber=1&pageSize=30");


  return (
    <div className="">
      <div className="flex flex-col p-6">
        {/* Table */}
        <MyOrdersTable  initData={data?.data} />
      </div>
    </div>
  );
};

export default MyAccountPage;
