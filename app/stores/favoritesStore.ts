import { create } from "zustand";

type FavoriteState = {
  productsIds: number[];
  pageNumber:number,
  pageSize:number,
  setFavoriteProducts:(ids:number[])=>void,
  addproductToFavorite:(id:number)=>void,
  delProductToFavorite:(id:number)=>void,
};

export const useFavorite = create<FavoriteState>((set) => ({
 productsIds: [],
 pageNumber:1,
 pageSize:50,
 setFavoriteProducts:(ids)=>
    set(o=>({...o,productsIds:[...ids]}))
 ,
 addproductToFavorite:(id:number)=>
   set(o=>({...o,productsIds:[...o.productsIds,id]}))
 ,
 delProductToFavorite:(id:number)=>
    set(o=>({...o,productsIds:o.productsIds.filter(fl=>fl != id)}))
 ,

}));