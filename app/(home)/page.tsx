import dynamic from "next/dynamic";
import { getApi, postApi } from "@/lib/http";
import { Product, Shop, Store } from "@/types/storeTypes";
import Hero from "./components/sections/Hero";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper"; 
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";

const CategoriesSlider = dynamic(() => import("./components/CategoriesSlider"));
const ServiceCard = dynamic(
  () => import("./components/ServiceCard/ServiceCard")
);
const CardsInfo = dynamic(() => import("./components/sections/CardsInfo"));
const Categories = dynamic(() => import("./components/sections/Categories"));
const ShoppingNow = dynamic(() => import("./components/sections/shopping-now"));
const AllStores = dynamic(() => import("./components/sections/all-stores"));
const Ads = dynamic(() => import("./components/sections/Ads"));
const Feature = dynamic(() => import("./components/sections/Feature"));
const ProductCarsoule = dynamic(() => import("@/components/ProductCarsoule"));
const AllEShops = dynamic(() => import("./components/sections/all-Eshops"));

export default async function Home() {
  let categories = null;
  let allStores = null;
  let allEcommrce = null;
  let offersProducts = null;
  let bestSellerInWeek = null;
  let recentlyProducts = null;

  // Fetching data concurrently using Promise.allSettled
  // This allows us to handle each request independently and avoid blocking the UI. by ali bawazir
  try {
    const [
      categoriesResult,
      allStoresResult,
      allEcommrceResult,
      offersProductsResult,
      bestSellerInWeekResult,
      recentlyProductsResult,
    ] = await Promise.allSettled([
      getApi<{ data: any[] }>(
        "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000"
      ),
      getApi<{ data: Store[] }>(
        "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
      ),
      postApi<{ data: { items: Shop[] } }>("EcommercesStores/FilterECommerce", {
        body: {
          pageSize: 20,
          pageNumber: 1,
        },
      }),
      getApi<{ data: Product[] }>(
        "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/20"
      ),
      getApi<{ data: Product[] }>(
        "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/20"
      ),
      getApi<{ data: Product[] }>(
        "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/20"
      ),
    ]);
 
    categories =
      categoriesResult.status === "fulfilled" ? categoriesResult.value.data.map(normalizeCategory) : null;

    allStores =
      allStoresResult.status === "fulfilled" ? allStoresResult.value : null;

    allEcommrce =
      allEcommrceResult.status === "fulfilled" ? allEcommrceResult.value : null;

    offersProducts =
      offersProductsResult.status === "fulfilled"
        ? offersProductsResult.value.data.map(normalizeProduct)
        : null;

    bestSellerInWeek =
      bestSellerInWeekResult.status === "fulfilled"
        ? bestSellerInWeekResult.value.data.map(normalizeProduct)
        : null;

    recentlyProducts =
      recentlyProductsResult.status === "fulfilled"
        ? recentlyProductsResult.value.data.map(normalizeProduct)
        : null;

  } catch (error) {
    console.log(error);
  }

  return (
    <section className="w-full">
      <Hero />
      <div className="w-full xl:container mx-auto">
        <CategoriesSlider />
        <div className="mdHalf:mt-32">
          <ServiceCard />
        </div>
        <CardsInfo />
        {categories && categories?.length > 0 && (
          <Categories categories={categories} />
        )}

        <div className="mb-10" />
        {offersProducts && offersProducts?.length > 0 && (
          <ProductCarsoule
            products={offersProducts}
            sectionHref="/shop?todayOffer=t"
            sectionTitle="عروض اليوم"
          />
        )}
        <ShoppingNow />
      </div>
      <div className="my-10 ">
        {allStores && allStores?.data?.length > 0 && (
          <AllStores Allstores={allStores} />
        )}
      </div>
      <div className="w-full xl:container mx-auto">
        {bestSellerInWeek && bestSellerInWeek?.length > 0 && (
          <ProductCarsoule
            products={bestSellerInWeek}
            sectionHref="/shop?bestseller=true"
            sectionTitle="الاكثر مبيعا في اسبوع"
          />
        )}
      </div>
      <div className="my-8">
        <Ads />
      </div>
      <div className="w-full xl:container mx-auto mb-10">
        {recentlyProducts && recentlyProducts?.length > 0 && (
          <ProductCarsoule
            products={recentlyProducts}
            sectionHref="/shop?newProduct=t"
            sectionTitle="اضيفت مؤخرا"
          />
        )}
        <div className="mb-10" />
        <ShoppingNow />
      </div>
      <div className="my-10">
        {allEcommrce && allEcommrce?.data?.items?.length > 0 && (
          <AllEShops AllEShops={allEcommrce} />
        )}
      </div>
      <Feature />
    </section>
  );
}
