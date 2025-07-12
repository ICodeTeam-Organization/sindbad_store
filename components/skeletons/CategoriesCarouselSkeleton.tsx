// components/skeletons/CategoriesCarouselSkeleton.tsx
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CategoriesCarouselSkeleton() {
  const count = 8; // عدد العناصر الكاملة في Desktop
  const rows = 2;

  const items = Array.from({ length: count * rows });

  return (
    <div dir="rtl" className="lg:container mx-auto p-4">
      <div className="pt-5 w-full">
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
          <div className="w-[200px] h-[2px] rounded-full bg-primary mt-2" />
        </div>
      </div>

      <div className="w-full relative overflow-hidden items-center pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {items.map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center py-4 rounded-md"
            >
              <div className="w-[120px] h-[120px] rounded-full bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>

        {/* أسهم مزيفة غير فعالة */}
        <button
          disabled
          className="bg-white opacity-70 absolute top-[50%] -translate-y-[50%] z-10 p-3 border rounded-full text-gray-300 -right-4 cursor-not-allowed"
        >
          <ArrowRight />
        </button>
        <button
          disabled
          className="bg-white p-3 absolute z-[0] top-[50%] -translate-y-[50%] border opacity-70 rounded-full text-gray-300 -left-4 cursor-not-allowed"
        >
          <ArrowLeft />
        </button>
      </div>
    </div>
  );
}
