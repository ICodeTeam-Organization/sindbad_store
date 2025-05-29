import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Counter from "@/components/Counter";
import { Checkbox } from "@/components/ui/checkbox";
import InputFile from "@/components/InputFile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpecialOrderFromEcommerce_FormValue,
  SpecialOrderFromEcommerceSchema,
} from "../../utils/zod-schema";
import { useForm } from "react-hook-form";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import EcommerceSearchInput from "./EcommerceSearchInput";
import { useSpecialOrdersDialogsStore } from "@/app/stores/specialordersDialogsStore";

function SpecialOrderFromShopForm({
  onChange,
  orderKey,
  category,
}: {
  onChange: (
    data: SpecialOrderFromEcommerce_FormValue,
    isFormsValid: boolean
  ) => void;
  orderKey: string;
  category?: number;
}) {

  const { categories: allCategories } = useCategoriesDataStore();
  const {ecommerceId} = useSpecialOrdersDialogsStore();
  const categories = allCategories.filter((ele) => ele.categoryTypeNumber == 2);

  const form = useForm<SpecialOrderFromEcommerce_FormValue>({
    resolver: zodResolver(SpecialOrderFromEcommerceSchema),
    defaultValues: {
      type: 3,
      quantity: 1,
      isUrgen: false, 
      orderKey: orderKey,
      category: category && categories?.find(e=> e?.id == category) ? category + "" : undefined,
    },
  });

  // Listen to form field changes
  const handleFieldChange = async (fieldValue: any) => {
    const isValid = await form.trigger();
    // This will call the parent onChange function passing the updated form values
    if (onChange) onChange(fieldValue, isValid);
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-x-3 justify-between my-4">
        <FormField
          control={form.control}
          name="ecommerce"
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <div className="">
                <EcommerceSearchInput
                  ecommerceId={ecommerceId ?? 0}
                  onSelected={(shop) => {
                    field.onChange(shop?.name);
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mdHalf:flex items-center gap-x-3 justify-between my-4 mb-2">
        <h1 className="w-fit whitespace-nowrap text-sm">الفئة </h1>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="mdHalf:w-[90%] w-full">
              <Select
                dir="rtl"
                onValueChange={(value) => {
                  field.onChange(value);
                  handleFieldChange({ ...form.getValues() });
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="حدد فئة الخدمة المطلوبة" />
                  </SelectTrigger>
                </FormControl>
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
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

        <div className="w-full mdHalf:flex items-center gap-2 justify-between mb-2">
                <h1 className="w-fit whitespace-nowrap text-sm"> اسم الطلب </h1>
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="mdHalf:w-[90%] w-full">
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value}
                          placeholder="أكتب اسم للطلب "
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleFieldChange({ ...form.getValues() });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

      <div className="w-full mdHalf:flex items-center gap-2 justify-between mb-3">
        <p className="w-fit text-wrap mdHalf:mb-6 mb-1 text-sm">
          {" "}
          رابط المنتج{" "}
        </p>
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem className="mdHalf:w-[90%] w-full">
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder="ضع رابط المنتج في المتجر الالكتروني "
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange({ ...form.getValues() });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full mdHalf:flex items-center gap-2 justify-between mb-2">
          <p className="w-fit text-nowrap text-sm"> تفاصيل </p>
          <FormField
            control={form.control}
            name="orderDetails"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="تفاصيل   عن الطلب   ( اللون - الحجم - النوع )"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleFieldChange({ ...form.getValues() });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      <div className="space-y-3">
        <div>
          <div className="w-full mdHalf:flex items-center gap-2 justify-between">
            <h1 className="w-fit whitespace-nowrap text-sm"> الكمية </h1>
            <div className="mdHalf:w-[90%] w-full flex justify-between">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* @todo(abdulrahman): replace this with ur quantity input */}
                      <Counter
                        initialValue={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleFieldChange({ ...form.getValues() });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isUrgen"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                      <div className="flex items-center gap-x-2 cursor-pointer">
                        <Checkbox
                          id={"terms" + orderKey}
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                            handleFieldChange({ ...form.getValues() });
                          }}
                        />
                        <label
                          htmlFor={"terms" + orderKey}
                          className="mdHalf:text-sm text-xs cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          طلب مستعجل
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="w-full mdHalf:flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm "> الصورة </p>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <InputFile
                    orderKey={orderKey}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange({ ...form.getValues() });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        
      </div>
    </Form>
  );
}

export default SpecialOrderFromShopForm;
