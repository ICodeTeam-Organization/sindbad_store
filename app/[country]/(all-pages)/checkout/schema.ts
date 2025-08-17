import { CheckoutType } from "@/types/checkout";
// import * as z from "zod";

// export const checkoutSchema = z
//   .object({
//     bank: z.string().optional(), // اجعلها اختيارية في البداية
//     number: z.string().optional(), // اجعلها اختيارية في البداية
//     note: z.string().optional(),
//     date: z.string().optional(),
//     image: z
//       .instanceof(FileList)
//       .refine((files) => files.length > 0 && files[0].size > 0, {
//         message: "يجب إختيار صورة",
//       })
//       .optional(),
//   })
//   .superRefine(({ bank, number, image }, ctx) => {
//     // إذا لم يتم إدخال البنك ورقم السند، يجب أن تكون الصورة مطلوبة
//     if (!bank && !number && !image) {
//       ctx.addIssue({
//         path: ["image"],
//         message: "يجب إختيار صورة، أو إدخال البنك ورقم السند",
//         code: z.ZodIssueCode.custom,
//       });
//     }

//     // إذا تم إدخال البنك ورقم السند، الصورة تصبح اختيارية
//     if (bank && number) {
//       // لا حاجة لإضافة أي قيد للصورة هنا، فهي تصبح اختيارية
//       return;
//     }

//     // إذا لم يتم إدخال صورة، يجب أن يكون البنك ورقم السند مطلوبين
//     if (!image) {
//       if (!bank) {
//         ctx.addIssue({
//           path: ["bank"],
//           message: "يرجى تحديد البنك أو الصراف",
//           code: z.ZodIssueCode.custom,
//         });
//       }
//       if (!number) {
//         ctx.addIssue({
//           path: ["number"],
//           message: "رقم السند مطلوب",
//           code: z.ZodIssueCode.custom,
//         });
//       }
//     }
//   });

export const validateCheckoutForm = (data: CheckoutType): string[] => {
  const errors: string[] = [];

  const { bank, number, image } = data;

  if (!bank && !number && (!image || image.length === 0)) {
    // Case 1: No bank, number, or image provided
    errors.push("يجب إختيار صورة، أو إدخال البنك ورقم السند");
  } else if (!image || image.length === 0) {
    // Case 2: Image is not provided
    if (!bank) {
      errors.push("يرجى تحديد البنك أو الصراف");
    }
    if (!number) {
      errors.push("رقم السند مطلوب");
    }

    if (number.length > 9) {
      errors.push("رقم السند يجب ان يكون أقل من 10 أرقام");
    }
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return [];
  }
};
