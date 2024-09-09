"use client";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="rounded-none">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">البريد الألكتروني</Label>
          <Input id="username" type="text" placeholder="" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link href={""} className="text-sky-500">
              نسيت كلمة المرور
            </Link>
          </div>
          <PasswordInput name="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-orange-600 bg-orange-500 transition-colors">
          تسجيل الدخول
        </Button>
      </CardFooter>
    </div>
  );
};

export default LoginForm;
