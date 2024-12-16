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
<<<<<<< Updated upstream
import ShoppingNow from "./components/sections/shopping-now";
import TodayOffers from "./components/sections/today-offers";
=======
import Feature from "./components/sections/Feature";
import { getApi, postApi } from "@/lib/http";
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
    getApi<{data:MainCategory[]}>(
      "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000"
    ),
    getApi<{data:Store[]}>("Market/Store/GetAllStoresForViewInSliderInMarketHomePage"),
    getApi<{data:Shop[]}>(
      "EcommercesStores/GetEcommerceStores?pageNumber=1&pageSize=20"
    ),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/30"
    ),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/30"
    ),
    getApi<{data:Product[]}>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/30"
    ),
  ]);

  // تحويل البيانات لتتطابق مع التركيبة المتوقعة
  const transformedAllEcommrce = {
    data: {
      items: AllEcommrce.data
    }
  };
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
        <CategoriesSlider  />
        <ServiceCard />
        <CardsInfo />
        <Categories categories={categories?.data} />
        <div className="mb-10" />
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
        <AllEShops AllEShops={transformedAllEcommrce}/>
      </div>
>>>>>>> Stashed changes
      <Feature />
    </section>
  );
}
