"use client"
import React, { useEffect, useState } from "react";
import ShopProductsCard from "./shop-products-card";
import ProductCard from "@/app/(home)/components/product-card";
import { Product } from "@/types/storeTypes";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/lib/http";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useSession } from "next-auth/react";
import { useSearchParams,useRouter } from "next/navigation";
// import product from '../../../../public/images/product.svg';

// const products = [
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 250.00,
//     oldPrice: 350.00
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 250.00,
//     oldPrice: 350.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
//   {
//     image: product,
//     title: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
//     price: 450.00,
//     oldPrice: 550.00,
//   },
// ];

type ProductsResponsive = {
  data:{
    items:Product[]
  }
}

const ShopProductsGrid = ({ allProducts }: any) => {

  const params = useSearchParams()
  const router = useRouter();
  const skw = params.get("skw");

  const { filters , resetFilters , setFiltersFromObject } = useShopFiltersStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [firstRender, setfirstRender] = useState(true)
    const mutation = useMutation<ProductsResponsive>({
      mutationFn: async () => {
        const body = {
          storeProductsFilter: 1, 
          pageNumber: filters.pageNumber,  
          pageSize: filters.pageSize,  
          hasOffer: filters.hasOffer,   
          categoryId: filters.categoryId ,  
          storeId: filters.storeId + "",       
          productName: filters.pageNumber , 
        };
        // Remove fields that have invalid values (0 or empty string)
        const filteredBody = Object.fromEntries(
          Object.entries(body).filter(([key, value]) => {
            // Only keep the entries where value is not 0 or empty string
            return value !== 0 && value !== "" && value;
          })
        );
        console.log("body : ",filteredBody);
        
        const response = await postApi(
          `Products/Store/GetStoreProductsWitheFilter`,
          {
            body: body
          }
        );
        return response as ProductsResponsive; 
      },
      onSuccess: (data) => {
        console.log('Mutation successful', data?.data?.items);
        setProducts(data?.data?.items || [])
      },
      onError: (error) => {
        console.error('Mutation failed h>', error);
      },
    });

    const initialFilters = {
      price: [0, 10000],
      storeId: "",
      categoryId: 0,
      productName: "",
      hasOffer: "f",
      newProduct: "f",
    };
    const updateQueryParams = () => {
      const newParams = new URLSearchParams();
      // Loop through the filters and check if they are different from initial values
      Object.entries(filters).forEach(([key, value]) => {

        // Skip page and pageSize
        if (key === "pageNumber" || key === "pageSize") return;
        // Check if the current value is different from the initial value
        if (JSON.stringify(value) !== JSON.stringify(initialFilters[key as keyof typeof initialFilters])) {
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
    
    // To set query search when change values
    useEffect(() => {
      if (firstRender) {setfirstRender(false);return;}
       updateQueryParams()
       mutation.mutate()
    }, [filters])

    const initializeFiltersFromParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
  
      const updatedFilters = { ...initialFilters } ;
  
      // Loop through the searchParams and update the filters state
      for (const [key, value] of searchParams.entries()) {
        if (key === "price") {
          updatedFilters.price = value.split(',').map(Number); // Price is an array
        } else {
          updatedFilters[key] = value;
        }
      }
  
      // Set the updated filters state
      console.log(updatedFilters,"dbhbhdbdh");
      
      setFiltersFromObject(updatedFilters)
      // setFilters(updatedFilters);
    };
  
    // Use effect to initialize the filters state on component mount
    useEffect(() => {
      if (!firstRender) {setfirstRender(false);return;}
      initializeFiltersFromParams();
    }, [params]);
    
    // To rest filter state when close page 
    useEffect(() => {
      return () => {
        resetFilters()
      }
    }, [])
    

  
  return (
    <div className="mb-12 flex flex-wrap  justify-center gap-6">
      {
      !mutation.isPending ?
      products?.length > 0 ? (
        products?.map((product: Product, index: number) => {
          return <div key={product.id} className="sm:w-[220px]  w-[180px] " >
          
                <ProductCard
                  id={product.id+""} 
                  ProductDet={+product.id}
                  image={product.mainImageUrl}
                  price={product.price}
                  productName={product.name}
                  // oldPrice={product.}
                />
          </div>
})
      ) : (
        <div className="h-[65vh] flex items-center justify-center" >
            <p className="text-center text-lg tajawal font-bold py-12">
              لايتوفر أي منتج في الوقت الحالي
            </p>
        </div>
      )
      : [...Array(10)].map((_,x)=>(
        <div key={x.toString()} className="sm:w-[220px]  w-[180px] " >
          <ProductCardSkeleton  />
        </div>
      ))
    }
    </div>
  );
};

export default ShopProductsGrid;
