import SectionTitle from "../section-title";
import ProductCard from "../product-card";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
const RecentlyAdded = async () => {
  const RecentlyProducts = await getApi<any>(
    "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/5"
  );
  if (!RecentlyProducts) return notFound();

  return (
<<<<<<< Updated upstream
    <div className="container pt-10 mx-autocontainer mx-auto sm:px-4 md:px8 lg:px16 xl:px-32">
=======
    <div className=" pt-10  mx-auto ">
>>>>>>> Stashed changes
      <SectionTitle title={"اضيفت مؤخرا"} />
      <div className="container ">
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 gap-y-5 2xl:gap-[25px] max-sm:gap-x-1 max-lg:gap-x-5  max-md:m-auto  py-4 mr-2 ">
          {RecentlyProducts?.data?.map((product: any) => (
            <ProductCard
              key={product.id}
<<<<<<< Updated upstream
              id={product.id}
              image={product.mainImageUrl}
              productName={product.name}
              price={product.price}
              ProductDet={product.id}
            />
=======
              className="pl-0 ml-4 xlHalf:basis-1/6 2lg:basis-[22%] mdHalf:basis-[25%] 2sm:basis-[35%] sm:basis-[42%] 2xs:basis-[34%] 1xs:basis-[45%] basis-1/2 rounded-t-[8px] "
              >
                <div className="sm:w-[220px]  1xs:w-[180px] w-full" >
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.mainImageUrl}
                productName={product.name}
                price={product.price}
                ProductDet={product.id}
              />
              </div>
              {/* <Link href={`/shop/productDetils/${product.id}`}>
                <Image
                  className="h-[210px] max-md:h-[120px] md:h-[120px] xl:h-[150px] rounded-t-[8px]"
                  src={product.mainImageUrl}
                  alt={""}
                  width={400}
                  height={0}
                />
              </Link>
              <div className="border-[1px] border-[#C3C3C3] border-t-0 pr-1">
                <Link href={`/shop/productDetils/${product.id}`}>
                  <p className="line-clamp-2 font-[Tajawal] xl:pr-1 text-[#007580] text-base max-md:text-[12px] md:text-[14px] text-right mt-1 ">
                    <strong>{product.name}</strong>
                  </p>
                  <div className="max-md:mt-2 max-sm:pr-0 pr-5 lg:mt-4 xl:mb-2 md:mt-1 text-right max-md:gap-0 md:gap-0 max-md:text-[12px] gap-[7px] flex justify-end">
                    <p className="pr-3 text-[12px] line-through">
                      {product.priceBeforOffer}
                    </p>
                    <p className=" text-lg  text-[#F55157]">
                      <strong>{product.priceAfterOffer}</strong>
                    </p>
                  </div>
                </Link>
                <div dir="rtl">
                  <AddToBasket id={product.id} />
                </div>
              </div> */}
            </CarouselItem>
>>>>>>> Stashed changes
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
