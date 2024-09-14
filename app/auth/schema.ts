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
export const ForgetPasswordSchema = z.object({
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
});
export const MobileVertificationSchema = z.object({
  activation: z.string().min(1, "يجب إدخال رمز التحقق"),
});
export const VertificationCodeSchema = z.object({
  activation: z.string().min(1, "يجب إدخال رمز التفعيل"),
});

export const ResetPassSchema = z
  .object({
    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
    activation: z.string().min(1, "يجب إدخال رمز التفعيل"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confrmPassword"],
    message: "كلمة المرور غير مطابقة",
  });

export const AddshipingadressSchema = z
  .object({
    title: z.string().min(1, "يجب إدخال العنوان"),
    reciver: z.string().min(1, "يجب إدخال اسم المستلم"),
    phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
    state: z.string().min(1, "اختر المحافظة"),
    city: z.string().min(1, "اختر المدينة"),
    place: z.string().min(1, "اختر المنطقة"),
  })
  .refine((data) => data.city === data.city, {
    path: ["confirmPassword"],
    message: "كلمة المرور غير مطابقة",
  });
