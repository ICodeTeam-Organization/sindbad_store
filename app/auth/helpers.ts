import { loginFormField, registerFormField } from "@/types/authTypes";
import axios from "axios";
import { User } from "next-auth";
import { signIn } from "next-auth/react";

export async function loginUser({ phone, password }: loginFormField) {
  const res = await signIn("credentials", {
    redirect: false,
    callbackUrl: "/",
    phone,
    password,
  });

  if (res?.status == 200) {
    return res;
  }

  if (res?.error) {
    throw new Error(res.error);
  }
}

export async function registerUser(formData: registerFormField) {
  try {
    const res = await axios.post(
      (process.env.NEXT_PUBLIC_BASE_URL as string) + "Auth/Register/Customer",
      {
        name: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        // roleName: "Customer",
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }
    );
    const user: User = res.data;
    if (res.status === 200 && user.data) {
      await loginUser({
        phone: formData.phone,
        password: formData.password,
      });
    }
  } catch (error: any) {
    throw new Error(
      (error as any).response?.data?.message || "فشلت عملية التسجيل حاول مجددا"
    );
  }
}
