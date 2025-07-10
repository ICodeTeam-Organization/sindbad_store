 
// import { getApi } from "@/lib/http";
// import { Product, Store } from "@/types/storeTypes";
// import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
// import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
// import StoresCarsoule from "./components/sections/StoresCarsoule";
// import Hero from "./components/sections/Hero/Hero";
// import CategoriesSlider from "./components/CategoriesSlider"; 
// import ProductCarsoule from "@/components/ProductCarsoule";
// import Categories from "./components/sections/Categories";
// import ShoppingNow from "./components/sections/shopping-now";
// import { const currency = get_currency_key() } from "@/lib/cookie/cookie.server";

 
 
// // const AllEShops = dynamic(() => import("./components/sections/all-Eshops"));

// export default async function Home() {
//   let categories = null;
//   let allStores = null;
//   // let allEcommrce = null;
//   let offersProducts = null;
//   let bestSellerInWeek = null;
//   let recentlyProducts = null;

//   // Fetching data concurrently using Promise.allSettled
//   // This allows us to handle each request independently and avoid blocking the UI. by ali bawazir
//   try {
//     const [
//       categoriesResult,
//       allStoresResult,
//       // allEcommrceResult,
//       offersProductsResult,
//       bestSellerInWeekResult,
//       recentlyProductsResult,
//     ] = await Promise.allSettled([
//       getApi<{ data: any[] }>(
//         "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000",
//         {}
//       ),
//       getApi<{ data: Store[] }>(
//         "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
//       ),
//       // postApi<{ data: { items: Shop[] } }>("EcommercesStores/FilterECommerce", {
//       //   body: {
//       //     pageSize: 20,
//       //     pageNumber: 1,
//       //   },
//       // }),
//       getApi<{ data: Product[] }>(
//         "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/20"
//       ),
//       getApi<{ data: Product[] }>(
//         "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/20"
//       ),
//       getApi<{ data: Product[] }>(
//         "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/20"
//       ),
//     ]);

//     categories =
//       categoriesResult.status === "fulfilled"
//         ? categoriesResult.value.data.map(normalizeCategory)
//         : null;

//     allStores =
//       allStoresResult.status === "fulfilled" ? allStoresResult.value : null;

//     // allEcommrce =
//     //   allEcommrceResult.status === "fulfilled" ? allEcommrceResult.value : null;

//     offersProducts =
//       offersProductsResult.status === "fulfilled"
//         ? offersProductsResult.value?.data?.map(normalizeProduct)
//         : null;

//     bestSellerInWeek =
//       bestSellerInWeekResult.status === "fulfilled"
//         ? bestSellerInWeekResult.value.data.map(normalizeProduct)
//         : null;

//     recentlyProducts =
//       recentlyProductsResult.status === "fulfilled"
//         ? recentlyProductsResult.value.data.map(normalizeProduct)
//         : null;
//   } catch (error) {
//     console.log(error);
//   }

//   console.log(const currency = get_currency_key()(),"CURRENCY KEY IN SERVER SIDE");

