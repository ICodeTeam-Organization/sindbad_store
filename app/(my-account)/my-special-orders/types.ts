interface MySpecialOrders {
    number: string,
    order: string,
    category: string,
    details: string,
    date:string,
    actions: string,
}
export interface MySpecialOrdersTableProps {
    special_orders: MySpecialOrders[];
}