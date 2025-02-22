import Hero from "./components/sections/Hero";
import CategoriesSlider from "./components/CategoriesSlider";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import CardsInfo from "./components/sections/CardsInfo";
import Categories from "./components/sections/Categories";
import ShoppingNow from "./components/sections/shopping-now";
import AllStores from "./components/sections/all-stores";
import Ads from "./components/sections/Ads";
import Feature from "./components/sections/Feature";
import { getApi } from "@/lib/http";
import AllEShops from "./components/sections/all-Eshops";
import { MainCategory, Product, Shop, Store } from "@/types/storeTypes";
import ProductCarsoule from "@/components/ProductCarsoule";

export default async function Home() {
  const [
    categoriesResult,
    AllstoresResult,
    AllEcommrceResult,
    OffersproductsResult,
    BeastSellerInWeekResult,
    RecentlyProductsResult,
  ] = await Promise.allSettled([
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

  const categories = categoriesResult.status === "fulfilled" ? categoriesResult.value : null;
  const Allstores = AllstoresResult.status === "fulfilled" ? AllstoresResult.value : null;
  const AllEcommrce = AllEcommrceResult.status === "fulfilled" ? AllEcommrceResult.value : null;
  const Offersproducts = OffersproductsResult.status === "fulfilled" ? OffersproductsResult.value : null;
  const BeastSellerInWeek = BeastSellerInWeekResult.status === "fulfilled" ? BeastSellerInWeekResult.value : null;
  const RecentlyProducts = RecentlyProductsResult.status === "fulfilled" ? RecentlyProductsResult.value : null;

  return (
    <section className="w-full">
      <Hero />
      <div className="w-full xl:container mx-auto">
        <CategoriesSlider />
        <div className="mdHalf:mt-32">
          <ServiceCard />
        </div>
        <CardsInfo />
        {categories && categories?.data?.length > 0 && (
          <Categories categories={categories.data} />
        )}

        {/* <div>
          <h1>hello</h1>
          <ProductCarsoule products={BeastSellerInWeek} />
        </div> */}
        <div className="mb-10" />
        {Offersproducts && Offersproducts?.data?.length > 0 && (
          <ProductCarsoule products={Offersproducts} sectionHref="/shop?todayOffer=t" sectionTitle="عروض اليوم" />
          // <TodayOffers Offersproducts={Offersproducts} />
        )}
        <ShoppingNow />
      </div>
      <div className="my-10 ">
        { Allstores && Allstores?.data?.length > 0 && <AllStores Allstores={Allstores} />}
      </div>
      <div className="w-full xl:container mx-auto">
        { BeastSellerInWeek && BeastSellerInWeek?.data?.length > 0 && (
          // <BeastSeller BeastSellerInWeek={BeastSellerInWeek} />
          <ProductCarsoule products={BeastSellerInWeek} sectionHref="/shop?bestseller=true" sectionTitle="الاكثر مبيعا في اسبوع" />
        )}
      </div>
      <div className="my-8">
        <Ads />
      </div>
      <div className="w-full xl:container mx-auto mb-10">
        {RecentlyProducts && RecentlyProducts?.data?.length > 0 && (
          // <RecentlyAdded RecentlyProducts={RecentlyProducts} />
          <ProductCarsoule products={RecentlyProducts} sectionHref="/shop?newProduct=t" sectionTitle="اضيفت مؤخرا" />
        )}
        <div className="mb-10" />
        <ShoppingNow />
      </div>
      <div className="my-10">
        { AllEcommrce && AllEcommrce?.data?.items?.length > 0 && (
          <AllEShops AllEShops={AllEcommrce} />
        )}
      </div>
      <Feature />
    </section>
  );
}