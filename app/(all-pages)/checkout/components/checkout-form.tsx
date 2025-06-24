"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { checkoutSchema } from "../schema";
// import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Bank, CheckoutType } from "@/types/checkout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
// import { useRouter } from "next-nprogress-bar";
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
import InputField from "./input-field";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react"; 
import SuccessDialog from "./SuccessModal";
import { useEffect, useState } from "react";
// import { z } from "zod";
import { validateCheckoutForm } from "../schema";
import { Label } from "@/components/ui/label";
import {
  AddressResponse,
} from "@/app/(my-account)/user-addresses/types";
import { useRouter } from "next-nprogress-bar";
import useSendDataInBg from "@/hooks/useSendDataInBg";
 
import { db } from "@/Data/database/db";
import { useCartStore } from "@/app/stores_mangament/cartStore";
import { BgHandlerDataItemType } from "@/Data/cachingAndBgData/type";

function extractNumbers(str: string) {
  const numbers = str?.match(/\d+/g) || [];
  return numbers ? numbers.map(Number) : [];
}

const CheckoutForm = () => {
  const { data } = useQuery<any>({
    queryKey: ["banks"],
    queryFn: async () => await getApi("BankAccountsGetAccountsByCompany"),
  });

  const { data: addressData, isPending: isPendingForAdresses } =
    useQuery<AddressResponse>({
      queryKey: ["address-checkout"],
      queryFn: async () => await getApi(`CustomerAddress/GetCustomerAddress`),
    });

  const addressId = sessionStorage.getItem("cartAddress");
  const form = useForm<CheckoutType>({
    // resolver: zodResolver(checkoutSchema),
    defaultValues: {
      bank: "",
      date: "",
      image: undefined,
      note: "",
      number: "",
      customerAdressId:addressId ? +addressId : undefined  ,
    },
  });



  const { data: authData } = useSession();
  const { setCartItems } = useCartStore();
  const router = useRouter();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const [formsValues, setFormsValues] = useState<CheckoutType>();
  const [loadingData, setloadingData] = useState(false)
  // this is to force send data that saved in cache
  const {
    mutate: mutateBgData,
    isPending: isPendingForSendDataInBg,
    isSuccess,
    error:errorSendDataInBg
  } = useSendDataInBg();
  

  const { mutate, isPending } = useMutation({
    mutationKey: ["upload-bound"],
    mutationFn: async (data: CheckoutType) => {
      const formData = new FormData();
      if (data.bank) {
        formData.append("BankAccountId", String(+data.bank));
      }
      if (data.note) {
        formData.append("Note", data.note);
      }
      if (data.number) {
        formData.append("BondNumber", String(+data.number));
      }
      if (data.date) {
        formData.append("BondDate", data.date);
      }
      if (data.customerAdressId) {
        formData.append("customerAdressId", "" + data.customerAdressId);
      }
      if (data.image && data.image.length > 0) {
        formData.append("BondImageFile", data.image[0]);
      }
      formData.append("BondTyep", "1");
      formData.append("IsUrgentOrder", "false");

      return postApi("Orders/CompleteCustomerPurchase", {
        body: formData,
        isPage: true,
        headers: {
          "Accept-Language": "ar",
          Authorization: `Bearer ${authData?.user.data.token}`,
        },
      });
    },
    onError: (err) => {
      setloadingData(false)
      console.log(err);
      toast({
        variant: "destructive",
        description: err.message || "حدث خطأ أثناء معالجة الطلب",
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
    onSuccess: (data: any) => {
      const code = extractNumbers(data?.data as string)[0];
      setCartItems([]);
      setRequestNumber(code?.toString());
      setIsDialogOpen(true);
      setloadingData(false)
    },
  });

  useEffect(() => {
    if (isSuccess && !isPendingForSendDataInBg && !isPending && formsValues) {
      mutate(formsValues);
    } else if (!isSuccess && !isPendingForSendDataInBg && errorSendDataInBg) {
      console.log(errorSendDataInBg);
      toast({
        variant: "destructive",
        description: errorSendDataInBg.message || "حدث خطأ أثناء معالجة الطلب",
        // action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
      setloadingData(false)
    }
  }, [isSuccess]);

  async function onSubmit(values: CheckoutType) {
    const vald = validateCheckoutForm(values);
    if (vald.length == 0) {
      setloadingData(true)
       let bgData: BgHandlerDataItemType[] = await db.bgData.toArray() 
      if (bgData && bgData.length > 0) { 
        bgData = bgData.filter(
          (item) => item.reqType == 3 || item.reqType == 4
        );
        mutateBgData(bgData);
        setFormsValues(values);
      } else {
        mutate(values)
      }
    } else {
      toast({
        variant: "destructive",
        description: vald[0],
      });
    }
  }

  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <h1 className="font-bold text-xl text-center">إجراءات الدفع</h1>
        </CardHeader>
        <FormProvider {...form}>
          <form
            encType="multipart/form-data"
            onSubmit={form.handleSubmit((s) => {
              onSubmit(s);
            })}
          >
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="customerAdressId"
                render={({ field }) => (
                  <FormItem className="w-full" >
                    <Label>عنوان الإستلام</Label>
                    {/* <Select dir="rtl" onValueChange={field.onChange} disabled={true}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={addressId && !isPendingForAdresses ?addressData?.data?.find(e=>e?.id == +addressId)?.directorateName : "حدد عنوان الإستلام"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {addressData?.data?.map(
                            (address: customerAddressType) => (
                              <SelectItem
                                key={address?.id}
                                value={address?.id.toString()}
                              >
                                <p>
                                  <span> {address?.directorateName} : </span>
                                  <span className="text-xs text-gray-500">
                                    {address?.locationDescription}
                                  </span>
                                </p>
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                        {isPendingForAdresses ? (
                          <div className="p-4 flex items-center justify-center">
                            {" "}
                            <Loader2 className="animate-spin" />{" "}
                          </div>
                        ) : (
                          addressData?.data.length == 0 && (
                            <div className="text-sm flex flex-col items-center justify-center p-4">
                              <h1 className="mb-2"> لا توجد لديك عناوين </h1>
                              <Link
                                href={"/user-addresses"}
                                className="text-primary-background"
                              >
                                إضافة عنوان
                              </Link>
                            </div>
                          )
                        )}
                      </SelectContent>
                    </Select> */}
                     { !isPendingForAdresses ?  field?.value && (
                      <p className="text-sm text-black  mx-1">
                        <span>
                          <span className="text-primary-background">
                            {" "}
                          المستلم :{" "}
                          </span>
                          {
                            addressData?.data?.find(
                              (e) => +e.id == +field.value
                            )?.userName
                          }{" "}
                        </span>
                        <p/>
                        <span>
                          <span className="text-primary-background" >
                            {" "}
                          العنوان :
                          </span>
                          {addressData?.data?.find(e=>e?.id == +field.value)?.directorateName }
                          {" - "}
                          {
                            addressData?.data?.find(
                              (e) => +e.id == +field.value
                            )?.locationDescription
                          }{" "}
                        </span>
                      </p>
                    ) : <><Loader2 className="animate-spin" /></>}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank"
                render={({ field }: { field: any }) => (
                  <FormItem className="w-full">
                    <Label>الصراف</Label>
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="حدد الصراف/البنك" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {data?.data?.map((bank: Bank) => (
                            <SelectItem
                              key={bank?.id}
                              value={bank?.id.toString()}
                            >
                              {bank?.bankName} - {bank?.accountNumber}
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
                type="number"
              />
              <InputField
                name="date"
                label="تاريخ الدفع"
                control={form.control}
                type="date"
              />
              <InputField
                name="note"
                label="ملاحظة"
                control={form.control}
                type="text"
              />
              <p className="-mb-8 text-sm">صورة السند</p>
              <Input type="file" {...form.register("image")} accept="image/*" />
              <p className="text-[11px] text-gray-500 ">
                {" "}
                ملاحظة : يجب إضافة صورة السند او ادخال اسم البنك مع رقم السند{" "}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={loadingData}
                className="w-full hover:bg-orange-600 bg-primary-background transition-colors"
              >
                {loadingData ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "إرسال الطلب"
                )}
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
      <SuccessDialog
        open={isDialogOpen}
        requestNumber={requestNumber}
        onOpenChange={(e) => {
          setIsDialogOpen(e);
          router.push("/");
        }}
      />
    </>
  );
};

export default CheckoutForm;
