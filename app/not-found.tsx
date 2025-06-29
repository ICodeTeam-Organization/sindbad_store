import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md"; 
import { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <div> 
     <Suspense>
      {/* <StoreHeader /> */}
     </Suspense>
    <div className=" mb-20 text-center flex flex-col items-center justify-center mx-2 md:mx-0">
      <Image src="/images/opps.svg" alt="" width={350} height={350} />
      <h1 className="font-bold text-1xl mb-1 mt-2">404, هذا الرابط غير صحيح</h1>
      <p className="text-xm text-gray-400">
        عذرًا، يبدو أن هناك خطأ ما. يبدو أن الطلب الذي قدمته لم يُعثر عليه. من
        المحتمل أن يكون الرابط معطلاً أو أن الصفحة قد أُزيلت.
      </p>
      <div className="flex gap-3 mt-4">
        <Link href={"/"}>
          <Button
            variant={"outline"}
            className="font-bold hover:bg-primary hover:text-white"
          >
            <span className="ml-2">الرئيسية</span> <MdOutlineHome size={20} />
          </Button>
        </Link>
        <BackButton />
      </div>
    </div>
    </div>
  );
};

export default NotFoundPage;
