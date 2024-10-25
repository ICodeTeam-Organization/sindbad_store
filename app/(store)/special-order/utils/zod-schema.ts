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
