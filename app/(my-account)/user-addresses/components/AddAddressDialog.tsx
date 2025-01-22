"use client";
import { useRouter } from "next/navigation";
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
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http";
import { useEffect, useState } from "react";
import { SelectLabel } from "@radix-ui/react-select";
import { toast } from "sonner";

type addAdress = {
  regionId: number;
  locationDescription: string;
};

const AddAddressDialog = ({
  show = false,
  setShow,
}: {
  show: boolean;
  setShow: (status: boolean) => void;
}) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);
  const [directorates, setDirectorates] = useState<any[]>([]);
  const [regions, setRegions] = useState<any>([]);
  const form = useForm<z.infer<typeof AddshipingadressSchema>>({
    resolver: zodResolver(AddshipingadressSchema),
    defaultValues: {
      title: "",
      reciver: "محمد علي سالم عبدالله",
      phone: "770700718",
      stateid: "",
      city: "",
      place: "",
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["city"],
    queryFn: () => getApi<any>(`Locations/GetGovernorateWithChildren`),
  });
  const selectedState = form.watch("stateid");
  const selectedCity = form.watch("city");

  useEffect(() => {
    if (selectedState) {
      const newDirectorates = data.data.find(
        (state: any) => state.name === selectedState
      ).directorates;

      setDirectorates(() => [...newDirectorates]);
    }
  }, [selectedState]);

  //-----------------this for get regions
  useEffect(() => {
    if (selectedCity) {
      const newRegions = directorates.find(
        (city: any) => city.name === selectedCity
      ).regions;
      setRegions(() => [...newRegions]);
    }
  }, [selectedCity]);

  const { mutate } = useMutation({
    mutationFn: async ({ locationDescription, regionId }: addAdress) =>
      await postApi<any>(`CustomerAddress/AddCustomerAddress`, {
        body: {
          regionId,
          locationDescription,
        },
      }),
    onSuccess: () => {
      toast.success("تم إضافة العنوان");
      router.refresh();
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(values: z.infer<typeof AddshipingadressSchema>) {
    mutate({
      regionId: parseInt(values.place),
      locationDescription: values.title,
    });
  }

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Dialog open={show} onOpenChange={setShow} >
      <DialogTrigger asChild>
        
      </DialogTrigger>
      {showForm && (
        <DialogContent className="m-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <div className="m-auto p-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-3xl font-bold mb-2">
                          <p>العنوان</p>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormLabel className="m-auto text-3xl font-bold mb-2">
                    <p className=" text-right">المنطقة</p>
                  </FormLabel>
                  <div className="grid grid-cols-3 gap-2 ">
                    <FormField
                      control={form.control}
                      name="stateid"
                      render={({ field }) => (
                        <FormItem className="text-center">
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="text-xl">
                                <SelectValue placeholder="المحافظة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  {data.data.map((itm: any) => (
                                    <SelectItem key={itm.id} value={itm.name}>
                                      {itm.name}
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
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="text-xl">
                                <SelectValue placeholder="المديرية" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup {...field}>
                                  <SelectLabel>
                                    {directorates.length > 0
                                      ? "المديريات"
                                      : "يجب اختيار المحاظة اولا"}
                                  </SelectLabel>
                                  {directorates.length > 0 &&
                                    directorates.map((city: any) => (
                                      <SelectItem
                                        key={city.id}
                                        value={city.name}
                                      >
                                        {city.name}
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
                      name="place"
                      render={({ field }) => (
                        <FormItem className="text-center">
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="text-xl">
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
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="reciver"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-3xl font-bold mb-2">
                          <p>المستلم</p>
                        </FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="my-4 text-right">
                        <FormLabel className="m-auto text-3xl font-bold mb-2">
                          <p>رقم التلفون</p>
                        </FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogHeader>

              <DialogFooter>
                <Button type="submit">حفظ التعديلات</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddAddressDialog;
