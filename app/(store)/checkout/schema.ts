import * as z from "zod";

export const checkoutSchema = z.object({
  // bank: z.number({ message: "يرجى تحديد البنك أو الصراف" }),
  bank: z.string().min(1, { message: "يرجى تحديد البنك أو الصراف" }),
  number: z.string().min(4, { message: "هذا الحقل مطلوب" }),
  amount: z.string().min(1, { message: "هذا الحقل مطلوب" }),
  note: z.string().min(1, { message: "هذا الحقل مطلوب" }),
  date: z.string().min(1, { message: "هذا الحقل مطلوب" }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size > 0, { message: "يجب أختيار صورة" }),
});
