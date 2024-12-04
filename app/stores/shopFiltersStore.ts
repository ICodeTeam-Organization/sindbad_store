import { create } from "zustand";

type PriceRange = {
  from: number;
  to: number;
};

type ShopFiltersStore = {
  filters: {
    price: [number, number];
    storeId: string;
    categoryId: number;
    productName: string;
    hasOffer: string;
    newProduct: string;
    pageNumber?: number;
    pageSize?: number;
  };
  setPriceRange: (range: [number, number]) => void;
  setStoreId: (id: string) => void;
  setCategoryId: (id: number) => void;
  setProductName: (name: string) => void;
  setHasOffer: (hasOffer: string) => void;
  setNewProduct: (newPro: string) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
  setFiltersFromObject: (newFilters: ShopFiltersStore['filters']) => void;
};

export const useShopFiltersStore = create<ShopFiltersStore>((set) => ({
  filters: {
    price: [0, 1000],
    storeId: "",
    categoryId: 0,
    productName: "",
    hasOffer: "f",
    newProduct: "f",
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
  setNewProduct: (newPro) =>
    set((state) => ({
      filters: {
        ...state.filters,
        newProduct: newPro,
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
        price: [0, 10000],
        storeId: "",
        categoryId: 0,
        productName: "",
        hasOffer: "f",
        newProduct: "f",
        pageNumber: 1,
        pageSize: 50,
      },
    })),

  // Function to set filters from an object
  setFiltersFromObject: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters, // Merge new filters into the current state
      },
    })),
}));
