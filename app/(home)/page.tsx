<<<<<<< Updated upstream
import Cards from "./components/Cards";
import Ads from "./components/sections/Ads";
=======
import Hero from "./components/sections/Hero";
import CategoriesSlider from "./components/CategoriesSlider";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import CardsInfo from "./components/sections/CardsInfo";
import Categories from "./components/sections/Categories";
import TodayOffers from "./components/sections/today-offers";
import ShoppingNow from "./components/sections/shopping-now";
>>>>>>> Stashed changes
import AllStores from "./components/sections/all-stores";
import BeastSeller from "./components/sections/beast-seller";
import Categories from "./components/sections/Categories";
import Feature from "./components/sections/Feature";
<<<<<<< Updated upstream
import Hero from "./components/sections/Hero";
import RecentlyAdded from "./components/sections/recently-added";
import ShoppingNow from "./components/sections/shopping-now";
import TodayOffers from "./components/sections/today-offers";
=======
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
      "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/20"
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
  
  console.log(Allstores);
  
>>>>>>> Stashed changes

export default function Home() {
  return (
    <section className="w-full">
      <Hero />
<<<<<<< Updated upstream
      <Cards />
      <Categories />
      <TodayOffers />
      <ShoppingNow />
      <AllStores />
      <BeastSeller />
      <Ads />
      <RecentlyAdded />
      <ShoppingNow />
      <AllStores />
=======
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
      <div className="w-full xl:container mx-auto " >
         <BeastSeller BeastSellerInWeek={BeastSellerInWeek} />
      </div>
      <div className="my-8">
        <Ads />
      </div>
      <div className="w-full xl:container mx-auto mb-10 " >
      <RecentlyAdded RecentlyProducts={RecentlyProducts} />
      <div className="mb-10" />
      <ShoppingNow />
      </div>
      
      <div className="my-10" >
      {/* <AllEShops AllEShops={Allstores} /> */}
      </div>
      
>>>>>>> Stashed changes
      <Feature />
    </section>
  );
}
