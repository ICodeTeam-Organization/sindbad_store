import { Button } from "@/components/ui/button";
import { getApi } from "@/lib/http";
import { Category } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const MainCategory = () => {
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["main-category"],
    queryFn: () =>
      getApi(
        "Market/Category/GetAllMainCategoriesWithPaginationForViewInCategoriesPage"
      ),
  });

  return (
    <div className="border sm:w-40 md:w-60 lg:w-1/2 p-2">
      <h1 className="font-bold text-xl text-center mb-4">الرئيسية</h1>
      {isLoading ? (
        <Loader className="mx-auto mt-36 text-center" />
      ) : error ? (
        <span className="block text-red-500  text-center font-bold mt-36">
          هناك خطأ اثناء جلب البيانات
        </span>
      ) : (
        <div className="h-80 p-2 overflow-auto">
          {data.data.map((category: Category) => (
            <Button
              className="w-40 md:w-72 lg:w-full mb-3 bg-gray-400 lg:text-xl"
              onClick={() => {}}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainCategory;