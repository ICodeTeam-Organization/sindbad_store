import * as Tabs from "@radix-ui/react-tabs";

type TabsComponentProps = {
  tabLabels: {
    details: string;
    features: string;
    reviews: string;
  };
  tabContent: {
    tap1: React.ReactNode;
    tap2: React.ReactNode;
    tap3: React.ReactNode;
  };
  productId?: string;
};

const FavoriteTabs: React.FC<TabsComponentProps> = ({ tabLabels, tabContent }) => (
  <Tabs.Root  defaultValue="details" className="w-full">
    <Tabs.List
      className="flex items-start space-x-reverse space-x-4 border-b-2 border-orange-500 pb-2 w-full justify-start"
      dir="rtl"
    >
      <Tabs.Trigger
        value="details"
        className="px-4 py-2 font-medium text-gray-700 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600"
      >
        {tabLabels.details}
      </Tabs.Trigger>
      <Tabs.Trigger
        value="features"
        className="px-4 py-2 font-medium text-gray-700 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600"
      >
        {tabLabels.features}
      </Tabs.Trigger>
      <Tabs.Trigger
        value="reviews"
        className="px-4 py-2 font-medium text-gray-700 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600"
      >
        {tabLabels.reviews}
      </Tabs.Trigger>
    </Tabs.List>

    {/* Dynamic Tab Content */}
    <div className="pt-4 w-full" dir="rtl" >
      <Tabs.Content
        value="details"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        {tabContent.tap1}
      </Tabs.Content>

      <Tabs.Content
        value="features"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        {tabContent.tap2}
      </Tabs.Content>

      <Tabs.Content
        value="reviews"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        {tabContent.tap3}
      </Tabs.Content>
    </div>
  </Tabs.Root>
);

export default FavoriteTabs;
