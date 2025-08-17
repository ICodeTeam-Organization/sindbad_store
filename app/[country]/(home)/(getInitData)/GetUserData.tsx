"use client";

import { useUserStore } from '@/app/stores_mangament/userStore'; 
import { useEffect } from 'react';
interface UserPropsType {
    data: {
    name:string;
    email:string;
    phoneNumber:string;
    token:string;
    isLogin:boolean;
}
}
function GetUserData({data:user}:UserPropsType) {
  const { login } = useUserStore(); 
  useEffect(() => {
    if (user.isLogin) {
        login({
            ...user,
            id:""
        })
    }
  }, [user])
  return null;
}

export default GetUserData