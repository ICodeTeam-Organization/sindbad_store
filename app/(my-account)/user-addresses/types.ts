import { ReactNode } from "react";

export interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: string;
}

interface AddressTable{
  address: string,
  region:string,
  recipient: string,
  phone:string,
}

export interface AddressTableProps {
  address_table: AddressTable[];
}
