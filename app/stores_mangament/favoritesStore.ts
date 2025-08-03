import { savebackgroundDataInCache } from "@/Data/cachingAndBgData/backgroundData";
import { create } from "zustand";
 

type FavoriteState = {
  productsIds: number[];
  favoriteStoreIds: string[];
  favoriteEcommerceIds: number[];
  pageNumber: number;
  pageSize: number;

  setFavoriteProducts: (ids: number[]) => void;
  addProductToFavorite: (id: number) => void;
  delProductFromFavorite: (id: number) => void;

  setFavoriteStoreIds: (ids: string[]) => void;
  addStoreToFavorite: (id: string) => void;
  delStoreToFavorite: (id: string) => void;

  setFavoriteEcommerceIds: (ids: number[]) => void;
  addEcommerceToFavorite: (id: number) => void;
  delEcommerceFromFavorite: (id: number) => void;
};

export const useFavorite = create<FavoriteState>((set) => ({
  productsIds: [],
  favoriteStoreIds: [],
  favoriteEcommerceIds: [],
  pageNumber: 1,
  pageSize: 50,

  setFavoriteProducts: (ids) =>
    set((state) => ({ ...state, productsIds: [...ids] })), 
  addProductToFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 1, reqValue: 1, Id: id, reviewText: null, primaryValue:0})
    set((state) => ({ ...state, productsIds: [...state.productsIds, id] }));
  }, 
  delProductFromFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 1, reqValue: 0, Id: id, reviewText: null,primaryValue:1 })
    set((state) => ({
      ...state,
      productsIds: state.productsIds.filter((item) => item !== id),
    }));
  },

  setFavoriteStoreIds: (ids) =>{
    
    set((state) => ({ ...state, favoriteStoreIds: [...ids] }))
  },

  // ✅ إضافة تخزين البيانات عند الإضافة
  addStoreToFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 5, reqValue: 1, Id: id, reviewText: id, primaryValue:0})
    set((state) => ({
      ...state,
      favoriteStoreIds: [...state.favoriteStoreIds, id],
    }));
  },

  // ✅ إضافة تخزين البيانات عند الحذف
  delStoreToFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 5, reqValue: 0, Id: 0, reviewText: id, primaryValue:1}) 
    set((state) => ({
      ...state,
      favoriteStoreIds: state.favoriteStoreIds.filter((item) => item !== id),
    }));
  },

  setFavoriteEcommerceIds: (ids) =>
    set((state) => ({
      ...state,
      favoriteEcommerceIds: Array.isArray(ids) ? [...ids] : [],
    })),

  // ✅ إضافة تخزين البيانات عند الإضافة
  addEcommerceToFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 6, reqValue: 1, Id: id, reviewText: null, primaryValue:0})
    set((state) => ({
      ...state,
      favoriteEcommerceIds: [...state.favoriteEcommerceIds, id],
    }));
  },

  // ✅ إضافة تخزين البيانات عند الحذف
  delEcommerceFromFavorite: (id) => {
    savebackgroundDataInCache({ reqType: 6, reqValue: 0, Id: id, reviewText: null, primaryValue:0}) 
    set((state) => ({
      ...state,
      favoriteEcommerceIds: state.favoriteEcommerceIds.filter(
        (item) => item !== id
      ),
    }));
  },
}));
