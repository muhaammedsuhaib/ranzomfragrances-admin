import React from "react";
import { Icon } from "@iconify/react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
      {/* Showing Text */}
      <span>
        Showing {start} to {end} of {totalItems} entries
      </span>

      {/* Page Numbers */}
      <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
        <li className="page-item">
          <button
            className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon icon="ep:d-arrow-left" />
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li className="page-item" key={i}>
            <button
              className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${
                currentPage === i + 1
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-200 text-secondary-light"
              }`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <Icon icon="ep:d-arrow-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
