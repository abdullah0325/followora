"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GradientWrapper from "./Gradient";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  // show max 5 page numbers
  const getPages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      
      {/* PREV */}
      <GradientWrapper>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft />
        </button>
      </GradientWrapper>

      {/* PAGE NUMBERS */}
      {getPages().map((page) => (
        <GradientWrapper key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-white font-semibold ${
              page === currentPage
                ? "bg-black/20"
                : "hover:bg-black/10"
            }`}
          >
            {page}
          </button>
        </GradientWrapper>
      ))}

      {/* NEXT */}
      <GradientWrapper>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronRight />
        </button>
      </GradientWrapper>

    </div>
  );
}
