import SectionTitle from "../SectionTitle";
import hero from "@/public/images/hero.jpg";
import ProductCard from "../ProductCard";

const ShoppingNow = () => {
  const products = [
    {
      Image: hero.src,
      productName: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
      price: 1200,
      oldPrice: 1600,
    },
    {
      Image: hero.src,
      productName: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
      price: 1200,
      oldPrice: 1600,
    },
    {
      Image: hero.src,
      productName: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
      price: 1200,
      oldPrice: 1600,
    },
    {
      Image: hero.src,
      productName: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
      price: 1200,
      oldPrice: 1600,
    },
    {
      Image: hero.src,
      productName: "ابريق شاي زجاجي مع امكانية التفاف النص في اسم الصنف",
      price: 1200,
      oldPrice: 1600,
    },
  ];

  return (
    <>
      <div className="container pt-10 mx-auto sm:px-4 md:px8  lg:px16 xl:px-32">
        <SectionTitle title={"تسوق الآن"} />
        <div className="container ">
          <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 gap-y-5 2xl:gap-[25px] max-sm:gap-x-1 max-lg:gap-x-5  max-md:m-auto  py-4 mr-2 ">
            {products.map((product) => (
              <ProductCard
                image={product.Image}
                productName={product.productName}
                price={product.price}
                oldPrice={product.oldPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingNow;
