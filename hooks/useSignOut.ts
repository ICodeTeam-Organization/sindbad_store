import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const useSignOut = () => {
  return useMutation({
    mutationFn: async () => await signOut({
      callbackUrl:"/"
    }),
  });
};

export default useSignOut;
