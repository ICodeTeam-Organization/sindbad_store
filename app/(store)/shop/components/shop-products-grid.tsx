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

  const { filters } = useShopFiltersStore();
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
          productName: filters.productName , 
        };
        // Remove fields that have invalid values (0 or empty string)
        // const filteredBody = Object.fromEntries(
        //   Object.entries(body).filter(([key, value]) => {
        //     // Only keep the entries where value is not 0 or empty string
        //     return value !== 0 && value !== "";
        //   })
        // );
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
    

    useEffect(() => {
      if (firstRender) {setfirstRender(false);return;}
       mutation.mutate()
    }, [filters])
    

  
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
