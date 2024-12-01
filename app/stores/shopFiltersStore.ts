import { create } from "zustand";

type PriceRange = {
  from: number;
  to: number;
};

type ShopFiltersStore = {
  filters: {
    price: PriceRange;
    storeId: number;
    categoryId: number;
    productName: string;
    hasOffer: boolean;
    pageNumber: number;
    pageSize: number;
  };
  setPriceRange: (range: PriceRange) => void;
  setStoreId: (id: number) => void;
  setCategoryId: (id: number) => void;
  setProductName: (name: string) => void;
  setHasOffer: (hasOffer: boolean) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
};

export const useShopFiltersStore = create<ShopFiltersStore>((set) => ({
  filters: {
    price: {
      from: 0,
      to: 10000,
    },
    storeId: 0,
    categoryId: 0,
    productName: "",
    hasOffer: false,
    pageNumber: 1,
    pageSize: 50,
  },
  setPriceRange: (range) =>
    set((state) => ({
      filters: {
        ...state.filters,
        price: range,
      },
    })),
  setStoreId: (id) =>
    set((state) => ({
      filters: {
        ...state.filters,
        storeId: id,
      },
    })),
  setCategoryId: (id) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categoryId: id,
      },
    })),
  setProductName: (name) =>
    set((state) => ({
      filters: {
        ...state.filters,
        productName: name,
      },
    })),
  setHasOffer: (hasOffer) =>
    set((state) => ({
      filters: {
        ...state.filters,
        hasOffer,
      },
    })),
  setPageNumber: (page) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pageNumber: page,
      },
    })),
  setPageSize: (size) =>
    set((state) => ({
      filters: {
        ...state.filters,
        pageSize: size,
      },
    })),
  resetFilters: () =>
    set(() => ({
      filters: {
        price: {
          from: 0,
          to: 10000,
        },
        storeId: 0,
        categoryId: 0,
        productName: "",
        hasOffer: false,
        pageNumber: 1,
        pageSize: 50,
      },
    })),
}));
