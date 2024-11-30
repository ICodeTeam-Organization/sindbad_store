import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SpecialOrderFormValue, specialOrderSchema } from "../utils/zod-schema";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";

const tabs = [
  { id: 1, label: "منتج" },
  { id: 2, label: "خدمة" },
  { id: 3, label: "رابط متجر" },
];

const SpecialOrderForm = ({tabType=1,category="0",onClose=()=>{}}) => {
  const [curentTab, setCurentTab] = React.useState(tabType);

  const { toast } = useToast(); // @todo: find a better way to implement the toast notification

  const titles = [
    "المنتج المطلوب :",
    "الخدمة المطلوبة :",
    "رابط المنتج بالمتجر :",
  ];

  const form = useForm<SpecialOrderFormValue>({
    resolver: zodResolver(specialOrderSchema),
    defaultValues: {
      Type: 1,
      SpecialCategoryId:category
    },
  });

  // const { data: categories } = useQuery<any>({
  //   queryKey: ["categories"],
  //   queryFn: () => getApi(`SpecialCategories`),
  // });

  const {categories} = useCategoriesDataStore();

  const onSubmit = async (data: any) =>
    postApi<any>(`SpecialProducts/Market/AskNewSpecialProductByCustomer`, {
      body: {
        ...data,
        SpecialCategoryId: +data.SpecialCategoryId,
        Quantity: +data.Quantity,
      },
    });

  const onSuccess = (res: any) => {
    // @todo: show a taost notifaction
    console.log("🚀 ~ onSuccess ~ res:", res);
  };

  const onError = (error: any) => {
    // @todo: show a taost notifaction
    toast({
      variant: "destructive",
      description: error.message,
    });
    console.log("error", { error });
  };

  const handleOnSubmit = useMutation({
    mutationFn: onSubmit,
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleOnSubmit.mutate(data))}
        className="space-y-8"
      >
        {" "}
        <div className="border-2 border-black w-full m-auto py-3 text-center text-2xl">
          <p>طلب خاص جديد</p>
        </div>
        <div className="flex items-center justify-center px-2 border-2 border-black w-full m-auto py-3 text-center text-2xl">
          <div className="text-center w-1/3 flex flex-col items-center flex-1">
            <p className="mb-3">نوع الطلب</p>
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  className={cn(
                    "px-5 h-7 bg-gray-100 hover:bg-green-400 text-black",
                    curentTab === tab.id && "bg-green-400"
                  )}
                  onClick={() => {
                    setCurentTab(tab.id);
                    form.setValue("Type", tab.id);
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center m-auto flex-1">
            <h1 className="w-full">الفئة الرئيسية :</h1>
            <FormField
              control={form.control}
              name="SpecialCategoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="حدد الفئة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectContent>
                        {categories?.map((category: any) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* @todo: show this once the BE team accpet it */}
          {/* <div className="flex items-center m-auto mt-3">
              <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
              <Dropdown />
            </div> */}
        </div>
        {/* <OrderDetails classname={"w-full"} /> */}
        {/* @todo: move this to seprate component */}
        <div className="space-y-3">
          <div className="w-full flex items-center gap-2 justify-between">
            <p className="w-fit text-nowrap min-w-36">
              {titles[curentTab - 1]}
            </p>
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex items-center gap-2 justify-between">
            <p className="w-fit text-nowrap min-w-36">تفاصيل أكثر :</p>
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex items-center gap-2 justify-between">
            <p className="w-fit text-nowrap min-w-36">الكمية :</p>
            <FormField
              control={form.control}
              name="Quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    {/* @todo(abdulrahman): replace this with ur quantity input */}
                    <Input {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {curentTab !== 3 && (
            <>
              <div className="w-full flex items-center gap-2 justify-between">
                <p className="w-fit text-nowrap min-w-36">الرابط :</p>
                <FormField
                  control={form.control}
                  name="LinkUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex items-center gap-2 justify-between">
                <p className="w-fit text-nowrap min-w-36">الصور :</p>
                <FormField
                  control={form.control}
                  name="Images"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} type="file" value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
        <Button
          className="bg-primary-background px-10"
          type="submit"
          disabled={handleOnSubmit.isPending}
        >
          حفظ الطلب
        </Button>
        <Button
          className="bg-slate-900  px-10 mx-4"
          onClick={onClose}
          disabled={handleOnSubmit.isPending}
        >
         إلغاء
        </Button>
      </form>
    </Form>
  );
};

export default SpecialOrderForm;
