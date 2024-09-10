import * as z from "zod";

export const checkoutSchema = z.object({
  bank: z.string({ required_error: "هذا الحقل مطلوب" }),
  number: z.string().min(9, "هذا الحقل مطلوب"),
  date: z.string().min(1, "هذا الحقل مطلوب"),
  image: z.any().refine((files) => files?.[0]?.size > 0, "يجب أختيار صورة"),
});
