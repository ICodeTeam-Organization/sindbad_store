import Link from "next/link";
import styles from "./SectionTitle.module.css";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  title: string;
  href:string
};

const SectionTitle = ({ title,href="/shop" }: Props) => {
  return (
    <div className="py-5 w-full">
      <div className="flex justify-between items-center mdHalf:mx-4  mx-1 ">
        <div>
          <h3 className={styles.title + "  lg:text-lg text-base font-normal relative pr-3"}>
            {title} :
          </h3>
        </div>
        <Link href={href}>
        <button className="btn flex items-center text-sm ml-3 ">
          <h3 className="mr-2 mdHalf:text-sm  text-xs">عرض الكل</h3>
          <IoIosArrowBack className="text-sky-700" />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default SectionTitle;
