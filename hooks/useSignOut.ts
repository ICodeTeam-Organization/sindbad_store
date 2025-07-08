import { db } from "@/Data/database/db";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import useSendDataInBg from "./useSendDataInBg";

const useSignOut = () => {
  const { mutateAsync } = useSendDataInBg()
  return useMutation({
    mutationFn: async () => {
      const data = await db.bgData.toArray();
      if (data.length > 0) {
        await mutateAsync(data)
      }
      return await signOut({
        callbackUrl: "/", 
      });
    },
  });
};

export default useSignOut;
