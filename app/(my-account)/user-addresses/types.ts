import { ReactNode } from "react";

export interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: string;
}

// interface AddressTable{
//   address: string,
//   region:string,
//   recipient: string,
//   phone:string,
// }




export type customerAddressType = {
  id: number,
  directorateId: number;
  locationDescription: string;
  customerName: string;
  directorateName: string;
  phoneNumber: string;
}

export type AddressResponse = {
  success: boolean;
  message: string;
  data: customerAddressType[];
}


export type UpdateAdressResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    directorateId: number;
    directorateName: string;
    customerName: string;
    phoneNumber: string;
    locationDescription: string;
  };
};