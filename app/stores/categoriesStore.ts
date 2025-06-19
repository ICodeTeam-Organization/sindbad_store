import { NormalizedCategoryType } from '@/Data/normalizTypes'; 
import { create } from 'zustand';

// TODO ممكن احذفها اذا تم حفظ الفئات في ال local db


interface CategoriesDataState {
  categories: NormalizedCategoryType[];
  isFechingCategories:boolean;
  setCategories: (categories: NormalizedCategoryType[]) => void;
}

export const useCategoriesDataStore = create<CategoriesDataState>((set) => { 
  const isClient = typeof window !== 'undefined'; 

  return {
    categories: [],
    isFechingCategories:true,
    setCategories: (categories) => {
      if (isClient) localStorage.setItem('categories', JSON.stringify(categories));
      set({ categories , isFechingCategories: false });
    },

  };
});