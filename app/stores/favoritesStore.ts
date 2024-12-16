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

  addProductToFavorite: (id) =>
    set((state) => ({ ...state, productsIds: [...state.productsIds, id] })),

  delProductFromFavorite: (id) =>
    set((state) => ({
      ...state,
      productsIds: state.productsIds.filter((item) => item !== id),
    })),

  setFavoriteStoreIds: (ids) =>
    set((state) => ({ ...state, favoriteStoreIds: [...ids] })),

  addStoreToFavorite: (id) =>
    set((state) => ({ ...state, favoriteStoreIds: [...state.favoriteStoreIds, id] })),

  delStoreToFavorite: (id) =>
    set((state) => ({
      ...state,
      favoriteStoreIds: state.favoriteStoreIds.filter((item) => item !== id),
    })),

  setFavoriteEcommerceIds: (ids) =>
    set((state) => ({ ...state, favoriteEcommerceIds: Array.isArray(ids) ? [...ids] : [] })),

  addEcommerceToFavorite: (id) =>
    set((state) => ({ ...state, favoriteEcommerceIds: [...state.favoriteEcommerceIds, id] })),

  delEcommerceFromFavorite: (id) =>
    set((state) => ({
      ...state,
      favoriteEcommerceIds: state.favoriteEcommerceIds.filter((item) => item !== id),
    })),
}));
