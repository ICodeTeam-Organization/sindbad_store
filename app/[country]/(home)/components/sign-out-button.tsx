import { Button } from "@/components/ui/button";
import useSignOut from "@/hooks/useSignOut";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React from "react";

const SignOutButton = () => {
  const signOut = useSignOut();

  return (
    <Button
      variant={"outline"}
      disabled={signOut.isPending}
      onClick={() => signOut.mutate()}
    >
      {signOut.isPaused ? (
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

export default SignOutButton;
