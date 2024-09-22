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
const Navbar = () => {
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
          <Link href={"/Orders"}>
            <Label
              htmlFor="name"
              className="text-right text-2xl cursor-pointer"
            >
              طلباتي
            </Label>
          </Link>

          <Link className="mt-2" href={"/ShipingAdress"}>
            <Label
              htmlFor="username"
              className="text-right text-2xl cursor-pointer"
            >
              إضافة عنوان جديد
            </Label>
          </Link>
          <Link className="mt-2 absolute bottom-8" href={"#"}>
            <Label
              htmlFor="username"
              className="text-right text-2xl cursor-pointer text-red-500"
            >
              تسجيل الخروج
            </Label>
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
