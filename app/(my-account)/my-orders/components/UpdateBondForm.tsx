"use client"; 
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi, putApi } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 
import { CheckoutType } from "@/types/checkout";
import InputField from "@/app/(all-pages)/checkout/components/input-field";
import { useRouter } from "next-nprogress-bar"; 

const UpdateBondForm = ({ orderId , onUpdateComplete }: { orderId: number, onUpdateComplete:()=>void }) => {
    const { toast } = useToast();   

    const form = useForm<CheckoutType>({
        defaultValues: {
            bank: "",
            date: "",
            image: undefined,
            number: "",
        },
    });

    const { data: bankData } = useQuery({
        queryKey: ["banks"],
        queryFn: async () => await getApi<any>("BankAccountsGetAccountsByCompany"),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["update-bond", orderId],
        mutationFn: async (data: CheckoutType) => {
            const formData = new FormData();
            formData.append("BankAccountId", String(data.bank));
            formData.append("Date", data.date);
            formData.append("Number", data.number);
            if (data.image && data.image.length > 0) {
                formData.append("Image", data.image[0]);
            }

            return putApi(`Orders/${orderId}/Bond`, {
                body: formData,
                headers: {
                    "Accept-Language": "ar",
                },
            });
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                description: err.message || "حدث خطأ أثناء تحديث السند",
                // action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
            });
        },
        onSuccess: () => {  
            onUpdateComplete()
            toast({
                description: "تم تحديث السند بنجاح",
            });
            
        },
    });

  const onSubmit = (values: CheckoutType) => {
    
    const hasFullFields = values.bank && values.date && values.number;
    const hasImage = values.image;

    if (!hasFullFields && !hasImage) {
        toast({
            variant: "destructive",
            description: "يرجى إدخال رقم السند والتاريخ والبنك، أو تحميل صورة السند.",
        });
        return;
    }

    mutate(values);
};

    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <h1 className="font-bold text-lg text-center">تحديث سند الطلب رقم {orderId}</h1>
            </CardHeader>
            <FormProvider {...form}>
                <form
                    encType="multipart/form-data"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <CardContent className="space-y-4">
                        <FormField

                            control={form.control}
                            name="bank"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>الصراف / البنك</Label>
                                    <Select onValueChange={field.onChange} value={field.value} dir="rtl">
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="اختر البنك" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {bankData?.data?.map((bank: any) => (
                                                    <SelectItem key={bank.id} value={bank.id.toString()}>
                                                        {bank.bankName} - {bank.accountNumber}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <InputField
                            name="number"
                            label="رقم السند"
                            control={form.control}
                            type="text"

                        />

                        <InputField
                            name="date"
                            label="تاريخ الدفع"
                            control={form.control}
                            type="date"
                        />

                        <Label  >صورة السند (اختياري)</Label>
                        <Input
                            type="file"
                            {...form.register("image")}
                            accept="image/*"
                        />
                        <p className="text-xs text-gray-600" >{"يجب إدخال رقم السند والتاريخ والبنك، أو تحميل صورة السند."}</p>
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary hover:bg-orange-600"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : "تحديث السند"}
                        </Button>
                    </CardFooter>
                </form>
            </FormProvider>
        </Card>
    );
};

export default UpdateBondForm;
