
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import StoreProductsTab from "./tabs/StoreProductsTab"
import StoreImagesTab from "./tabs/StoreImagesTab";
import StoreOffersTab from "./tabs/StoreOffersTab";
 
interface PropsType {
  storeId:string;
  images:string[]
}
export function StoreDetailsTabs({storeId,images}:PropsType) {
  return (
    <div className="flex w-full  flex-col gap-6  ">
      <Tabs defaultValue="products_store_tab" className="w-full">
        <TabsList className="gap-x-4 flex flex-row-reverse  border-b">
          <TabsTrigger value="products_store_tab" className="data-[state=active]:border-secondary border-transparent border-b-2 duration-200 pb-3">المنتجات </TabsTrigger>
          <TabsTrigger value="offers_store_tab" className="data-[state=active]:border-secondary border-transparent border-b-2 duration-200 pb-3">العروض</TabsTrigger>
          <TabsTrigger value="images_store_tab" className="data-[state=active]:border-secondary border-transparent border-b-2 duration-200 pb-3">صور المحل</TabsTrigger>
        </TabsList>
        <TabsContent value="products_store_tab">
          <StoreProductsTab storeId={storeId} />
        </TabsContent>
        <TabsContent value="offers_store_tab">
           <StoreOffersTab storeId={storeId} />
        </TabsContent>
        <TabsContent value="images_store_tab">
           <StoreImagesTab images={images}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
