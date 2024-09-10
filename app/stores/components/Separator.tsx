import { GoHome } from "react-icons/go";

export default function Separator() {
  return (
    <div className="bg-gray-100 h-20 flex justify-center">
      <div className="container mx-auto flex items-center text-gray-600 md:mr-12 justify-center md:justify-start">
        {/* Home Icon */}
        <GoHome className="ml-4" />
        {/* Breadcrumbs */}
        <nav className="flex items-center">
          <span className="m-2">الرئيسية</span> &gt;
          <span className="m-2">المتجر</span> &gt;
          <span className="m-2 text-orange-600">العروض</span>
        </nav>
      </div>
    </div>
  );
}
