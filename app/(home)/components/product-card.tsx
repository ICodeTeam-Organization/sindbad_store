import Image from "next/image";
import AddToBasket from "./add-to-basket";
import Link from "next/link";

type props = {
  cn?: string;
  id: string;
  image: string;
  productName: string;
  price: number;
  oldPrice?: number;
  ProductDet: number;
};
const ProductCard = ({
  cn,
  id,
  image,
  productName,
  price,
  oldPrice,
  ProductDet,
}: props) => {
  return (
    <div
      className={
        cn +
<<<<<<< Updated upstream
        ` m-auto rounded-t-[8px] w-[230px] max-md:w-[150px] max-sm:w-28 max-lg:w-44 max-lg:h-60  max-md:h-[183px] h-[339px]`
=======
        ` m-auto rounded-t-[8px] border hover:border-purple-600 hover:border ho transition-all hover:-translate-y-1 hover:shadow `
>>>>>>> Stashed changes
      }
    >
      <Link href={`/shop/productDetils/${ProductDet}`}>
        <Image
          className="h-[210px] max-lg:h-28 max-sm:h-20 rounded-t-[8px]"
          src={image}
          alt={""}
          width={250}
          height={0}
          priority
        />
      </Link>
      <div className="border-[1px] border-t-0 border-[#C3C3C3]  max-md:pr-1 pr-2">
        <Link href={`/shop/productDetils/${ProductDet}`}>
          <p className=" line-clamp-2 font-[Tajawal] text-[#007580] text-lg max-md:text-xs text-right">
            <strong>{productName}</strong>
          </p>
          <div className="text-right flex justify-start">
            <p className="max-md:pr-3 pr-5 max-md:text-xs text-xl text-[#F55157]">
              <strong>{price}</strong>
            </p>
            <p className="pr-4 max-md:pr-2 text-[12px] max-md:text-[9px] line-through">
              {oldPrice}
            </p>
          </div>
        </Link>
        <AddToBasket id={id} />
      </div>
    </div>
  );
};

export default ProductCard;
