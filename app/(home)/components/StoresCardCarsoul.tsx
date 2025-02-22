import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorite } from "@/app/stores/favoritesStore";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { deleteApi, postApi } from "@/lib/http";
import SafeImage from "@/components/SafeImage";

const StoresCardCarsoul: React.FC<{
  id: string;
  name: string;
  websiteLink: string;
  description: string;
  mainImageUrl: string;
  imagesUrl:string[];
  rate?: number;
}> = ({
  description,
  name,
  mainImageUrl,
  // websiteLink,
  id,
  // rate
}) => {
  const { favoriteStoreIds, addStoreToFavorite, delStoreToFavorite } =
    useFavorite();
  const isFavorite = favoriteStoreIds.find((ele) => ele == id);
  const { data: session, status } = useSession();
  const redirct = useRouter();
  const { toast } = useToast();

  const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(
        `FavoriteShop/AddStore`,
        {
          body: {
            storeId: id,
          },
          headers: {
            "Accept-Language": "ar",
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user.data.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      addStoreToFavorite(id);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "حدث خطأ أثناء إضافة المحل إلى المفضلة";
      toast({
        variant: "destructive",
        description: `خطأ: ${errorMessage}`,
        action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
      });
    },
  });

  const { mutate: mutateRemoveFromFav, isPending: isPendingRemoveFromFav } =
    useMutation({
      mutationFn: async () => {
        return await deleteApi(
          `FavoriteShop/RemoveStore/` + id,
          {
            headers: {
              Authorization: `Bearer ${session?.user.data.token}`,
            },
          }
        );
      },
      onSuccess: () => {
        delStoreToFavorite(id);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          "حدث خطأ أثناء حذف المحل إلى المفضلة";
        toast({
          variant: "destructive",
          description: `خطأ: ${errorMessage}`,
          action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
        });
      },
    });

  const handleAddToFav = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      if (isFavorite) {
        mutateRemoveFromFav();
      } else {
        mutateAddToFav();
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-[35%] h-full relative me-3">
        {mainImageUrl === null ? (
          <h1>لاتوجد صورة للمحل</h1>
        ) : (
          <SafeImage
            src={
              mainImageUrl?.startsWith("http")
                ? mainImageUrl
                : "/" + mainImageUrl
            }
            alt={"store"}
            // layout="fill"
            fill
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between h-full py-2">
        <div>
          <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
            {name}
          </h1>
          <p className="mdHalf:text-sm text-[11px] my-2 line-clamp-1 text-[#666666]">
            {description ? description : " ."}
          </p>
          {/* <div className="flex items-center max-sm:w-20 mb-1">
            <AiFillStar className="text-[#FFC62A] text-xs" />
            <p className="text-[#A5A5A5] text-[12px] mr-1">(4.5)</p>
          </div> */}
        </div>
        <div className="flex  w-full gap-x-2   ">
          <Link
            href={"/stores/storeDetails/" + id}
            className="flex-1 p-2 cursor-pointer rounded-sm border-[1px] group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
          >
            <h1 className="text-base">زيارة المحل</h1>
            <IoIosArrowBack />
          </Link>
          <Button
            variant={"outline"}
            onClick={handleAddToFav}
            className={cn(
              "cursor-pointer group hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300  rounded-[5px]  border-[1px] flex justify-center items-center p-4 py-5 ml-2",
              isFavorite && "bg-[#F55157] text-white"
            )}
          >
            {isPendingAddToFav || isPendingRemoveFromFav ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <AiFillHeart
                  className={cn("w-[20px] h-[20px] ", isFavorite && "block")}
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default StoresCardCarsoul;
