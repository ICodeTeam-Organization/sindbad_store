import { Button } from "@/components/ui/button";
import { Category } from "@/types/storeTypes";
import Link from "next/link";

type Props = {
  subCategories: Category[];
};

const SubCategories = ({ subCategories }: Props) => {
  return (
    <div className="border sm:w-40 md:w-1/2 p-2  ">
      <h1 className="font-bold text-xl text-center mb-4">الفرعية</h1>
      <div className="max-h-96 lg:h-80 p-2 text-center  overflow-auto">
        {subCategories && subCategories.length > 0 ? (
          subCategories.map((category: Category) => (
            <Link href={"/shop/"} key={category.id}>
              <Button
                variant={"outline"}
                className="w-40 md:w-72 lg:w-full mb-3   lg:text-xl"
              >
                {category.name}
              </Button>
            </Link>
          ))
        ) : (
          <p className="font-bold mt-20 min-w-40 ">
            لا تتوفر اي فئة فرعية في الوقت الحالي
          </p>
        )}
      </div>
    </div>
  );
};

export default SubCategories;
