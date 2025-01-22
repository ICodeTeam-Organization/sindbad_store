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




export type customerAddressType = {
  customerAddressId: number;
  regionId: number;
  location: string;
  regionName: string;
  directorateName: string;
  governorateName: string;
}

export type AddressResponse = {
  success: boolean;
  message: string;
  data: customerAddressType[];
}
