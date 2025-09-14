
import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import styles from "../stylesModule/pagination.module.css";


const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageItems = 7, // show max 7 pages in pagination
}) => {
  if (totalPages === 0) return null;

  const pages = [];
  let startPage = Math.max(currentPage - Math.floor(maxPageItems / 2), 1);
  let endPage = startPage + maxPageItems - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageItems + 1, 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    pages.push(
      <button
        key={number}
        className={`${styles.pageItem} ${number === currentPage ? styles.active : ""}`}
        onClick={() => onPageChange(number)}
      >
        {number}
      </button>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
      </button>

      {startPage > 1 && (
        <>
          <button className={styles.pageItem} onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}

      {pages}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.ellipsis}>…</span>}
          <button className={styles.pageItem} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className={styles.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default CustomPagination;
