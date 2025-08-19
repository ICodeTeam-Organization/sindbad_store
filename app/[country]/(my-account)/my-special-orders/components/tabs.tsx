"use client";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";
import { Button } from "@/components/ui/button";
import * as Tabs from "@radix-ui/react-tabs";
import { IoMdAddCircleOutline } from "react-icons/io";

type Tab = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsComponentProps = {
  tabs: Tab[];
};

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {

  const { setSpecialOrderState, setWholeSalesOrderState } = useSpecialOrdersDialogsStore()

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap gap-y-4 items-center gap-x-4   px-4">
        <h2 className="mdHalf:text-xl text-lg  font-bold text-secondary">طلباتي الخاصة</h2>
        <div className="flex items-center justify-center gap-x-2">
          <Button onClick={() => { setSpecialOrderState(true) }} className="bg-primary hover:bg-primary hover:bg-opacity-60 text-xs">
            <IoMdAddCircleOutline className="ml-4 " size={20} />  طلب خاص جديد
          </Button>
          <Button onClick={() => { setWholeSalesOrderState(true) }} className="bg-primary hover:bg-primary hover:bg-opacity-60 text-xs">
            <IoMdAddCircleOutline className="ml-4 " size={20} />  طلب جملة جديد
          </Button>
        </div>
      </div>

      <Tabs.Root defaultValue={tabs[0]?.value || ""} className="w-full mt-4  " dir="rtl">
        {/* Tab List */}
        <Tabs.List
          className="flex  items-start bg-bg-100/40 p-2 md:w-fit md:justify-start justify-center overflow-x-auto  rounded-md mx-4 "
          dir="rtl"
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2 whitespace-nowrap font-medium text-sm text-gray-700 focus:outline-none data-[state=active]:shadow-sm  data-[state=active]:bg-white data-[state=active]:text-secondary rounded-md  "
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab Content */}
        <div className="pt-4 w-full">
          {tabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="text-gray-700  p-4 mb-4"
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </>
  );
}


// const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
//   return (
//     <Tabs.Root defaultValue="details" className="w-full">
//       <Tabs.List
//         className="flex items-start space-x-reverse space-x-4 border-b-2 border-orange-500 pb-2 w-full justify-start"
//         dir="rtl"
//       >
//         {tabs.map((tab) => (
//           <Tabs.Trigger
//             key={tab.value}
//             value={tab.value}
//             className="px-4 py-2 font-medium text-gray-700 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-[#9B1D20] data-[state=active]:text-black"
//           >
//             {tab.label}
//           </Tabs.Trigger>
//         ))}
//       </Tabs.List>

//       {/* Dynamic Tab Content */}
//       <div className="pt-4 w-full" dir="rtl">
//         <Tabs.Content
//           value="details"
//           className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
//         >
//           tabContent.tap1
//         </Tabs.Content>

//         <Tabs.Content
//           value="features"
//           className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
//         >
//           tabContent.tap2
//         </Tabs.Content>

//         <Tabs.Content
//           value="reviews"
//           className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
//         >
//           tabContent.tap3
//         </Tabs.Content>
//       </div>
//     </Tabs.Root>
//   );
// };

export default TabsComponent;
