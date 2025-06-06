import { create } from "zustand";

type ShopFiltersStore = {
  filters: {
    price: [number, number];
    storeId: string;
    cats: string[];
    subCats: string[];
    productName: string;
    hasOffer: string;
    todayOffer: string;
    newProduct: string;
    pageNumber: number;
    pageSize: number;
    brandId: number | null;
    tagId: number | null;
    orderBy: number | null; // Added orderBy
  };
  initState: {
    price: [number, number];
    storeId: string;
    cats: string[];
    subCats: string[];
    productName: string;
    hasOffer: string;
    newProduct: string;
    pageNumber?: number;
    pageSize?: number;
    brandId: number | null;
    tagId: number | null;
    orderBy: number;  
  };
  setOrderBy: (order: number | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setStoreId: (id: string) => void;
  setCats: (cats: string[]) => void;
  setSubCats: (subCats: string[]) => void;
  setProductName: (name: string) => void;
  setHasOffer: (hasOffer: string) => void; 
  setTodayOffer: (todayOffer: string) => void; 
  setNewProduct: (newPro: string) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  setBrandId: (id: number | null) => void;
  setTagId: (id: number | null) => void;
  resetFilters: () => void;
  setFiltersFromObject: (newFilters: ShopFiltersStore["filters"]) => void;
  toggleCat: (cat: string) => void;
  toggleSubCat: (subCat: string) => void;
};

const initState = {
  price: [1, 20000] as [number, number],
  storeId: "",
  cats: [] as string[],
  subCats: [] as string[],
  productName: "",
  hasOffer: "f",
  todayOffer: "f",
  newProduct: "f",
  pageNumber: 1,
  pageSize: 40,
  brandId: null,
  tagId: null,
  orderBy: 0, // Added orderBy to initState
};

export const useShopFiltersStore = create<ShopFiltersStore>((set) => ({
  filters: {
    ...initState,
  },
  initState,

  setOrderBy: (order) =>
    set((state) => ({
      filters: {
        ...state.filters,
        orderBy: order,
      },
    })),

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

  setCats: (cats) =>
    set((state) => ({
      filters: {
        ...state.filters,
        cats,
      },
    })),

  setSubCats: (subCats) =>
    set((state) => ({
      filters: {
        ...state.filters,
        subCats,
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

  setTodayOffer: (todayOffer) =>
    set((state) => ({
      filters: {
        ...state.filters,
        todayOffer,
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

  setBrandId: (id) =>
    set((state) => ({
      filters: {
        ...state.filters,
        brandId: id,
      },
    })),

  setTagId: (id) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tagId: id,
      },
    })),

  resetFilters: () =>
    set(() => ({
      filters: { ...initState },
    })),

  setFiltersFromObject: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  toggleCat: (cat: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        cats: state.filters.cats.includes(cat)
          ? state.filters.cats.filter((c) => c !== cat)
          : [...state.filters.cats, cat],
      },
    })),

  toggleSubCat: (subCat: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        subCats: state.filters.subCats.includes(subCat)
          ? state.filters.subCats.filter((s) => s !== subCat)
          : [...state.filters.subCats, subCat],
      },
    })),
}));
