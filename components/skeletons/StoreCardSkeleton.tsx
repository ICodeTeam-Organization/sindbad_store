// components/skeletons/StoreCardSkeleton.tsx
export default function StoreCardSkeleton() {
  return (
    <div className="lg:container mx-auto my-10 mt-28">
      <div className="flex  items-center justify-between gap-x-8 mx-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="px-2 w-full" key={i}>
            <div
              dir="rtl"
              className="lgHalf:h-[135px] border border-gray-200 rounded-[10px] bg-white animate-pulse"
            >
              <div className="lgHalf:flex flex-row items-stretch h-full lgHalf:p-3 p-2 gap-3">
                {/* صورة المتجر */}
                <div className="flex justify-center items-center lgHalf:aspect-[10/7] aspect-square overflow-hidden rounded-[8px] bg-gray-200 relative" />

                {/* محتوى المتجر */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="my-2 space-y-2">
                    {/* اسم المتجر */}
                    <div className="h-4 w-3/4 bg-gray-300 rounded" />
                    {/* وصف المتجر */}
                    <div className="h-3 w-5/6 bg-gray-200 rounded" />
                  </div>

                  {/* زر تصفح المحل */}
                  <div className="flex w-full gap-x-2">
                    <div className="flex-1 p-2 rounded-[8px] border border-gray-200 bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
