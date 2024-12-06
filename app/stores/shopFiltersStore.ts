import { create } from "zustand";

type ShopFiltersStore = {
  filters: {
    price: [number, number];
    storeId: string;
    cats: string[]; 
    subCats: string[]; 
    productName: string;
    hasOffer: string;
    newProduct: string;
    pageNumber: number;
    pageSize: number;
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
  };
  setPriceRange: (range: [number, number]) => void;
  setStoreId: (id: string) => void;
  setCats: (cats: string[]) => void;
  setSubCats: (subCats: string[]) => void;
  setProductName: (name: string) => void;
  setHasOffer: (hasOffer: string) => void;
  setNewProduct: (newPro: string) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
  setFiltersFromObject: (newFilters: ShopFiltersStore['filters']) => void;
  toggleCat:(cat:string)=>void
  toggleSubCat:(subCat:string)=>void
};

const initState = {
  price: [0, 1000] as [number, number],
  storeId: "",
  cats: [] as string[],
  subCats: [] as string[],
  productName: "",
  hasOffer: "f",
  newProduct: "f",
  pageNumber: 1,
  pageSize: 30,
};

export const useShopFiltersStore = create<ShopFiltersStore>((set) => ({
  filters: {
    price: [0, 1000],
    storeId: "",
    cats: [], 
    subCats: [], 
    productName: "",
    hasOffer: "f",
    newProduct: "f",
    pageNumber: 1,
    pageSize: 30,
  },
  initState,

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
      filters: { ...initState },
    })),

  setFiltersFromObject: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  // Toggle a category in cats
  toggleCat: (cat:string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        cats: state.filters.cats.includes(cat)
          ? state.filters.cats.filter((c) => c !== cat) // Remove if exists
          : [...state.filters.cats, cat], // Add if not exists
      },
    })),

  // Toggle a subcategory in subCats
  toggleSubCat: (subCat:string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        subCats: state.filters.subCats.includes(subCat)
          ? state.filters.subCats.filter((s) => s !== subCat) // Remove if exists
          : [...state.filters.subCats, subCat], // Add if not exists
      },
    })),
}));

