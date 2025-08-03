import Hero from "./components/sections/Hero/Hero";
import CategoriesSlider from "./components/CategoriesSlider";
import { Suspense } from "react";
import ShoppingNow from "./components/sections/shopping-now";
import OffersCarousel from "./components/sections/OffersCarousel";
import StoresSection from "./components/sections/StoresSection"; 
import BestSellerSection from "./components/sections/BestSellerSection";
import RecentlyAddedSection from "./components/sections/RecentlyAddedSection";
import CategoriesSection from "./components/sections/CategoriesSection";
import ProductCarouselSkeleton from "@/components/skeletons/ProductsCarsouleSkeleton";
import CategoriesCarouselSkeleton from "@/components/skeletons/CategoriesCarouselSkeleton";
import StoreCardSkeleton from "@/components/skeletons/StoreCardSkeleton";
import ProductGridSkeleton from "@/components/skeletons/ProductsGridSkeleton";
import EcommrcesSection from "./components/sections/EcommrcesSection";



export default async function Home() {
  return (
    <section className="w-full">
      <div className="w-full xl:container mx-auto">
        <CategoriesSlider />
      </div>

      <Hero />

      <Suspense fallback={<CategoriesCarouselSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <OffersCarousel />
      </Suspense>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ShoppingNow />
      </Suspense>


      <Suspense fallback={<StoreCardSkeleton />}>
        <StoresSection />
      </Suspense>

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <BestSellerSection />
      </Suspense>

      <Suspense fallback={<ProductCarouselSkeleton />}>
        <RecentlyAddedSection />
      </Suspense>

      <Suspense fallback={<StoreCardSkeleton />}>
        <EcommrcesSection />
      </Suspense>

      <div className="mb-10" />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ShoppingNow />
      </Suspense>
    </section>
  );
}

// import { getApi } from "@/lib/http";
// import { Product, Store } from "@/types/storeTypes";
// import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
// import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
// import StoresCarsoule from "./components/sections/StoresCarsoule";
// import Hero from "./components/sections/Hero/Hero";
// import CategoriesSlider from "./components/CategoriesSlider";
// import { Suspense } from "react";
// import ProductCarsoule from "@/components/ProductCarsoule";
// import ShoppingNow from "./components/sections/shopping-now";
// import Categories from "./components/sections/Categories";
// import OffersCarousel from "./components/sections/OffersCarousel";
// import StoresSection from "./components/sections/StoresSection";
// import BestSellerSection from "./components/sections/BestSellerSection";
// import RecentlyAddedSection from "./components/sections/RecentlyAddedSection";
// import CategoriesSection from "./components/sections/CategoriesSection";

// // const AllEShops = dynamic(() => import("./components/sections/all-Eshops"));

// export const dynamic = "force-dynamic";

// const LoadingFallback = () => (
//   <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
// );

// export default async function Home() {
//   // let categories = null;
//   // let allStores = null;
//   // // let allEcommrce = null;
//   // let offersProducts = null;
//   // let bestSellerInWeek = null;
//   // let recentlyProducts = null;

//   // try {
//   //   const [
//   //     categoriesResult,
//   //     allStoresResult,
//   //     // allEcommrceResult,
//   //     offersProductsResult,
//   //     bestSellerInWeekResult,
//   //     recentlyProductsResult,
//   //   ] = await Promise.allSettled([
//   //     getApi<{ data: any[] }>(
//   //       "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000",
//   //       {}
//   //     ),
//   //     getApi<{ data: Store[] }>(
//   //       "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
//   //     ),
//   //     getApi<{ data: Product[] }>(
//   //       "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/20"
//   //     ),
//   //     getApi<{ data: Product[] }>(
//   //       "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/20"
//   //     ),
//   //     getApi<{ data: Product[] }>(
//   //       "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/20"
//   //     ),
//   //   ]);

//   //   categories =
//   //     categoriesResult.status === "fulfilled"
//   //       ? categoriesResult.value.data.map(normalizeCategory)
//   //       : null;

//   //   allStores =
//   //     allStoresResult.status === "fulfilled" ? allStoresResult.value : null;

//   //   offersProducts =
//   //     offersProductsResult.status === "fulfilled"
//   //       ? offersProductsResult.value?.data?.map(normalizeProduct)
//   //       : null;

//   //   bestSellerInWeek =
//   //     bestSellerInWeekResult.status === "fulfilled"
//   //       ? bestSellerInWeekResult.value.data.map(normalizeProduct)
//   //       : null;

//   //   recentlyProducts =
//   //     recentlyProductsResult.status === "fulfilled"
//   //       ? recentlyProductsResult.value.data.map(normalizeProduct)
//   //       : null;
//   // } catch (error) {
//   //   console.log(error, "ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
//   // }

//   return (
//     <section className="w-full">

//       <div className="w-full xl:container mx-auto">
//         <CategoriesSlider />
//       </div>

//       <Hero />

//       <Suspense fallback={<LoadingFallback />}>
//         <CategoriesSection />
//       </Suspense>
//       {/* <div className="w-full xl:container mx-auto">
//         {categories && categories?.length > 0 && (
//           <Suspense fallback={<LoadingFallback />}>
//             <Categories categories={categories} />
//           </Suspense>
//         )}
//       </div> */}

//       <Suspense fallback={<LoadingFallback />}>
//         <OffersCarousel />
//       </Suspense>
//       {/* {offersProducts && offersProducts?.length > 0 && (
//         <Suspense fallback={<LoadingFallback />}>
//           <ProductCarsoule
//             products={offersProducts}
//             sectionHref="/shop?todayOffer=t"
//             sectionTitle="عروض اليوم"
//           />
//         </Suspense>
//       )} */}

//       <Suspense fallback={<LoadingFallback />}>
//         <ShoppingNow />
//       </Suspense>
//       <Suspense fallback={<LoadingFallback />}>
//         <StoresSection />
//       </Suspense>
//       {/* <div className="my-10">
//         {allStores && allStores?.data?.length > 0 && (
//           <Suspense fallback={<LoadingFallback />}>
//             <StoresCarsoule allStores={allStores?.data} />
//           </Suspense>
//         )}
//       </div> */}

//       <Suspense fallback={<LoadingFallback />}>
//         <BestSellerSection />
//       </Suspense>
//       {/* {bestSellerInWeek && bestSellerInWeek?.length > 0 && (
//         <Suspense fallback={<LoadingFallback />}>
//           <ProductCarsoule
//             products={bestSellerInWeek}
//             sectionHref="/shop?bestseller=true"
//             sectionTitle="الاكثر مبيعا في اسبوع"
//           />
//         </Suspense>
//       )} */}

//       <Suspense fallback={<LoadingFallback />}>
//         <RecentlyAddedSection />
//       </Suspense>
//       {/* {recentlyProducts && recentlyProducts?.length > 0 && (
//           <Suspense fallback={<LoadingFallback />}>
//             <ProductCarsoule
//               products={recentlyProducts}
//               sectionHref="/shop?newProduct=t"
//               sectionTitle="اضيفت مؤخرا"
//             />
//           </Suspense>
//         )} */}

//       <div className="mb-10" />
//       <Suspense fallback={<LoadingFallback />}>
//         <ShoppingNow />
//       </Suspense>
//     </section>
//   );
// }
