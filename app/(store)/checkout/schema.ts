import * as z from "zod";

export const checkoutSchema = z.object({
  bank: z.enum(["الراجحي", "القرشي", "بنك الكويت", "بنك جيزان", "بنك عسفان"], {
    required_error: "يرجى تحديد البنك أو الصراف",
  }),
  number: z.string().min(9, "هذا الحقل مطلوب"),
  date: z.string().min(1, "هذا الحقل مطلوب"),
  image: z.any().refine((files) => files?.[0]?.size > 0, "يجب أختيار صورة"),
});
