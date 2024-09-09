import * as z from "zod";

export const Authchema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب"),
    phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
    acceptTerms: z
      .boolean()
      .refine((val) => val, "يجب الموافقة على الشروط والأحكام"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  });
