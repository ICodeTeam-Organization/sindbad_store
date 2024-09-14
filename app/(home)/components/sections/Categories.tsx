import CategoryCard from "../CategoryCard";
import styles from "../SectionTitle.module.css";
import CategoriesDialog from "../CategoriesDialog";

const Categories = () => {
  const categories = [
    { id: 1 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 16 },
    { id: 18 },
  ];

  return (
    <div className="container mx-auto sm:px-4 md:px-8 lg:px-16 xl:px-32  mt-10 md:mt-20">
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
      <div className="py-4 px-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-x-3  justify-center">
        {categories.map((category) => (
          <div key={category.id} className="hidden md:block">
            <CategoryCard />
          </div>
        ))}
        <div className="block md:hidden">
          <CategoryCard />
        </div>
        <div className="block md:hidden">
          <CategoryCard />
        </div>
        <div className="block md:hidden">
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};

export default Categories;
