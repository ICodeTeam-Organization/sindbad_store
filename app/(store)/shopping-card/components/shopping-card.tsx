import CartTable from "./cart-table";
import InvoiceDetails from "./invoice-details";

const ShoppingCart = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">سلة المشتريات</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <CartTable />
          </div>
          <div className="md:w-1/4">
            <InvoiceDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
