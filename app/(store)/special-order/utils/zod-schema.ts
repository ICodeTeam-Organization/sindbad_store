import * as z from "zod";

export const specialOrderSchema = z.object({
  SpecialCategoryId: z.string({ required_error: "يرجى تحديد القسم" }),
  Name: z.string({ required_error: "يرجى ادخال الاسم" }),
  Description: z.string().optional(),
  LinkUrl: z.string().optional(),
  Type: z.number({ required_error: "يرجى تحديد نوع الطلب" }),
  Quantity: z.string({ required_error: "يرجى تحديد الكمية" }),
  // isUrgen: z.boolean({ required_error: "يرجى تحديد الأهمية" }),
  Note: z.string().optional(),
  FilePDF: z.any().optional(),
  Images: z.any().optional(),
});

export type SpecialOrderFormValue = z.infer<typeof specialOrderSchema>;

export const SpecialProductAndServiceOrderFormSchema = z.object({
  category: z.string({ required_error: "يرجى تحديد فئة" }),
  orderDetails: z.string({ required_error: "تفاصيل المنتج مطلوبة" }),
  linkUrl: z.string().optional(),
  type: z.number({ required_error: "يرجى تحديد نوع الطلب" }),
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1,"يجب تحديد الكمية"),
  isUrgen: z.boolean({ required_error: "يرجى تحديد الأهمية" }),
  note: z.string().optional(),
  filePDF: z.any().optional(),
  images: z.any().optional(),
  isValid:z.boolean().optional(),
});

export type SpecialProductAndServiceOrderForm_FormValue = z.infer<typeof SpecialProductAndServiceOrderFormSchema>;


export const SpecialOrderFromEcommerceSchema = z.object({
  type: z.number({ required_error: "يرجى تحديد نوع الطلب" }),
  ecommerce: z.string().optional(),
  linkUrl:z.string({ required_error: "يرجى تحديد رابط المنتج المطلوب" }),
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1,"يجب تحديد الكمية"),
  isUrgen: z.boolean({ required_error: "يرجى تحديد الأهمية" }),
  orderDetails: z.string().optional(),
  images: z.any().optional(),
  isValid:z.boolean().optional(),

});

export type SpecialOrderFromEcommerce_FormValue = z.infer<typeof SpecialOrderFromEcommerceSchema>;



export const SpecialBulkOrderFormSchema = z.object({
  category: z.string({ required_error: "يرجى تحديد فئة" }),
  orderDetails: z.string({ required_error: "تفاصيل المنتج مطلوبة" }),
  linkUrl: z.string().optional(),
  type: z.number({ required_error: "يرجى تحديد نوع الطلب" }),
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1,"يجب تحديد الكمية"),
  isUrgen: z.boolean({ required_error: "يرجى تحديد الأهمية" }),
  note: z.string().optional(),
  filePDF: z.any().optional(),
  images: z.any().optional(),
  isValid:z.boolean().optional(),
});

export type SpecialBulkOrderFormValues = z.infer<typeof SpecialBulkOrderFormSchema>;