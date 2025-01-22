"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import HeadTitle from './HeadTitle';

const ProfileFormSchema = z.object({
  username: z
    .string()
    .min(1, 'اسم المستخدم مطلوب')
    .max(50, 'اسم المستخدم يجب أن يكون أقل من 50 حرف'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صالح'),
  mobile: z
    .string()
    .regex(/^\d{9,15}$/, 'رقم الجوال يجب أن يكون بين 9 و 15 رقم'),
  phone: z.string().regex(/^\d*$/, 'رقم الهاتف يجب أن يحتوي على أرقام فقط').optional(),
  country: z.string().min(1, 'اختيار الدولة مطلوب'),
  city: z.string().min(1, 'اختيار المدينة مطلوب'),
});

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      mobile: '',
      phone: '',
      country: '',
      city: '',
    },
  });

  const [isEditable, setisEditable] = useState(false)

  const onSubmit = (data:any) => {
    console.log('Form Data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mdHalf:p-8 p-4 w-full">
        <h1 className="text-base font-semibold text-right text-gray-800 mb-6">
          بيانات المستخدم
        </h1>

        {/* Personal Information Section */}
        <div className="mdHalf:grid grid-cols-1 flex flex-col mdHalf:grid-cols-2 gap-6 mb-8 bg-white border-2 rounded-lg mdHalf:p-8 p-4">
          <HeadTitle
            title="معلومات الشخصية"
            description="كل معلوماتك الشخصية لا يطلع عليها احد غيرك"
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المستخدم</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="اسم المستخدم"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@mail.com" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الجوال</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="أدخل رقم جوالك" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف (الثابت)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="أدخل رقم الهاتف الثابت" {...field} />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        {/* Location Section */}
        <div className="mdHalf:grid grid-cols-1 flex flex-col sm:grid-cols-2 gap-6 mb-8 bg-white border-2 rounded-lg p-8">
          <HeadTitle
            title="مكان الإقامة"
            description="أخبرنا اين يقع مكان عملك التجاري؟"
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الدولة</FormLabel>
                <FormControl>
                  <Select dir='rtl' onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <span>{field.value || 'اختر الدولة'}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="اليمن">اليمن</SelectItem>
                      <SelectItem value="السعودية">السعودية</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المدينة</FormLabel>
                <FormControl>
                  <Select dir='rtl' onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <span>{field.value || 'اختر المدينة'}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="جدة">جدة</SelectItem>
                      <SelectItem value="الرياض">الرياض</SelectItem>
                      <SelectItem value="الدمام">الدمام</SelectItem>
                      <SelectItem value="مكة">مكة</SelectItem>
                      <SelectItem value="المدينة المنورة">المدينة المنورة</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
       {isEditable && <div className="flex  gap-x-4 items-center mdHalf:static mdHalf:p-0 mdHalf:shadow-none mdHalf:m-0 fixed bottom-0 p-4  rounded-lg shadow-xl bg-white w-full left-0 right-0">
          <Button variant="secondary" type="button" className='' >
            تجاهل
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white ">
            حفظ التعديلات
          </Button>
        </div>}
      </form>
    </Form>
  );
}

export default ProfileForm;
