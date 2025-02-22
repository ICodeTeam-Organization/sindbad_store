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
  SpecialProductAndServiceOrderForm_FormValue,
  SpecialProductAndServiceOrderFormSchema,
} from "../../utils/zod-schema";
import { useForm } from "react-hook-form";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { Plus } from "lucide-react";

function SpecialProductOrderForm({
  orderKey,
  onChange,
  category,
}: {
  onChange: (
    data: SpecialProductAndServiceOrderForm_FormValue,
    isFormsValid: boolean
  ) => void;
  orderKey: string;
  category?: number;
}) {
  const { categories: allCategories } = useCategoriesDataStore();
  // categories for special products
  const categories = allCategories.filter((ele) => ele.categoryTypeNumber == 2);

  const form = useForm<SpecialProductAndServiceOrderForm_FormValue>({
    resolver: zodResolver(SpecialProductAndServiceOrderFormSchema),
    defaultValues: {
      type: 1,
      quantity: 1,
      isUrgen: false,
      orderKey: orderKey,
      category:
        category && categories?.find((e) => e?.id == category)
          ? category + ""
          : undefined,
    },
  });

  // Listen to form field changes
  const handleFieldChange = async (fieldValue: any) => {
    const isValid = await form.trigger();
    // This will call the parent onChange function passing the updated form values
    onChange(fieldValue, isValid);
  };

  return (
    <Form {...form}>
      <div className="mdHalf:flex items-center gap-x-3 justify-between my-4">
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
                    <SelectValue placeholder={"حدد فئة المنتج المطلوب"} />
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

      <div className="space-y-3">
        <div className="w-full mdHalf:flex items-center gap-2 justify-between">
          <h1 className="w-fit whitespace-nowrap text-sm"> الطلب </h1>
          <FormField
            control={form.control}
            name="orderDetails"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="أكتب تفاصيل المنتج المطلوبة"
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
                      field.onChange(e || []);
                      handleFieldChange({ ...form.getValues() });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full mdHalf:flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm "> إرفاق ملفات </p>
          <FormField
            control={form.control}
            name="filePDF"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <div className={`flex items-center justify-center`}>
                    <label
                      htmlFor={"filePDF" + orderKey}
                      className="flex items-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex justify-center gap-x-2 items-center  p-2 text-sm bg-white text-black border-l">
                        <Plus className="text-gray-500" />
                        <span className="text-gray-700"> إضافة ملف </span>
                      </div>
                      <input
                        id={"filePDF" + orderKey}
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          field.onChange(e.target.files?.item(0))
                        } // Use the local file change handler
                      />
                      <p className="mx-4">{field?.value?.name ?? "إختر ملف"}</p>{" "}
                      {/* Display file name or placeholder */}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full mdHalf:flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm"> تفاصيل </p>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="تفاصيل اضافية عن المنتج المطلوب (اختياري)"
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

        <div className="w-full mdHalf:flex items-center gap-2 justify-between">
          <p className="w-fit text-nowrap text-sm"> الرابط </p>
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem className="mdHalf:w-[90%] w-full">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="رابط المنتج"
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

export default SpecialProductOrderForm;
