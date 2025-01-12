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
import { Button } from "@/components/ui/button";

function SpecialOrderFromShopForm({
  onChange,
  index
}: {
  onChange: (
    data: SpecialOrderFromEcommerce_FormValue,
    isFormsValid: boolean
  ) => void;
  index:number
}) { 

  const form = useForm<SpecialOrderFromEcommerce_FormValue>({
    resolver: zodResolver(SpecialOrderFromEcommerceSchema),

    defaultValues: {
      type: 3,
      quantity: 0,
      isUrgen: false,
      orderDetails:"تفاصيل طلب من متجر الكتروني"
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
                <EcommerceSearchInput onSelected={(shop)=>{ field.onChange(shop?.name) }} /> 
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="w-full flex items-center gap-2 justify-between mb-3">
        <p className="w-fit text-wrap mb-6 text-sm"> رابط المنتج </p>
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem className="w-[90%]">
              <FormControl>
                <Input
                  {...field}
                  value={field.value}
                  placeholder="ضع رابط المنتج في المتجر الالكتروني (يفضل تفاصيل المنتج )  (اختياري)                                                                                                                   لصق"
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
          <div className="w-full flex items-center gap-2 justify-between">
            <h1 className="w-fit whitespace-nowrap text-sm"> الكمية </h1>
            <div className="w-[90%] flex justify-between">
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
                          id={"terms" + index}
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                            handleFieldChange({ ...form.getValues() });
                          }}
                        />
                        <label
                          htmlFor={"terms" + index}
                          className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

        <div className="w-full flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm "> الصورة </p>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="w-[90%]">
                <FormControl>
                  <InputFile
                    index={index}
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

        <div className="w-full flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm"> تفاصيل </p>
          <FormField
            control={form.control}
            name="orderDetails"
            render={({ field }) => (
              <FormItem className="w-[90%]">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="تفاصيل اضافية عن الخدمة المطلوبة (اختياري)"
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
      </div>
    </Form>
  );
}

export default SpecialOrderFromShopForm;
