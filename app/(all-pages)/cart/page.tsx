import CartBody from "./components/cart-body";

const ShoppingCart = async () => {
  // const initCartProducts = await getApi<{data:CartItem[]}>("Carts");
  return (
    <div className="py-8 bg-bg-100">
      <div className="mdHalf:container mx-auto px-4 ">
        {/* <h1 className="text-2xl font-semibold mb-4">سلة المشتريات</h1> */}
        <div className="flex flex-col mdHalf:flex-row gap-4 ">
            <CartBody />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
