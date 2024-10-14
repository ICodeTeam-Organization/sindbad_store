import * as z from "zod";

export const checkoutSchema = z.object({
  // bank: z.number({ message: "يرجى تحديد البنك أو الصراف" }),
  //bank: z.string().min(1, "يرجى تحديد البنك أو الصراف"),
  number: z.string().min(4, "هذا الحقل مطلوب"),
  amount: z.string().min(1, "هذا الحقل مطلوب"),
  note: z.string().min(1, "هذا الحقل مطلوب"),
  date: z.string().min(1, "هذا الحقل مطلوب"),
  image: z.any().refine((files) => files?.[0]?.size > 0, "يجب أختيار صورة"),
});
