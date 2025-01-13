import * as Tabs from "@radix-ui/react-tabs";

type Tab = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsComponentProps = {
  tabs: Tab[];
};

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => (
  <Tabs.Root defaultValue={tabs[0]?.value || ""} className="w-full">
    {/* Tab List */}
    <Tabs.List
      className="flex items-start space-x-4 pb-2 w-full justify-start"
      dir="rtl"
    >
      {tabs.map((tab) => (
        <Tabs.Trigger
          key={tab.value}
          value={tab.value}
          className="px-4 py-2 font-medium text-gray-700 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-[#9B1D20] data-[state=active]:text-black"
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
);

export default TabsComponent;