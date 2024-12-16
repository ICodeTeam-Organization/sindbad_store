import { MainCategory } from '@/types/storeTypes';
import { create } from 'zustand';

interface CategoriesDataState {
  categories: MainCategory[];
  setCategories: (categories: MainCategory[]) => void;
}

export const useCategoriesDataStore = create<CategoriesDataState>((set) => {

  const isClient = typeof window !== 'undefined';

  return {
    categories: [],
    setCategories: (categories) => {
      if (isClient) localStorage.setItem('categories', JSON.stringify(categories));
      set({ categories });
    },

  };
});