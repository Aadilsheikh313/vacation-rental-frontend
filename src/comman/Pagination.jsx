import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ currentPage, totalPages, onPageChange, maxPageItems = 5 }) => {
  const pages = [];

  // Dynamic page range calculation
  let startPage = Math.max(currentPage - Math.floor(maxPageItems / 2), 1);
  let endPage = startPage + maxPageItems - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageItems + 1, 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

      {startPage > 1 && <Pagination.Ellipsis disabled />}
      {pages}
      {endPage < totalPages && <Pagination.Ellipsis disabled />}

      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default CustomPagination;
