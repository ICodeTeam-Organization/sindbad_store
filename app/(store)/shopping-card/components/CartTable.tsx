import { getApi } from "@/lib/http";
import CardComponent from "./CardComponent";

const CartTable = async () => {
  const items = await getApi<any>(
    "Cart/GetAllCustomerProductsInCartForViewInCartPage"
  );

  return <CardComponent items={items} />;
};

export default CartTable;
