import Hero from "./components/sections/Hero";
import CategoriesSlider from "./components/CategoriesSlider";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import CardsInfo from "./components/sections/CardsInfo";
import Categories from "./components/sections/Categories";
import TodayOffers from "./components/sections/today-offers";
import ShoppingNow from "./components/sections/shopping-now";
import AllStores from "./components/sections/all-stores";
import BeastSeller from "./components/sections/beast-seller";
import Ads from "./components/sections/Ads";
import RecentlyAdded from "./components/sections/recently-added";
import Feature from "./components/sections/Feature";
import { getApi } from "@/lib/http";
import AllEShops from "./components/sections/all-Eshops";
import { MainCategory, Product, Shop, Store } from "@/types/storeTypes";

export default async function Home() {
  const [
    categories,
    Allstores,
    AllEcommrce,
    Offersproducts,
    BeastSellerInWeek,
    RecentlyProducts,
  ] = await Promise.all([
    getApi<{ data: MainCategory[] }>(
      "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000"
    ),
    getApi<{ data: Store[] }>(
      "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
    ),
    getApi<{ data: { items: Shop[] } }>(
      "EcommercesStores/GetEcommerceStores?pageNumber=1&pageSize=20"
    ),
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

  return (
    <section className="w-full">
      <Hero />
      <div className="w-full xl:container mx-auto">
        <CategoriesSlider />
        <div className="mdHalf:mt-32">
          <ServiceCard />
        </div>
        <CardsInfo />
        {categories?.data?.length > 0 && (
          <Categories categories={categories.data} />
        )}
        <div className="mb-10" />
        {Offersproducts?.data?.length > 0 && (
          <TodayOffers Offersproducts={Offersproducts} />
        )}
        <ShoppingNow />
      </div>
      <div className="my-10">
        {Allstores?.data?.length > 0 && <AllStores Allstores={Allstores} />}
      </div>
      <div className="w-full xl:container mx-auto">
        {BeastSellerInWeek?.data?.length > 0 && (
          <BeastSeller BeastSellerInWeek={BeastSellerInWeek} />
        )}
      </div>
      <div className="my-8">
        <Ads />
      </div>
      <div className="w-full xl:container mx-auto mb-10">
        {RecentlyProducts?.data?.length > 0 && (
          <RecentlyAdded RecentlyProducts={RecentlyProducts} />
        )}
        <div className="mb-10" />
        <ShoppingNow />
      </div>
      <div className="my-10">
        {AllEcommrce?.data?.items?.length > 0 && (
          <AllEShops AllEShops={AllEcommrce} />
        )}
      </div>
      <Feature />
    </section>
  );
}