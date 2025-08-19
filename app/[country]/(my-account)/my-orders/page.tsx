
import { getApi } from "@/lib/http";
import MyOrdersTable from "./components/MyOrdersTable";
import { ResponsiveOrdersTypes } from "./types";
 
const MyAccountPage = async () => {
   
  //يجيب بينات من اول صفحة ونمررها لل جدول ك بينات اولية عشان تحسن تجربة المستخمد 
  const data = await getApi<ResponsiveOrdersTypes>("Orders?pageNumber=1&pageSize=30");
 
  return (
    <div className="">
      <div className="flex flex-col p-6 bg-white rounded-md shadow-sm  ">
        <MyOrdersTable  initData={data?.data} />
      </div>
    </div>
  );
};

export default MyAccountPage;
