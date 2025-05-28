import { SEND_DATA_IN_BG_LOCALSTORAGE_KEY } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem(SEND_DATA_IN_BG_LOCALSTORAGE_KEY);
      return await signOut({
        callbackUrl: "/",
      });
    },
  });
};

export default useSignOut;
