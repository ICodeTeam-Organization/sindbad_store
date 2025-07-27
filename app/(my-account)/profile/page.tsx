 
import React from "react";

import ProfileForm from "./components/ProfileForm";
import { getApi } from "@/lib/http";
import { ProfileResponsiveType } from "./types";




const UserForm = async () => {
 
  const resulte = await getApi<ProfileResponsiveType>("Customer/profile",{},{
    cache:"no-cache"
  });

  return ( 
   <ProfileForm profile={resulte?.data} /> 
  );
};

export default UserForm;
