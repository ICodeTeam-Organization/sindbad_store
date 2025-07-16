import * as z from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب"),

    phone: z
      .string()
      .regex(/^\+?\d{6,20}$/, "يجب أن يكون طول الرقم بين 6 - 20"),

    email: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\w\d][\w\d\.]*[\w\d]@\w{1,10}\.\w{2,4}$/.test(val),
        { message: "الرجاء إدخال بريد إلكتروني صالح" }
      ),

    password: z
      .string()
      .regex(
        /^[\w\d]{9,20}(?<=\w.*)(?<=\d.*)$/,
        "يجب ان تحتوي كلمة المرور على ارقام (0-9) و أحرف (a-Z) و طولها بين 9 - 20"
      ),

    confirmPassword: z
      .string()
      .min(1, "كلمة المرور غير مطابقة"), // نتحقق من المطابقة لاحقاً

    agreeTerms: z
      .boolean()
      .refine((val) => val, "يجب الموافقة على الشروط والأحكام"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة المرور غير مطابقة",
  });


export const LoginSchema = z.object({
  phone: z
    .string()
    .min(6, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام")
    .regex(/^\d+$/, "المدخل يجب أن يحتوي على أرقام فقط"),
  password: z.string().min(6, "كلمة المرور مطلوبة"),
});

//
export const ForgetPasswordSchema = z.object({
  phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
  Newpassword: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
  confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
}).refine(
  (data) => {
    return data.Newpassword === data.confirmPassword;
  },
  {
    message: "كلمة المرور غير مطابقة",
    path: ["confirmPassword"],
  }
);

export const MobileVertificationSchema = z.object({
  activation: z.string().min(1, "يجب إدخال رمز التحقق"),
});
export const VertificationCodeSchema = z.object({
  activation: z.string().min(1, "يجب إدخال رمز التفعيل"),
});

export const changePassSchema = z
  .object({
    CurrentPassword: z.string().min(1, "يجب إدخال كلمة المرور الحالية"),
    Newpassword: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
  })
  .refine(
    (data) => {
      return data.Newpassword === data.confirmPassword;
    },
    {
      message: "كلمة المرور غير مطابقة",
      path: ["confirmPassword"],
    }
  );

  export const ResetPassSchema = z
  .object({
    // phone: z.string().min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام"),
    newPassword: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
    confirmPassword: z.string().min(6, "كلمة المرور غير مطابقة"),
    code: z.string().min(6, "كود التحقق يجب أن يكون على الأقل 6 أحرف"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "كلمة المرور غير مطابقة",
      path: ["confirmPassword"],
    }
  );
 
export const AddshipingadressSchema = z.object({
  locationDescription: z.string().optional(),
  userName: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 1, {
      message: "يجب إدخال اسم المستلم",
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 9, {
      message: "رقم الهاتف يجب أن يكون على الأقل 9 أرقام",
    }),
  stateid: z.string().min(1, "اختر المحافظة"),
  city: z.string().min(1, "اختر المديرية"),
});


