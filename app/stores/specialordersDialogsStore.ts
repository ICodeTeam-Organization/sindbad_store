import { create } from 'zustand';

interface specialordersDialogsStoreStateTypes {
  showSpecialOrderDialog: boolean;
  setShowSpecialOrderDialog: (status: boolean) => void;
  showSpecialOrderWholeSalesDialog: boolean;
  setshowSpecialOrderWholeSalesDialog: (status: boolean) => void;
  tab?: number; // التاب الخاص بالطلب الخاص 1 للمنتج و 2 للخدمة و 3 للرابط متجر
  // التاب للطلب بالجملة بيكون 200 للطلب من داخل السعودية و 100 من خارج السعودية
  setTab: (tab?: number) => void;
  category?: number;
  setCategory: (category?: number) => void;
  ecommerceId?: number;
  setEcommerceId: (ecommerceId?: number) => void;
  reset: () => void;
  setSpecialOrderState: (status: boolean, tab?: number, category?: number, ecommerceId?: number) => void;
  setWholeSalesOrderState: (status: boolean, tab?: number, category?: number) => void;
}

export const useSpecialOrdersDialogsStore = create<specialordersDialogsStoreStateTypes>((set) => ({
  showSpecialOrderDialog: false,
  setShowSpecialOrderDialog: (status) => set({ showSpecialOrderDialog: status }),

  showSpecialOrderWholeSalesDialog: false,
  setshowSpecialOrderWholeSalesDialog: (status) => set({ showSpecialOrderWholeSalesDialog: status }),

  tab: undefined,
  setTab: (tab) => set({ tab }),

  category: undefined,
  setCategory: (category) => set({ category }),

  ecommerceId: undefined,
  setEcommerceId: (ecommerceId) => set({ ecommerceId }),

  reset: () => set({
    showSpecialOrderDialog: false,
    showSpecialOrderWholeSalesDialog: false,
    tab: undefined,
    category: undefined,
    ecommerceId: undefined,
  }),

  setSpecialOrderState: (status, tab, category, ecommerceId) => {
    return set({
      showSpecialOrderDialog: status,
      tab,
      category,
      ecommerceId,
    });
  },

  setWholeSalesOrderState: (status, tab, category) => set({
    showSpecialOrderWholeSalesDialog: status,
    tab,
    category,
  }),
}));
