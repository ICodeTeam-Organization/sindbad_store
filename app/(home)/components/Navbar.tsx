import { BiMenu } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import SignOutButton from "./sign-out-button";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const session = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <BiMenu className="cursor-pointer" size={35} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link href={""}>
            <GoPerson size={100} />
          </Link>
          <br />
          <SheetTitle>تعديل الملف الشخصي</SheetTitle>
        </SheetHeader>
        <br />
        <br />
        <div className="grid gap-4 py-4">
          <Link href={"/orders"}>
            <Label
              htmlFor="name"
              className="text-right text-2xl cursor-pointer"
            >
              طلباتي
            </Label>
          </Link>

          <Link href={"/favorites"}>
            <Label
              htmlFor="name"
              className="text-right text-2xl cursor-pointer"
            >
              المفضلة
            </Label>
          </Link>

          <Link className="mt-2" href={"/shiping-adress"}>
            <Label
              htmlFor="username"
              className="text-right text-2xl cursor-pointer"
            >
              إضافة عنوان جديد
            </Label>
          </Link>
          <Link className="mt-2" href={"/reset-password"}>
            <Label
              htmlFor="username"
              className="text-right text-2xl cursor-pointer"
            >
              تغيير كلمة المرور
            </Label>
          </Link>
        </div>
        {session.status === "authenticated" && (
          <div className="absolute bottom-8">
            <SignOutButton />
          </div>
        )}
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
