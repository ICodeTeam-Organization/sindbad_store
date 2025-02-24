"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddshipingadressSchema } from "@/app/auth/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi, putApi } from "@/lib/http";
import { useEffect, useState } from "react";
import { SelectLabel } from "@radix-ui/react-select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { customerAddressType, UpdateAdressResponse } from "../types";
import { DialogTitle } from "@radix-ui/react-dialog";

// type addAdress = {
//   directorateId: number;
//   locationDescription: string;
//   phoneNumber: string;
//   customerName: string;
// };

const AddAddressDialog = ({
  show = false,
  setShow,
  isEditing=false,
  dataEditing,
  onEditEnd,
  onAddAddressEnd,
  onClose,
}: {
  show: boolean;
  setShow: (status: boolean) => void;
  isEditing?:boolean;
  dataEditing?:customerAddressType,
  onEditEnd?:(data:customerAddressType)=>void;
  onAddAddressEnd?:(data:customerAddressType)=>void;
  onClose:()=>void;
}) => {

  
  const [directorates, setDirectorates] = useState<any[]>([]);

  const { data } = useQuery({
    queryKey: ["city"],
    queryFn: () => getApi<any>(`Locations/GetGovernorateWithChildren`),
  });
  


  function getGovernorateByDirectorateId(directorateId:number) {
    if(data?.data){
      for (const governorate of data?.data) {
        const directorate = governorate.directorates.find((dir:any) => dir.id === directorateId);
        if (directorate) {
            return governorate;
        }
    }
    return null;
    }
}

const form = useForm<z.infer<typeof AddshipingadressSchema>>({
  resolver: zodResolver(AddshipingadressSchema),
  defaultValues: {
    locationDescription: "",
    customerName: "",
    phoneNumber: "",
    stateid: "",
    city: "",
  },
});

// Effect to reset form when isEditing or dataEditing changes
useEffect(() => {
  if (isEditing && dataEditing) {
    form.reset({
      locationDescription: dataEditing.locationDescription ?? "",
      customerName: dataEditing.customerName ?? "",
      phoneNumber: dataEditing.phoneNumber  ?? "",
      stateid: dataEditing.directorateId && getGovernorateByDirectorateId(dataEditing.directorateId)?.id ? getGovernorateByDirectorateId(dataEditing.directorateId)?.id +"": "",
      city: dataEditing.directorateId ? String(dataEditing.directorateId) : "",
    }); 
    setDirectorates(getGovernorateByDirectorateId(dataEditing.directorateId||0)?.directorates);
  }
  
}, [isEditing, dataEditing]);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      city,
      customerName,
      phoneNumber,
      locationDescription,
    }: z.infer<typeof AddshipingadressSchema>) =>
      await postApi<UpdateAdressResponse>(`CustomerAddress/AddCustomerAddress`, {
        body: {
          directorateId: +city,
          customerName: customerName,
          phoneNumber: phoneNumber,
          locationDescription: locationDescription,
        },
      }),
    onSuccess: (data) => {
      toast.success("تم إضافة العنوان");
       if(onAddAddressEnd) onAddAddressEnd(data?.data as customerAddressType)
      form.reset()
      setShow(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate:mutateForEditing, isPending:isPendingForEditing } = useMutation({
    mutationFn: async ({
      city,
      customerName,
      phoneNumber,
      locationDescription,
    }: z.infer<typeof AddshipingadressSchema>) =>
      await putApi<UpdateAdressResponse>(`CustomerAddress/UpdateCustomerAddress?customerAddressId=${dataEditing?.id}`, {
         body:{
          directorateId: +city,
          customerName: customerName,
          phoneNumber: phoneNumber,
          locationDescription: locationDescription,
        },
      }),
    onSuccess: (data) => {
      console.log(data,"address editable");
      
      toast.success("تم تعديل العنوان");
       if(onEditEnd) onEditEnd(data.data as customerAddressType)
        form.reset()
        setShow(false);
    },
    onError: (error) => {
      console.log(error);
      
      toast.error(error.message);
    },
  });


  function onSubmit(values: z.infer<typeof AddshipingadressSchema>) {
    if (isEditing) {
      console.log(values);
      mutateForEditing(values)
    } else {
      mutate(values);
    }
  }

  return (
    <Dialog open={show} onOpenChange={()=>{
      form.reset({
        locationDescription: "",
        customerName: "",
        phoneNumber: "",
        stateid: "",
        city: "",
      });
      onClose();
      setShow(false);}} >
      <DialogTitle></DialogTitle>
      {  (
        <DialogContent className="m-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              dir="rtl"
            >
              <DialogHeader>
                <div className=" mdHalf:p-8">
                  <h1 className="text-right text-base font-bold my-6">
                    {" "}
                    إضافة عنوان جديد{" "}
                  </h1>

                  <FormLabel className="m-auto text-sm font-bold mb-2">
                    <p className=" text-right">المنطقة</p>
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2 ">
                    <FormField
                      control={form.control}
                      name="stateid"
                      render={({ field }) => (
                        <FormItem className="text-center">
                          <FormControl>
                            <Select
                              onValueChange={(e) => {
                                field.onChange(e);
                                const der = data?.data?.find(
                                  (dir: any) => +dir.id == +e
                                );
                                setDirectorates(der?.directorates || []);
                                form?.resetField("city");
                              }}
 
                            >
                              <SelectTrigger className="text-sm" dir="rtl" value={field.value} >
                                <SelectValue  placeholder={ getGovernorateByDirectorateId(+field?.value||0)?.name || "المحافظة"} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  {data?.data?.map((itm: any) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="text-center">
                          <FormControl>
                            <Select onValueChange={field.onChange} >
                              <SelectTrigger className="text-sm" dir="rtl" value={field.value} >
                                <SelectValue 
                                placeholder="المديرية"
                                // placeholder={!!(field?.value)? directorates?.find(e=>e?.id==field?.value)?.name : "المديرية"} 
                                 />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  <SelectLabel>
                                    {!form.getValues().stateid &&
                                      "يجب اختيار المحاظة اولا"}
                                  </SelectLabel>
                                  {form.getValues().stateid &&
                                    directorates?.length > 0 &&
                                    directorates?.map((city: any) => (
                                      <SelectItem
                                        key={city?.id}
                                        value={city?.id + ""}
                                        dir="rtl"
                                      >
                                        {city?.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="place"
                      render={({ field }) => (
                        <FormItem className="text-center">
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="text-sm" dir="rtl">
                                <SelectValue placeholder="المنطقة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  <SelectLabel>
                                    {regions.length > 0
                                      ? "المناطق"
                                      : "يجب اختيار المديرية اولا"}
                                  </SelectLabel>
                                  {regions.length > 0 &&
                                    regions.map((rigion: any) => (
                                      <SelectItem
                                        key={rigion.id}
                                        value={rigion.id.toString()}
                                      >
                                        {rigion.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-sm font-bold mb-2">
                          <p>المستلم</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-sm font-bold mb-2">
                          <p>رقم التلفون</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locationDescription"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-sm font-bold mb-2">
                          <p>العنوان</p>
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogHeader>

              <DialogFooter
                className=" flex flex-row mdHalf:px-8 gap-x-2 "
                dir="ltr"
              >
                <Button
                  type="submit"
                  className="bg-primary-background hover:bg-primary-background"
                >
                  {isPending || isPendingForEditing? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    isEditing ? "تعديل" :"حفظ العنوان"
                  )}
                </Button>
                <DialogClose>
                  <Button type="button">إلغاء</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddAddressDialog;
