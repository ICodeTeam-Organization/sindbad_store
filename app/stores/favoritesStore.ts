import { FavoriteEcommerces, FavoriteStores } from "@/types/storeTypes";
import { create } from "zustand";


type FavoriteState = {
  productsIds: number[];
  favoriteStores: FavoriteStores[];
  favoriteEcommrces: FavoriteEcommerces[];
  pageNumber: number;
  pageSize: number;
  setFavoriteProducts: (ids: number[]) => void;
  addProductToFavorite: (id: number) => void;
  delProductFromFavorite: (id: number) => void;
  setFavoriteStores: (stores: FavoriteStores[]) => void;
  addStoreToFavorite: (store: FavoriteStores) => void;
  delStoreToFavorite: (id: string) => void;
  setFavoriteEcommrces: (ecommrces: FavoriteEcommerces[]) => void;
  addEcommrceToFavorite: (ecommerce: FavoriteEcommerces) => void;
  delEcommrceFromFavorite: (id: number) => void;
};

export const useFavorite = create<FavoriteState>((set) => ({
  productsIds: [],
  favoriteStores: [],
  favoriteEcommrces: [],
  pageNumber: 1,
  pageSize: 50,

  setFavoriteProducts: (ids) =>
    set((state) => ({ ...state, productsIds: [...ids] })),

  addProductToFavorite: (id) =>
    set((state) => ({ ...state, productsIds: [...state.productsIds, id] })),

  delProductFromFavorite: (id) =>
    set((state) => ({
      ...state,
      productsIds: state.productsIds.filter((item) => item !== id),
    })),

  setFavoriteStores: (stores) =>
    set((state) => ({ ...state, favoriteStores: [...stores] })),

  addStoreToFavorite: (store) =>
    set((state) => ({ ...state, favoriteStores: [...state.favoriteStores, store] })),

  delStoreToFavorite: (id) =>
    set((state) => ({
      ...state,
      favoriteStores: state.favoriteStores.filter((item) => item.storeId !== id),
    })),

  setFavoriteEcommrces: (ecommrces) =>
    set((state) => ({ ...state, favoriteEcommrces: [...ecommrces] })),

  addEcommrceToFavorite: (ecommerce) =>
    set((state) => ({ ...state, favoriteEcommrces: [...state.favoriteEcommrces, ecommerce] })),

  delEcommrceFromFavorite: (id) =>
    set((state) => ({
      ...state,
      favoriteEcommrces: state.favoriteEcommrces.filter((item) => item.ecommerceStoreId !== id),
    })),
}));
