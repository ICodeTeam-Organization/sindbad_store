"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LogOutButton = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: () => signOut(),
    onError: () => {
      toast({
        variant: "destructive",
        description: "حدث خطأ اثناء تسجيل الخروج يرجى المحاولة لاحقا",
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  return (
    <Button
      onClick={() => {
        mutate();
      }}
      variant={"outline"}
      disabled={isPending}
      className="mt-2 absolute bottom-8"
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Label
          htmlFor="username"
          className="text-right text-2xl cursor-pointer text-red-500"
        >
          تسجيل الخروج
        </Label>
      )}
    </Button>
  );
};

export default LogOutButton;
