"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  //       "total": 6,
  //   "page": 1,
  //   "limit": 5,
  //   "totalPages": 2
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = page || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isPageOne = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="self-center flex gap-10">
      <Link
        href={currentPage === 1 ? "" : createPageURL(currentPage - 1)}
        className={` ${isPageOne ? "bg-gray-400" : "bg-[#327595]"}   p-1  rounded-sm text-white `}
      >{`< Prev`}</Link>
      <Link
        href={currentPage >= totalPages ? "" : createPageURL(currentPage + 1)}
        className={`${isLastPage ? "bg-gray-400" : "bg-[#327595]"} p-1 rounded-sm text-white`}
      >{`Next >`}</Link>
    </div>
  );
};

export default Pagination;
