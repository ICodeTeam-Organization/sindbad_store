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
  userName: string;
  directorateName: string;
  phoneNumber: string;
  isLiberated:boolean
}

export type AddressResponse = {
  success: boolean;
  message: string;
  data: {items:customerAddressType[]};
}


export type UpdateAdressResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    directorateId: number;
    directorateName: string;
    userName: string;
    phoneNumber: string;
    locationDescription: string;
  };
};

export type ApiResponseOfGovernorateWithChildren = {
  success: boolean;
  message: string;
  data: GovernorateType[];
};

export type GovernorateType = {
  id: number;
  name: string;
  directorates: DirectorateType[];
};

export type DirectorateType = {
  id: number;
  name: string;
  isLiberated: boolean | null;
  governorateId: number;
};
