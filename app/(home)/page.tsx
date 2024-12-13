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
import { MainCategory, Product, Store } from "@/types/storeTypes";
import SetCategoriesInLocalStorage from "./components/SetCategoriesInLocalStorage";

export default async function Home2() {
  const [
    categories,
    Allstores,
    Offersproducts,
    BeastSellerInWeek,
    RecentlyProducts,
    AllCategoriesWithSub,
  ] = await Promise.all([
    getApi<{data:MainCategory[]}>(
      "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/50"
    ),
    getApi<{data:Store[]}>("Market/Store/GetAllStoresForViewInSliderInMarketHomePage"),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/10"
    ),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/10"
    ),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/10"
    ),
    getApi<{data:{items:MainCategory[]}}>(
      "Categories/GetAllMainCategoriesWithSubCategories/1/10000"
    ),
  ]);

  return (
    <section className="w-full     ">

      <SetCategoriesInLocalStorage AllCategoriesWihtSubcategories={AllCategoriesWithSub?.data?.items} />

      <Hero />
      <div className="w-full xl:container mx-auto ">
        <CategoriesSlider categories={categories.data} />
        <ServiceCard />
        <CardsInfo />
        <Categories categories={categories?.data} />
        <TodayOffers Offersproducts={Offersproducts} />
        <ShoppingNow />
      </div>
      <div className="my-10">
        <AllStores Allstores={Allstores} />
      </div>
      <div className="w-full xl:container mx-auto ">
        <BeastSeller BeastSellerInWeek={BeastSellerInWeek} />
      </div>
      <div className="my-8">
        <Ads />
      </div>
      <div className="w-full xl:container mx-auto mb-10 ">
        <RecentlyAdded RecentlyProducts={RecentlyProducts} />
        <div className="mb-10" />
        <ShoppingNow />
      </div>
      <div className="my-10">
        <AllEShops AllEShops={Allstores} />
      </div>
      <Feature />
    </section>
  );
}
