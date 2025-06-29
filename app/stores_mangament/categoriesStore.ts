import { NormalizedCategoryType } from '@/Data/normalizTypes'; 
import { create } from 'zustand';

interface CategoriesDataState {
  categories: NormalizedCategoryType[];
  isFechingCategories:boolean;
  setCategories: (categories: NormalizedCategoryType[]) => void;
}

export const useCategoriesDataStore = create<CategoriesDataState>((set) => { 
  // const isClient = typeof window !== 'undefined'; 

  return {
    categories: [],
    isFechingCategories:true,
    setCategories: (categories) => { 
      set({ categories , isFechingCategories: false });
    },

  };
});