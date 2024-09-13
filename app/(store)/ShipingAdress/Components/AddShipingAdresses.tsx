"use client";
import { BiPlusCircle } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddshipingadressSchema } from "@/app/auth/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const AddShipingAdresses = () => {
  const form = useForm<z.infer<typeof AddshipingadressSchema>>({
    resolver: zodResolver(AddshipingadressSchema),
    defaultValues: {
      title: "",
      reciver: "",
      phone: "",
      city: "",
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
              <div className="m-auto p-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="my-4 text-right">
                      <FormLabel className="m-auto text-3xl font-bold mb-2">
                        <p>العنوان</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel className="m-auto text-3xl font-bold mb-2">
                  <p className=" text-right">المنطقة</p>
                </FormLabel>
                <div className="grid grid-cols-3 gap-2 ">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="text-center">
                        <FormControl>
                          <Select>
                            <SelectTrigger className="text-xl">
                              <SelectValue placeholder="المحافظة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup {...field}>
                                <SelectItem value="est">حضرموت</SelectItem>
                                <SelectItem value="cst">عدن</SelectItem>
                                <SelectItem value="mst">صنعاء</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="text-center">
                        <FormControl>
                          <Select>
                            <SelectTrigger className="text-xl">
                              <SelectValue placeholder="المديرية" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup {...field}>
                                <SelectItem value="est">حضرموت</SelectItem>
                                <SelectItem value="cst">عدن</SelectItem>
                                <SelectItem value="mst">صنعاء</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="text-center">
                        <FormControl>
                          <Select>
                            <SelectTrigger className="text-xl">
                              <SelectValue placeholder="المنطقة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup {...field}>
                                <SelectItem value="est">حضرموت</SelectItem>
                                <SelectItem value="cst">عدن</SelectItem>
                                <SelectItem value="mst">صنعاء</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reciver"
                  render={({ field }) => (
                    <FormItem className="my-4 text-right">
                      <FormLabel className="m-auto text-3xl font-bold mb-2">
                        <p>المستلم</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="my-4 text-right">
                      <FormLabel className="m-auto text-3xl font-bold mb-2">
                        <p>رقم التلفون</p>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogHeader>

            <DialogFooter>
              <Button type="submit">حفظ التعديلات</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShipingAdresses;
