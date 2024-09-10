import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function Pagination() {
  return (
    <div className="container mx-auto px-4">
      <nav
        className="flex flex-wrap justify-between md:justify-center items-center"
        aria-label="Pagination"
      >
        {/* Previous Page Button */}
        <Link
          href="#"
          className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-orange-500 bg-white text-orange-500 hover:bg-orange-100"
          title="Next Page"
        >
          <span className="sr-only">Next Page</span>
          <GoChevronRight className="block w-5 h-5" />
        </Link>

        {/* Page Buttons (1 to 5) */}
        {[1, 2, 3, 4, 5].map((page) => (
          <Link
            href="#"
            key={page}
            className={`hidden sm:flex w-8 h-8 md:w-10 md:h-10 mx-1 justify-center items-center rounded-full border ${
              page === 3
                ? "border-orange-500 bg-orange-500 text-white pointer-events-none"
                : "border-gray-300 bg-white text-black hover:bg-gray-100"
            }`}
            aria-current={page === 3 ? "page" : undefined}
            title={`Page ${page}`}
          >
            {page}
          </Link>
        ))}

        {/* Next Page Button */}
        <Link
          href="#"
          className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-orange-500 bg-white text-orange-500 hover:bg-orange-100"
          title="Previous Page"
        >
          <span className="sr-only">Previous Page</span>
          <GoChevronLeft className="block w-5 h-5" />
        </Link>
      </nav>
    </div>
  );
}