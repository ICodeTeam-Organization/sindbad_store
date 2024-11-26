import Hero from "./components/sections/Hero";
import Image from "next/image";
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

export default async function Home2() {
  const [
    categories,
    Allstores,
    Offersproducts,
    BeastSellerInWeek,
    RecentlyProducts,
    AllCategoriesWithSub,
  ] = await Promise.all([
    getApi<any>(
      "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/50"
    ),
    getApi<any>("Market/Store/GetAllStoresForViewInSliderInMarketHomePage"),
    getApi<any>(
      "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/10"
    ),
    getApi<any>(
      "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/10"
    ),
    getApi<any>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/10"
    ),
    getApi<any>(
      "Market/categories/GetAllMainCategoriesWithSubCategoriesForViewInSpecialProductsPage/1/1000"
    ),
  ]);

  return (
    <section className="w-full     ">
      <Hero />
      <div className="w-full xl:container mx-auto ">
        <CategoriesSlider categories={categories} />
        <ServiceCard />
        <CardsInfo />
        <Categories categories={categories} />
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
