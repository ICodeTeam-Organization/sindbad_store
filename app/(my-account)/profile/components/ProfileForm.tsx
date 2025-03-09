"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import HeadTitle from "./HeadTitle";
import { ProfileType } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, putApi } from "@/lib/http";
import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

type Region = {
  id: number;
  directorateId: number;
  name: string;
};

type Directorate = {
  id: number;
  name: string;
  governorateId: number;
  regions: Region[];
};

type Governorate = {
  id: number;
  name: string;
  directorates: Directorate[];
};

const ProfileFormSchema = z.object({
  name: z
    .string()
    .min(1, "اسم المستخدم مطلوب")
    .max(50, "اسم المستخدم يجب أن يكون أقل من 50 حرف")
    .optional(),
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح")
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{9,15}$/, "رقم الجوال يجب أن يكون بين 9 و 15 رقم")
    .optional(),
  telePhone: z
    .string()
    .regex(/^\d*$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
    .optional(),
  // governorate: z.string().optional().default(""),
  // directorate: z.string().optional().default(""),
  governorateId: z.string().optional().default(""),
  directorateId: z.string().optional().default(""),
});

function ProfileForm({ profile }: { profile: ProfileType }) {
  const { data } = useQuery({
    queryKey: ["governorate-directorate"],
    queryFn: () => getApi<any>(`Locations/GetGovernorateWithChildren`),
  });

  const allGovs = data?.data as Governorate[]; // All governorates
  const allDirects = (allGovs?.flatMap((gov) => gov.directorates) ||
    []) as Directorate[]; // All directorates

  const [profileData, setProfileData] = useState<ProfileType>(profile);

  const form = useForm({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: profileData?.name ?? "",
      email: profileData?.email ?? "",
      phoneNumber: profileData?.phoneNumber ?? "",
      telePhone: profileData?.telePhone ?? "",
      governorateId: profileData?.governorateId + "" || "",
      directorateId: profileData?.directorateId + "" || "",
    },
  });

  const router = useRouter();
  const [isEditable, setIsEditable] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      name,
      email,
      directorateId,
      governorateId,
      telePhone,
      phoneNumber,
    }: z.infer<typeof ProfileFormSchema>) => {
      await putApi(`Customer/profile`, {
        body: {
          name,
          email,
          directorateId: directorateId ?? null,
          governorateId: governorateId ?? null,
          telePhone,
        },
      });

      return {
        name,
        email,
        directorateId,
        governorateId,
        telePhone,
        phoneNumber,
      } as ProfileType;
    },
    onSuccess: (dataPr) => {
      setIsEditable(false);
      setProfileData(dataPr);
      router.refresh();
      toast({
        variant: "default",
        description: "تم تحديث معلوماتك",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.message || "حدث خطاء أثناء تحديث معلوماتك",
      });
    },
  });

  const onSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mdHalf:p-8 p-4 w-full"
      >
        <h1 className="text-base font-semibold text-right text-gray-800 mb-6">
          بيانات المستخدم
        </h1>

        <div className="flex gap-x-4 items-center">
          {!isEditable && (
            <>
            <Button
              type="button"
              onClick={() => {
                setIsEditable(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white mb-4 "
            >
              تعديل
            </Button>
             <Link href="/profile/changePassword">
             <Button
               type="button"
               className="bg-orange-500 hover:bg-orange-600 text-white mb-4 "
             >
               تغيير كلمة المرور
             </Button>
           </Link></>
          )}
         
        </div>

        {/* Personal Information Section */}
        <div className="mdHalf:grid grid-cols-1 flex flex-col mdHalf:grid-cols-2 gap-6 mb-8 bg-white border-2 rounded-lg mdHalf:p-8 p-4">
          <HeadTitle
            title="معلومات الشخصية"
            description="كل معلوماتك الشخصية لا يطلع عليها احد غيرك"
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المستخدم</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isEditable}
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
                  <Input
                    disabled={!isEditable}
                    type="email"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الجوال</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled
                    placeholder="أدخل رقم جوالك"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف (الثابت)</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isEditable}
                    type="text"
                    placeholder="أدخل رقم الهاتف الثابت"
                    {...field}
                  />
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
            name="governorateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المحافظة</FormLabel>
                <FormControl>
                  <Select
                    disabled={!isEditable}
                    dir="rtl"
                    onValueChange={(f) => {
                      field.onChange(f);
                      form?.resetField("directorateId", { defaultValue: "" });
                    }}
                  >
                    <SelectTrigger className="text-sm" dir="rtl">
                      <span>
                        {allGovs?.find((e) => +e?.id == +field?.value)?.name ||
                          "المحافظة"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        {allGovs?.map((itm: any) => (
                          <SelectItem
                            key={itm?.id}
                            value={itm?.id + ""}
                            dir="rtl"
                          >
                            {itm?.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="directorateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المديرية</FormLabel>
                <FormControl>
                  <Select
                    disabled={!isEditable}
                    dir="rtl"
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <span>
                        {allDirects?.find((im: any) => im?.id == field?.value)
                          ?.name || "اختر مديرية"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {(!form?.getValues()?.governorateId ||
                        form?.getValues()?.governorateId == "") && (
                        <span className="text-sm text-center p-2">
                          يجب أن تختار محافظة اولا
                        </span>
                      )}
                      {allGovs
                        ?.find(
                          (e) => +e?.id == +form?.getValues()?.governorateId
                        )
                        ?.directorates?.map((ele: any) => (
                          <SelectItem key={ele?.id} value={ele?.id + ""}>
                            {ele?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        {/* Action Buttons */}
        {isEditable && (
          <div className="flex  gap-x-4 items-center mdHalf:static mdHalf:p-0 mdHalf:shadow-none mdHalf:m-0 fixed bottom-0 p-4  rounded-lg shadow-xl bg-white w-full left-0 right-0">
            <Button
              onClick={() => {
                setIsEditable(false);
                form.reset(profileData);
              }}
              variant="secondary"
              type="button"
              className=""
            >
              تجاهل
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white "
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "حفظ التعديلات"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default ProfileForm;
