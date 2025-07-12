// components/skeletons/ProductCarouselSkeleton.tsx  سو div عادي
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCardSkeleton from "../ProductCardSkeleton";

export default function ProductCarouselSkeleton() {
  const items = Array.from({ length: 6 }); // عدد المنتجات الظاهر في السطر الكامل

  return (
    <div dir="rtl" className="lg:container mx-auto sm:p-4 p-2">
      <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
          <div className="w-[150px] h-[2px] rounded-full bg-primary mt-2" />
        </div>
      </div>

      <div className="w-full relative overflow-hidden">
        <div className="flex gap-2 px-2 items-center justify-center">
          {items.map((_, i) => (
            <div
              key={i}
              className="px-2 my-2 sm:w-[220px] w-[180px] shrink-0 animate-pulse"
            >
               <ProductCardSkeleton  />
            </div>
          ))}
        </div>

        <button
          disabled
          className="bg-white opacity-70 absolute top-[50%] -translate-y-[50%] z-10 p-3 border rounded-full text-gray-300 -right-4 cursor-not-allowed"
        >
          <ArrowRight />
        </button>

        <button
          disabled
          className="bg-white p-3 absolute top-[50%] -translate-y-[50%] border opacity-70 rounded-full text-gray-300 -left-4 cursor-not-allowed"
        >
          <ArrowLeft />
        </button>
      </div>

      <div className="flex items-center justify-center my-4 border-b mt-8">
        <div className="bg-secondary flex items-center gap-x-4 text-sm p-3 rounded-t-md text-white opacity-70 cursor-not-allowed">
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
