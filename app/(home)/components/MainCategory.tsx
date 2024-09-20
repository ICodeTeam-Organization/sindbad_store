import { Button } from "@/components/ui/button";
import { getApi } from "@/lib/http";
import { Category } from "@/types/storeTypes";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type Props = {
  onClick: (id: number) => void;
};

const MainCategory = ({ onClick }: Props) => {
  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["main-category"],
    queryFn: () =>
      getApi(
        "Market/categories/GetNumberOfMainCategoriesForViewInMarketHomePage/100"
      ),
  });

  return (
    <div className="border sm:w-40 md:w-1/2 p-2">
      <h1 className="font-bold text-xl text-center mb-4">الرئيسية</h1>
      {isLoading ? (
        <Loader2 className="mx-auto mt-36 text-center animate-spin" />
      ) : error ? (
        <span className="block text-red-500  text-center font-bold mt-36">
          هناك خطأ اثناء جلب البيانات
        </span>
      ) : (
        <div className="h-auto lg:h-80 p-2 overflow-auto">
          {data.data.map((category: Category) => (
            <Button
              className="w-40 md:w-72 lg:w-full mb-3 bg-gray-400 lg:text-xl"
              onClick={() => onClick(category.id)}
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
