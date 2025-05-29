"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/(home)/components/product-card";
import { Product } from "@/types/storeTypes";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import SearchResultsHeader from "./search-results-header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsSearch } from "react-icons/bs";

type ProductsResponsive = {
  data: {
    items: Product[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
};

const ShopProductsGrid = () => {
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
    setProductName,
    setOrderBy,
  } = useShopFiltersStore();
  const [product_name_for_subinput, setProduct_name_for_subinput] = useState(filters.productName)

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
        hasOffer: filters.hasOffer == "t",
        // todayOffers: filters.todayOffer == "t",
        storeId: filters.storeId || null,
        productName: filters.productName || null,
        minPrice: filters.price[0],
        maxPrice: filters.price[1],
        categories:[...filters.cats.map((id) => +id),...filters.subCats.map((id) => +id)],
        // mainCategories: [...filters.cats.map((id) => +id)],
        // subCategories: [...filters.subCats.map((id) => +id)],
        brandId: filters.brandId || null,
        tags: filters.tagId ? [filters.tagId] : null,
        orderBy: filters.orderBy || 0,
      };

      // Remove fields that have invalid values (0 or empty string)
      const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([, value]) => {
          // Only keep the entries where value is not 0 or empty string
          return value !== 0 && value !== "" && value !== null && value;
        })
      );

      const response = await postApi(
        `Products/GetProductsWitheFilter?returnDtoName=2`,
        {
          body: {...filteredBody,orderBy:filteredBody.orderBy || 0},
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
  const totalCount = data?.pages[0]?.data?.totalCount;

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


  const handleSearch = () => { 
    setProductName(product_name_for_subinput);
   }

  return (
    <>
      {!isPending && (
        <div className="mdHalf::mx-0 mx-4  ">
          <div className="mb-4 mdHalf:flex  items-center justify-between gap-x-4 بمث ">
            <div className="flex justify-between items-center flex-1  border border-gray-300 rounded-md p-2 mdHalf:mb-0 mb-4 "  >
              <input
                placeholder="ابحث عن منتج"
                value={product_name_for_subinput}
                className="outline-none w-full "
                onChange={(e) => {
                  setProduct_name_for_subinput(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <BsSearch className="mx-2 cursor-pointer" onClick={ handleSearch} />
            </div>
            <Select
              dir="rtl"
              defaultValue={filters.orderBy?.toString()|| "0"} // Ensure it matches the correct value type
              onValueChange={(e) => {
                console.log(e);
                setOrderBy(+e);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ترتيب حسب</SelectLabel>
                  <SelectItem value="0">الكل</SelectItem>
                  <SelectItem value="1">التقييم تصاعدي</SelectItem>
                  <SelectItem value="2">التقييم تنازلي</SelectItem>
                  <SelectItem value="3">التاريخ تصاعدي</SelectItem>
                  <SelectItem value="4">التاريخ تنازلي</SelectItem>
                  <SelectItem value="5">السعر تصاعدي</SelectItem>
                  <SelectItem value="6">السعر تنازلي</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          <SearchResultsHeader totalResults={totalCount} />
        </div>
      )}
      <div className="mb-12 flex flex-wrap  justify-center mdHalf:gap-6  gap-3">
        {!isPending ? (
          data?.pages && data?.pages?.length > 0 ? (
            data?.pages?.map((page, x) => {
              if (page?.data?.items?.length == 0 && isFetched) {
                return (
                  <div
                    key={x}
                    className="h-[65vh] flex items-center justify-center"
                  >
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
                      !!product.priceAfterDiscount
                        ? product.priceAfterDiscount
                        : product.priceBeforeDiscount
                    }
                    oldPrice={
                      product.priceAfterDiscount
                        ? product.priceBeforeDiscount
                        : null
                    }
                    productName={product.name}
                    offerSentence={product.buyAndGet}
                    rate={product.rate}
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
