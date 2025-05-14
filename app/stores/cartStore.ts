
// import { CartItem } from "@/types/storeTypes";
// import { create } from "zustand";

// type CartState = {
//   items: CartItem[];
//   addItem: (product: CartItem) => void;
//   removeItem: (id: number) => void; // تغيير id إلى number
//   // increaseQuantity: (id: number) => void; // تغيير id إلى number
//   // decreaseQuantity: (id: number) => void; // تغيير id إلى number
//   updateQuantity: (newQuantity:number,id: number) => void; // تغيير id إلى number
//   setCartItems: (products:CartItem[]) => void; // تغيير id إلى number
// };

// export const useCartStore = create<CartState>((set) => ({
//   items: [],
//   addItem: (newitem) =>
//     set((state) => {
//       const existingItem = state.items.find(ele=>ele.cartId == newitem.cartId);
//       return existingItem
//         ? { items: [...state.items] } // لا تضيف العنصر إذا كان موجودًا
//         : { items: [...state.items, newitem] }; // أضف العنصر الجديد
//     }),
//   removeItem: (id) =>
//     set((state) => ({
//       items: state.items.filter((i) => i.cartId !== id), // استخدم cartId هنا
//     })),
//     updateQuantity: (newQuantity,id)=> {
//       return set((state => ({
//         items: state.items.map((i) =>
//           i.cartId == id ? { ...i, quantity: newQuantity } : i // استخدم cartId هنا
//         ),
//       })))
//     },
//   // increaseQuantity: (id) =>
//   //   set((state) => ({
//       // items: state.items.map((i) =>
//       //   i.productId === id ? { ...i, quantity: i.quantity + 1 } : i // استخدم cartId هنا
//       // ),
//   //   })),
//   // decreaseQuantity: (id) =>
//   //   set((state) => ({
//   //     items: state.items.map((i) =>
//   //       i.cartId === id && i.quantity > 1
//   //         ? { ...i, quantity: i.quantity - 1 }
//   //         : i // استخدم cartId هنا
//   //     ),
//   //   })),
    // setCartItems: (cartItems) =>
    //   set(() => {
    //     return {items:cartItems}
    //   }),
// }));


import { create } from "zustand";
import { CartItem } from "@/types/storeTypes";
import { BgHandlerDataItemType, saveToLocalStorage } from "@/lib/utils";

type CartState = {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (newQuantity: number, id: number) => void;
  setCartItems: (products: CartItem[]) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (newItem) =>
    set((state) => {
      const exists = state.items.find((i) => i.productId == newItem.productId);
      if (exists) return { items: [...state.items] };

      const newWithQty = { ...newItem, quantity: 1 };

      // ✅ إذا المنتج غير موجود، أضفه بكمية 1 وسجّل ذلك في localStorage
      // عشان ارسال ركوست كل عشر ثواني موجود داخل الcomponents in SendDataInBG
      saveToLocalStorage({
        reqType: 3,  
        reqValue: 1,  
        Id: newItem.productId,
        prevValue:0, // القيمة السابقة غير معروفة، لذا نستخدم 0
      });

      return { items: [...state.items, newWithQty] };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.productId == id);
      if (item) {
        // ✅ عند حذف منتج من السلة، احفظ ذلك في localStorage مع reqValue = 0
        saveToLocalStorage({
          reqType: 3,
          reqValue: 0,
          Id: id,
          reviewText: null,
          prevValue: item.quantity,  
        });
      }

      return {
        items: state.items.filter((i) => i.productId !== id),
      };
    }),

  updateQuantity: (newQuantity, id) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.productId == id) {
          const updated = { ...item, quantity: newQuantity };

          // ✅ عند تغيير كمية منتج في السلة، خزّن القيمة الجديدة في localStorage
          saveToLocalStorage({
            reqType: 3,
            reqValue:newQuantity, // نعتبره تعديل/إضافة
            Id: item.productId,
            prevValue: item.quantity, // القيمة السابقة
          });

          return updated;
        }
        return item;
      });

      return { items: updatedItems };
    }),

    setCartItems: (cartItems) =>
      set(() => {
              const bgHandlerData = localStorage.getItem("backgroundHandlerData");
              const data:BgHandlerDataItemType[] = bgHandlerData ? JSON.parse(bgHandlerData) : null; 
              if (bgHandlerData && data) {

                let itemsCart = [...cartItems];

                 itemsCart = cartItems.map((item) => {

                  const foundItem = data.find((i) => i.Id == item.productId);
                  if (foundItem) {
                    return { ...item, quantity: foundItem.reqValue };
                  }
                  return item;  
                });
                return {items:itemsCart};
              }
        return {items:cartItems}
      }),
}));
