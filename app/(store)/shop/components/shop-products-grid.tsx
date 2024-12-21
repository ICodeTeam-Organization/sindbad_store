"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/(home)/components/product-card";
import { Product } from "@/types/storeTypes";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

type ProductsResponsive = {
  data: {
    items: Product[];
    currentPage: number;
    totalPages: number;
  };
};

const ShopProductsGrid = ({ allProducts }: any) => {
  const router = useRouter();

  const { ref: footerRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });

  const {
    filters,
    resetFilters,
    setFiltersFromObject,
    initState: initialFilters,
  } = useShopFiltersStore();

  const [firstRender, setfirstRender] = useState(true);

  const {
    isPending,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetched,
  } = useInfiniteQuery<ProductsResponsive>({
    queryKey: ["GetProductsWitheFilter", filters],
    queryFn: async ({ pageParam }) => {
      const body = {
        pageNumber: pageParam || 1,
        pageSize: filters.pageSize,
        todayOffers: filters.hasOffer == "t",
        storeId: filters.storeId || "",
        productName: filters.productName || "",
        minPrice: filters.price[0],
        maxPrice: filters.price[1],
        mainCategories: [...filters.cats.map((id) => +id)],
        subCategories: [...filters.subCats.map((id) => +id)],
      };
      // Remove fields that have invalid values (0 or empty string)
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => {
          // Only keep the entries where value is not 0 or empty string
          return value !== 0 && value !== "" && value;
        })
      );

      console.log("filteredBody of filters shop", filteredBody);

      const response = await postApi(
        `Products/GetProductsWitheFilter?returnDtoName=2`,
        {
          body: filteredBody,
        }
      );
      return response as ProductsResponsive;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.data.currentPage < lastPage?.data.totalPages) {
        return lastPage?.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const updateQueryParams = () => {
    const newParams = new URLSearchParams();
    // Loop through the filters and check if they are different from initial values
    Object.entries(filters).forEach(([key, value]) => {
      // Skip page and pageSize
      if (key === "pageNumber" || key === "pageSize") return;
      // Check if the current value is different from the initial value
      if (
        JSON.stringify(value) !==
          JSON.stringify(initialFilters[key as keyof typeof initialFilters]) &&
        value
      ) {
        // If value is an array, join it as a string (e.g., for price range)
        if (Array.isArray(value)) {
          newParams.set(key, value.join(","));
        } else {
          newParams.set(key, value.toString());
        }
      }
    });

    // Update the URL with the new query parameters
    router.replace(`?${newParams.toString()}`);
  };

  // to set filters from query params in state
  const initializeFiltersFromParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const updatedFilters: any = { ...initialFilters };

    // Loop through the searchParams and update the filters state
    for (const [key, value] of searchParams.entries() as any) {
      if (key === "price") {
        updatedFilters.price = value.split(",").map(Number); // Price is an array
      } else if (key === "cats" || key === "subCats") {
        // Parse cats and subCats as arrays
        updatedFilters[key] = value.split(",").map(String);
      } else {
        updatedFilters[key] = value;
      }
    }
    // Set the updated filters state

    setFiltersFromObject(updatedFilters);
    // setFilters(updatedFilters);
  };

  useEffect(() => {
    // for skip first render
    if (firstRender) {
      setfirstRender(false);
      return;
    }
    // To set query search when change valuesx
    updateQueryParams();
    // mutate function to get data when filter change
    //  mutation.mutate()
  }, [filters]);

  useEffect(() => {
    // Use effect to initialize the filters state on component mount for first time when open page
    if (!firstRender) {
      setfirstRender(false);
      return;
    }
    initializeFiltersFromParams();
    // To rest filter state when close page
    return () => {
      resetFilters();
    };
  }, []);

  // To fetch more data when scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="mb-12 flex flex-wrap  justify-center mdHalf:gap-6  gap-3">
        {!isPending ? (
          data?.pages && data?.pages?.length > 0 ? (
            data?.pages?.map((page) => {
              if (page?.data?.items?.length == 0 && isFetched) {
                return (
                  <div className="h-[65vh] flex items-center justify-center">
                    <p className="text-center text-lg tajawal font-bold py-12">
                      لايتوفر أي منتج في الوقت الحالي
                    </p>
                  </div>
                );
              }

              return page.data.items.map((product: any) => (
                <div key={product.id} className="sm:w-[220px]  w-[180px] ">
                  <ProductCard
                    id={product.id + ""}
                    ProductDet={+product.id}
                    image={product.mainImageUrl}
                    price={
                      product.priceAfterDiscount
                        ? product.priceAfterDiscount
                        : product.priceBeforeDiscount
                    }
                    oldPrice={product.priceBeforeDiscount}
                    productName={product.name}
                  />
                </div>
              ));
            })
          ) : (
            <div className="h-[65vh] flex items-center justify-center">
              <p className="text-center text-lg tajawal font-bold py-12">
                لايتوفر أي منتج في الوقت الحالي
              </p>
            </div>
          )
        ) : (
          [...Array(10)].map((_, x) => (
            <div key={x.toString()} className="sm:w-[220px]  w-[180px] ">
              <ProductCardSkeleton />
            </div>
          ))
        )}

        {isFetchingNextPage &&
          [...Array(6)].map((_, x) => (
            <div key={x.toString()} className="sm:w-[220px]  w-[180px] ">
              <ProductCardSkeleton />
            </div>
          ))}
      </div>

      <div ref={footerRef} style={{ height: "50px" }} />
    </>
  );
};

export default ShopProductsGrid;
