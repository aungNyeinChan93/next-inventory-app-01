import Link from "next/link";
import React from "react";

interface Props {
  totalPage: number;
  currentPage: number;
  baseUrl: string;
  searchParams: { [key: string]: string };
}

const Inventorypagination = ({
  totalPage,
  currentPage,
  baseUrl,
  searchParams,
}: Props) => {
  return (
    <React.Fragment>
      <div className="flex space-x-5 justify-center">
        <Link
          href={`${baseUrl}?q=${searchParams?.q}&page=${
            currentPage > 1 ? currentPage - 1 : 1
          }`}
          className={`flex items-center justify-center shrink-0 bg-gray-600 w-9 h-9 rounded-md ${
            currentPage <= 1 && "bg-red-100"
          }`}
          aria-disabled={currentPage <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </Link>
        {totalPage >= 1 &&
          Array.from({ length: totalPage })
            ?.slice(0, 10)
            .map((link, idx) => (
              <Link
                // href={`${baseUrl}?q=${searchParams.q}&page=${idx + 1}`}
                href={`${baseUrl}?${new URLSearchParams({
                  ...searchParams,
                  page: String(idx + 1),
                })}`}
                className={` ${
                  currentPage === idx + 1 && "bg-blue-600"
                } flex items-center justify-center shrink-0 bg-blue-300  border border-gray-200 hover:border-blue-500  cursor-pointer text-base font-medium text-white px-[13px] h-9 rounded-md`}
              >
                {idx + 1}
              </Link>
            ))}

        {currentPage > 10 && (
          <>
            <span>{" ... "}</span>
            <div className="flex text-white items-center justify-center shrink-0 bg-blue-600 border  border-gray-200 hover:border-blue-500 cursor-pointer w-9 h-9 rounded-md">
              {currentPage}
            </div>
          </>
        )}

        <Link
          href={`${baseUrl}?q=${searchParams.q}&page=${
            currentPage < totalPage ? currentPage + 1 : totalPage
          }`}
          className={` ${
            currentPage >= totalPage && "!bg-red-100"
          } flex items-center justify-center shrink-0 bg-gray-600 border  border-gray-200 hover:border-blue-500 cursor-pointer w-9 h-9 rounded-md`}
          aria-disabled={currentPage >= totalPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 fill-gray-400 rotate-180"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </Link>
      </div>
      <div className=" text-center">
        <p className="text-lg text-red-400 font-bold capitalize">{`${currentPage} page  of  ${totalPage} total pages`}</p>
      </div>
    </React.Fragment>
  );
};

export default Inventorypagination;
