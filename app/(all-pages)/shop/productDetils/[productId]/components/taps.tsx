import * as Tabs from "@radix-ui/react-tabs";
import SafeImage from "@/components/SafeImage";
import ProductReviewsTap from "./reviews-tap";
import ProductFeaturesTable from "./features-table";
import { NormalizedProductType } from "@/Data/normalizTypes";

type TabsComponentProps = {
  product: NormalizedProductType;
  productId: string | number;
  // tabLabels: {
  //   details: string;
  //   features: string;
  //   reviews: string;
  // };
  // tabContent: {
  //   tap1: React.ReactNode;
  //   tap2: React.ReactNode;
  //   tap3: React.ReactNode;
  // };
};

const TabsComponent: React.FC<TabsComponentProps> = ({
  product,
  productId,
}) => (
  <Tabs.Root defaultValue="details" className="w-full mdHalf:px-12 p-4 mt-5">
    <Tabs.List
      className="flex items-start space-x-reverse space-x-4 border-b-2 border-orange-500   w-full justify-start"
      dir="rtl"
    >
      <Tabs.Trigger
        value="details"
        className="px-6 rounded-t-lg data-[state=active]:bg-primary-background   p-2  font-medium text-gray-700 focus:outline-none  data-[state=active]:border-orange-500 data-[state=active]:text-white"
      >
        لمحة
      </Tabs.Trigger>
      <Tabs.Trigger
        value="features"
        className="px-6 rounded-t-lg data-[state=active]:bg-primary-background   p-2  font-medium text-gray-700 focus:outline-none  data-[state=active]:border-orange-500 data-[state=active]:text-white"
      >
        التفاصيل
      </Tabs.Trigger>
      <Tabs.Trigger
        value="reviews"
        className="px-6 rounded-t-lg data-[state=active]:bg-primary-background   p-2  font-medium text-gray-700 focus:outline-none  data-[state=active]:border-orange-500 data-[state=active]:text-white"
      >
        التقييمات
      </Tabs.Trigger>
    </Tabs.List>

    {/* Dynamic Tab Content */}
    <div className="pt-4 w-full" dir="rtl">
      <Tabs.Content
        value="details"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        {<section className="bg-white">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto md:gap-5 xl:gap-0 md:py-16 md:grid-cols-12">
            <div className="md:col-span-7 text-right">
              <h3 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none">
                {product.name}
              </h3>
              <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-8">
                {
                  product.description
                }
              </p>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8">
                {
                  product.attributesWithValues?.map((attribute, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="font-medium ml-1">{attribute.attributeName}: </span>
                      <span>{attribute.values.join(", ")}</span>
                    </div>
                  ))
                }
              </p>
            </div>
            <div className="hidden lg:mt-0 md:col-span-5 md:flex  items-start">
              <SafeImage
                src={product.image}
                alt="صور للمنتج"
                width={400}
                height={400}
                className={`w-full h-full rounded cursor-pointer`}
                style={{ objectFit: "fill" }}
              />
            </div>
          </div>
        </section>
        }
      </Tabs.Content>

      <Tabs.Content
        value="features"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        {/* {
          product.attributesWithValues && product.attributesWithValues.length > 0  ? (        product.attributesWithValues?.map((attribute, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="font-medium ml-1">{attribute.attributeName}: </span>
              <span>{attribute.values.join(", ")}</span>
            </div>
          ))) : (
            <p className="text-center">لا يوجد معلومات اضافية</p>
          )
} */}
        <ProductFeaturesTable features={product?.attributesWithValues || []} />
      </Tabs.Content>

      <Tabs.Content
        value="reviews"
        className="text-gray-700  border-gray-300 mdHalf:p-4 mb-4"
      >
        <ProductReviewsTap productId={productId} product={product} />
      </Tabs.Content>
    </div>
  </Tabs.Root>
);

export default TabsComponent;
