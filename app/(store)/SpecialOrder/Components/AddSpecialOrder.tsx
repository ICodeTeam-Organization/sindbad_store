"use client";
import { BiPlusCircle } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddshipingadressSchema } from "@/app/auth/schema";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Dropdown from "./Dropdown";
import OrderDetails from "./OrderDetails";
const AddSpecialOrder = () => {
  const form = useForm<z.infer<typeof AddshipingadressSchema>>({
    resolver: zodResolver(AddshipingadressSchema),
    defaultValues: {
      title: "",
      reciver: "",
      phone: "",
      state: "",
      city: "",
      place: "",
    },
  });
  function onSubmit(values: z.infer<typeof AddshipingadressSchema>) {
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" mr-16 py-2 px-6 flex justify-between items-center bg-primary-background hover:bg-orange-600 hover:text-white text-white rounded-sm"
        >
          جديد
          <BiPlusCircle className="mr-1" size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <div className="border-2 border-black w-full m-auto py-3 text-center text-2xl">
                <p>طلب خاص جديد</p>
              </div>
              <div className="flex items-center justify-between px-2 border-2 border-black w-full m-auto py-3 text-center text-2xl">
                <div className="text-center w-1/3">
                  <p className="mb-3">نوع الطلب</p>
                  <div className="flex items-center justify-around">
                    <Button className="px-7 h-7 bg-green-400 hover:bg-green-600 text-black">
                      منتج
                    </Button>
                    <Button className="px-7 h-7 bg-green-400 hover:bg-green-600 text-black">
                      خدمة
                    </Button>
                    <Button className="h-7 bg-green-400 hover:bg-green-600 text-black">
                      رابط متجر
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center m-auto">
                    <h1 className="ml-2 m-auto">الفئة الرئيسية :</h1>
                    <Dropdown name="" />
                  </div>
                  <div className="flex items-center m-auto mt-3">
                    <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
                    <Dropdown />
                  </div>
                </div>
              </div>
              <OrderDetails classname={"w-full"} />
            </DialogHeader>

            <DialogFooter>
              <Button className="bg-primary-background px-10" type="submit">
                حفظ الطلب
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSpecialOrder;
