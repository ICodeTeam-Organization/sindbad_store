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
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1, "يجب تحديد الكمية"),

  Name: z.string().optional(),
  linkUrl: z.string().optional(),
  images: z.any().optional(),
  filePDF: z.any().optional(),

  orderDetails: z.string().optional(),
  type: z.number().optional(),
  isUrgen: z.boolean().optional(),
  note: z.string().optional(),
  isValid: z.boolean().optional(),
  orderKey: z.string().default(Math.random().toString(36).substring(2, 7)),
})
.refine(
  (data) =>
    !!(data.Name || data.linkUrl || data.images || data.filePDF),
  {
    message: "يجب إدخال اسم الطلب أو رابط أو صورة أو ملف PDF واحد على الأقل",
    path: ["Name"], // أو ["linkUrl"] أو أي مكان تريده يظهر فيه الخطأ
  }
);

export type SpecialProductAndServiceOrderForm_FormValue = z.infer<typeof SpecialProductAndServiceOrderFormSchema>;


export const SpecialOrderFromEcommerceSchema = z.object({
  Name: z.string({ required_error: "يرجى ادخال الاسم" }),
  category: z.string({ required_error: "يرجى تحديد فئة" }),
  type: z.number({ required_error: "يرجى تحديد نوع الطلب" }),
  ecommerce: z.string().optional(),
  linkUrl:z.string({ required_error: "يرجى تحديد رابط المنتج المطلوب" }),
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1,"يجب تحديد الكمية"),
  isUrgen: z.boolean({ required_error: "يرجى تحديد الأهمية" }),
  orderDetails: z.string().optional(),
  images: z.any().optional(),
  isValid:z.boolean().optional(),
  orderKey: z.string().default(Math.random().toString(36).substring(2, 7)),

});

export type SpecialOrderFromEcommerce_FormValue = z.infer<typeof SpecialOrderFromEcommerceSchema>;
 
export const SpecialWholesalesOrderFormSchema = z.object({
  category: z.string({ required_error: "يرجى تحديد فئة" }),
  quantity: z.number({ required_error: "يرجى تحديد الكمية" }).min(1, "يجب تحديد الكمية"),
  orderFrom: z.number({ required_error: "يرجى تحديد نوع الطلب" }),

  Name: z.string().optional(),
  linkUrl: z.string().optional(),
  images: z.any().optional(),
  filePDF: z.any().optional(),

  orderDetails: z.string().optional(),
  isUrgen: z.boolean().optional(),
  note: z.string().optional(),
  isValid: z.boolean().optional(),
  orderKey: z.string().default(Math.random().toString(36).substring(2, 7)),
})
.refine(
  (data) => !!(data.Name || data.linkUrl || data.images || data.filePDF),
  {
    message: "يجب إدخال اسم الطلب أو رابط أو صورة أو ملف PDF واحد على الأقل",
    path: ["Name"], // لتحديد مكان عرض رسالة الخطأ
  }
);


export type SpecialWholesalesOrderFormValues = z.infer<typeof SpecialWholesalesOrderFormSchema>;