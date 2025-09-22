import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) {
  function getPages() {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
      <div className="text-gray-700">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} users |
        <span className="ml-2">Per page:
          <select value={itemsPerPage} onChange={e => onItemsPerPageChange(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1">
            {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
          className="p-2 border rounded bg-white hover:bg-blue-50 disabled:opacity-50">
          <FaChevronLeft />
        </button>
        {getPages().map(p =>
          <button key={p} onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded border ${p === currentPage ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`}>
            {p}
          </button>
        )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
          className="p-2 border rounded bg-white hover:bg-blue-50 disabled:opacity-50">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
export default Pagination;
