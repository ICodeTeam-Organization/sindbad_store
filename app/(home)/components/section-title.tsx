import Link from "next/link";
import styles from "./SectionTitle.module.css";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => {
  return (
    <div className="py-5 w-full">
      <div className="flex justify-between items-center ">
        <div>
          <h3 className={styles.title + "  lg:text-2xl text-lg font-normal relative pr-3"}>
            {title} :
          </h3>
        </div>
        <Link href={"/shop"}>
        <button className="btn flex items-center text-sm ml-3 ">
          <IoIosArrowForward className="text-sky-700" />
          <h3 className="mr-2">عرض الكل</h3>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default SectionTitle;
