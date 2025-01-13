export interface DropdownProps {
    placeholder: string;
    options: string[];
    icon: React.ReactNode;
    onSelect: (option: string) => void;
}
interface MyOrders {
    order_number: string;
    order_value: string;
    date: string,
    status: string,
    traking: string,
}
export interface MyOrdersTableProps {
    orders: MyOrders[];
}