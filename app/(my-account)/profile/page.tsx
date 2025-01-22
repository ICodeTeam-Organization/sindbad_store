 
import React from "react";
import HeadTitle from "./components/HeadTitle";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import Button from "./components/Button";
import { getSession } from "next-auth/react";
import ProfileForm from "./components/ProfileForm";
const UserForm = async () => {

  // const data = await getSession()

  // console.log(data,"userrrrrrrrrrrrrrrrr");
  
  

  return (
    <div>
      <div className="">
          <ProfileForm/>
      </div>
    </div>
  );
};

export default UserForm;
