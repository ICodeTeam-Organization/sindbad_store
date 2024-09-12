import * as z from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب"),
    phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
    agreeTerms: z
      .boolean()
      .refine((val) => val, "يجب الموافقة على الشروط والأحكام"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة المرور غير مطابقة",
  });

export const LoginSchema = z.object({
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: z.string().min(6, "كلمة المرور مطلوبة"),
});
export const ForgetPassword = z.object({
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
});

export const resetPassSchema = z
  .object({
    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confrmPassword"],
    message: "كلمة المرور غير مطابقة",
  });

export const addshipingadressSchema = z.object({
  title: z.string().min(1, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
//   selectitem: z
//     .boolean()
//     .refine((val) => val, "يجب الموافقة على الشروط والأحكام"),
});