//   return (
//     <section className="w-full">
//       {/* <Hero /> */}
//       <div className="w-full xl:container mx-auto">
//         <CategoriesSlider />
//       </div>
//       <Hero />
//       <div className="w-full xl:container mx-auto">
//         {categories && categories?.length > 0 && (
//           <Categories categories={categories} />
//         )}
//       </div>
//       {offersProducts && offersProducts?.length > 0 && (
//         <ProductCarsoule
//           products={offersProducts}
//           sectionHref="/shop?todayOffer=t"
//           sectionTitle="عروض اليوم"
//         />
//       )}
//       <ShoppingNow />
//       <div className="my-10 ">
//         {allStores && allStores?.data?.length > 0 && (
//           <StoresCarsoule allStores={allStores?.data} />
//         )}
//       </div>
//       {bestSellerInWeek && bestSellerInWeek?.length > 0 && (
//         <ProductCarsoule
//           products={bestSellerInWeek}
//           sectionHref="/shop?bestseller=true"
//           sectionTitle="الاكثر مبيعا في اسبوع"
//         />
//       )}
//       {/* <Ads /> */}
//       <div className=" ">
//         {recentlyProducts && recentlyProducts?.length > 0 && (
//           <ProductCarsoule
//             products={recentlyProducts}
//             sectionHref="/shop?newProduct=t"
//             sectionTitle="اضيفت مؤخرا"
//           />
//         )}
//         <div className="mb-10" />
//         <ShoppingNow />
//       </div>
//       {/* <div className="my-10">
//         {allEcommrce && allEcommrce?.data?.items?.length > 0 && (
//           <AllEShops AllEShops={allEcommrce} />
//         )}
//       </div> */}
//       {/* <Feature /> */}
//     </section>
//   );
// }

 
import { getApi } from "@/lib/http";
import { Product, Store } from "@/types/storeTypes";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
import StoresCarsoule from "./components/sections/StoresCarsoule";
import Hero from "./components/sections/Hero/Hero";
import CategoriesSlider from "./components/CategoriesSlider";
import { Suspense } from "react";
import ProductCarsoule from "@/components/ProductCarsoule";
import ShoppingNow from "./components/sections/shopping-now";
import Categories from "./components/sections/Categories";

 
// const AllEShops = dynamic(() => import("./components/sections/all-Eshops"));

export const dynamic = "force-dynamic";

const LoadingFallback = () => (
  <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />
);

export default async function Home() {
  let categories = null;
  let allStores = null;
  // let allEcommrce = null;
  let offersProducts = null;
  let bestSellerInWeek = null;
  let recentlyProducts = null;

  try {
    const [
      categoriesResult,
      allStoresResult,
      // allEcommrceResult,
      offersProductsResult,
      bestSellerInWeekResult,
      recentlyProductsResult,
    ] = await Promise.allSettled([
      getApi<{ data: any[] }>(
        "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000",
        {}
      ),
      getApi<{ data: Store[] }>(
        "Market/Store/GetAllStoresForViewInSliderInMarketHomePage"
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

    categories =
      categoriesResult.status === "fulfilled"
        ? categoriesResult.value.data.map(normalizeCategory)
        : null;

    allStores =
      allStoresResult.status === "fulfilled" ? allStoresResult.value : null;

    offersProducts =
      offersProductsResult.status === "fulfilled"
        ? offersProductsResult.value?.data?.map(normalizeProduct)
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
      <div className="w-full xl:container mx-auto">
          <CategoriesSlider />
      </div>
      
        <Hero />
      
      <div className="w-full xl:container mx-auto">
        {categories && categories?.length > 0 && (
          <Suspense fallback={<LoadingFallback />}>
            <Categories categories={categories} />
          </Suspense>
        )}
      </div>
      
      {offersProducts && offersProducts?.length > 0 && (
        <Suspense fallback={<LoadingFallback />}>
          <ProductCarsoule
            products={offersProducts}
            sectionHref="/shop?todayOffer=t"
            sectionTitle="عروض اليوم"
          />
        </Suspense>
      )}
      
      <Suspense fallback={<LoadingFallback />}>
        <ShoppingNow />
      </Suspense>
      
      <div className="my-10">
        {allStores && allStores?.data?.length > 0 && (
          <Suspense fallback={<LoadingFallback />}>
            <StoresCarsoule allStores={allStores?.data} />
          </Suspense>
        )}
      </div>
      
      {bestSellerInWeek && bestSellerInWeek?.length > 0 && (
        <Suspense fallback={<LoadingFallback />}>
          <ProductCarsoule
            products={bestSellerInWeek}
            sectionHref="/shop?bestseller=true"
            sectionTitle="الاكثر مبيعا في اسبوع"
          />
        </Suspense>
      )}
      
      <div>
        {recentlyProducts && recentlyProducts?.length > 0 && (
          <Suspense fallback={<LoadingFallback />}>
            <ProductCarsoule
              products={recentlyProducts}
              sectionHref="/shop?newProduct=t"
              sectionTitle="اضيفت مؤخرا"
            />
          </Suspense>
        )}
        
        <div className="mb-10" />
        
        <Suspense fallback={<LoadingFallback />}>
          <ShoppingNow />
        </Suspense>
      </div>
    </section>
  );
};
 