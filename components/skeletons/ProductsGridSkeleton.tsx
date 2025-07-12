import ProductCardSkeleton from "../ProductCardSkeleton";

// components/skeletons/ProductGridSkeleton.tsx
export default function ProductGridSkeleton() {
  const items = Array.from({ length: 12 }); // عدّل العدد حسب الحاجة

  return (
    <div className="lg:container mx-auto my-10 mt-28">
      <div className="grid grid-cols-6 max-xlHalf:grid-cols-5 max-lgHalf:grid-cols-4 max-mdHalf:grid-cols-3 max-smHalf:grid-cols-2 max-xxs:grid-cols-1 gap-4 px-2">
      {items.map((_, i) => (
       <div className="w-full" key={i}>
          <ProductCardSkeleton key={i} />
        </div>
      ))}
    </div>
    </div>
  );
}
