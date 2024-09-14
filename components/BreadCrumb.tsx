import { AiOutlineLeft } from "react-icons/ai";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
type Props = {
  SecondName?: string;
  SecondDir?: string;
  ThirdName?: string;
  ThirdDir?: string;
  ForthName?: string;
  ForthDir?: string;
  FifthName?: string;
  FifthDir?: string;
};

const BreadCrumb = ({
  SecondName,
  SecondDir = "",
  ThirdName,
  ThirdDir = "",
  ForthName,
  ForthDir = "",
  FifthName,
  FifthDir = "",
}: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-gray-100 py-5 pr-14">
        <BreadcrumbItem>
          <Link className="flex justify-between items-center" href="/">
            <GrHomeRounded className="ml-2 pb-1" size={20} />
            <h3>الرئيسية</h3>
          </Link>
        </BreadcrumbItem>
        <>
          <BreadcrumbItem>
            {SecondName && (
              <>
                <AiOutlineLeft className="ml-2" />
                <Link
                  className="flex justify-between items-center"
                  href={SecondDir}
                >
                  <h3>{SecondName}</h3>
                </Link>
              </>
            )}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {ThirdName && (
              <>
                <AiOutlineLeft className="ml-2" />
                <Link
                  className="flex justify-between items-center"
                  href={ThirdDir}
                >
                  <h3>{ThirdName}</h3>
                </Link>
              </>
            )}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {ForthName && (
              <>
                <AiOutlineLeft className="ml-2" />
                <Link
                  className="flex justify-between items-center"
                  href={ForthDir}
                >
                  <h3>{ForthName}</h3>
                </Link>
              </>
            )}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {FifthName && (
              <>
                <AiOutlineLeft className="ml-2" />
                <Link
                  className="flex justify-between items-center"
                  href={FifthDir}
                >
                  <h3>{FifthName}</h3>
                </Link>
              </>
            )}
          </BreadcrumbItem>
        </>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
