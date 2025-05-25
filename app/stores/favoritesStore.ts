import { storeInBgcache } from "@/lib/utils";
import { create } from "zustand";

// // ✅ هذا النوع يمثل البيانات التي سنخزنها في localStorage
// type BgHandlerDataItemType = {
//   reqType: number;      // 1 = منتج، 2 = متجر، 3 = eCommerce
//   reqValue: number;     // 1 = إضافة، 0 = حذف
//   Id: number | string;  // معرف العنصر
//   reviewText: string | null; // حاليًا null
// };

// const storeInBgcache = (item: BgHandlerDataItemType) => {
//   const key = "backgroundHandlerData";
//   const existing: BgHandlerDataItemType[] = JSON.parse(localStorage.getItem(key) || "[]");

//   // ✅ حذف أي عنصر بنفس reqType و Id
//   // عشان مايكرر ارسال الركوست
//   const filtered = existing.filter(
//     (entry) => !(entry.reqType === item.reqType && entry.Id === item.Id)
//   );

//   // ✅ إضافة العنصر الجديد
//   const updated = [...filtered, item];
//   localStorage.setItem(key, JSON.stringify(updated));
// };


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

  // ✅ إضافة تخزين البيانات عند الإضافة
  addProductToFavorite: (id) => {
    storeInBgcache({ reqType: 1, reqValue: 1, Id: id, reviewText: null, prevValue:0}); // <-- جديد
    set((state) => ({ ...state, productsIds: [...state.productsIds, id] }));
  },

  // ✅ إضافة تخزين البيانات عند الحذف
  delProductFromFavorite: (id) => {
    storeInBgcache({ reqType: 1, reqValue: 0, Id: id, reviewText: null,prevValue:1 }); // <-- جديد
    set((state) => ({
      ...state,
      productsIds: state.productsIds.filter((item) => item !== id),
    }));
  },

  setFavoriteStoreIds: (ids) =>
    set((state) => ({ ...state, favoriteStoreIds: [...ids] })),

  // ✅ إضافة تخزين البيانات عند الإضافة
  addStoreToFavorite: (id) => {
    // storeInBgcache({ reqType: 2, reqValue: 1, Id: id, reviewText: null }); // <-- جديد
    set((state) => ({
      ...state,
      favoriteStoreIds: [...state.favoriteStoreIds, id],
    }));
  },

  // ✅ إضافة تخزين البيانات عند الحذف
  delStoreToFavorite: (id) => {
    // storeInBgcache({ reqType: 2, reqValue: 0, Id: id, reviewText: null }); // <-- جديد
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
    // storeInBgcache({ reqType: 3, reqValue: 1, Id: id, reviewText: null }); // <-- جديد
    set((state) => ({
      ...state,
      favoriteEcommerceIds: [...state.favoriteEcommerceIds, id],
    }));
  },

  // ✅ إضافة تخزين البيانات عند الحذف
  delEcommerceFromFavorite: (id) => {
    // storeInBgcache({ reqType: 3, reqValue: 0, Id: id, reviewText: null }); // <-- جديد
    set((state) => ({
      ...state,
      favoriteEcommerceIds: state.favoriteEcommerceIds.filter(
        (item) => item !== id
      ),
    }));
  },
}));
