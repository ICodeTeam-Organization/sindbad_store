import CategoryCard from "../CategoryCard";
import styles from "../SectionTitle.module.css";
import CategoriesDialog from "../CategoriesDialog";
import { getApi } from "@/lib/http";
import { Category } from "@/types/storeTypes";

const Categories = async () => {
  const categories = await getApi<any>(
    "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/30"
  );

  return (
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32 mt-10 ">
      <div className="py-5 w-full">
        <div className="flex justify-between items-center ">
          <div>
            <h3
              className={styles.title + "  text-2xl font-normal relative pr-3"}
            >
              الفئات
            </h3>
          </div>
          <CategoriesDialog />
        </div>
      </div>
      <div className="py-4 px-4 flex justify-center gap-3 ">
        {categories.data.map(
          (category: Category, index: number) =>
            index < 6 && (
              <div key={category.id} className=" md:block">
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  imageUrl={"/images/laptop-main.svg"}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Categories;
