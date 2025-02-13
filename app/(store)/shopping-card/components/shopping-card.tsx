import { getApi } from "@/lib/http";
import CartBody from "./cart-body";

import { CartItem } from "@/types/storeTypes";

const ShoppingCart = async () => {


  const initCartProducts = await getApi<{data:CartItem[]}>("Cart/GetAllCustomerProductsInCartForViewInCartPage");
  console.log(initCartProducts?.data);
  return (
    <div className="py-8">
      <div className="mdHalf:container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">سلة المشتريات</h1>
        <div className="flex flex-col mdHalf:flex-row gap-4 ">
            <CartBody initCartProducts={initCartProducts} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
