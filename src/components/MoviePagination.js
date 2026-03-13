import React from "react";
import Pagination from "react-js-pagination";
import "./MoviePagination.css";

export default function MoviePagination({ page, totalResult, onPageChange }) {
  if (totalResult <= 20) return null;

  return (
    <div className="paginationLine">
      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalResult}
        pageRangeDisplayed={10}
        onChange={onPageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}
