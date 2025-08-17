import { postApi } from "@/lib/http";
import { loginFormField, registerFormField } from "@/types/authTypes"; 
import { signIn } from "next-auth/react";

export async function loginUser({ phone, password }: loginFormField) { 
  const res = await signIn("credentials", {
    redirect: false,
    callbackUrl: "/",
    phone,
    password,
  }); 
  if (res?.ok) {
    return res;
  } 
  if (res?.error) { 
    throw new Error(res.error);
  }
}

export async function registerUser(formData: registerFormField) {
  
    return await postApi("Auth/Register/Customer",
      {
        body: {
          name: formData.name,
          phoneNumber: formData.phone,
          email: formData.email, 
          password: formData.password,
        },
      }
    );
 
     
    // const user: User = res.data;
    // if (res.status === 200 && user.data) {
    //   await loginUser({
    //     phone: formData.phone,
    //     password: formData.password,
    //   });
    // }
  
}
