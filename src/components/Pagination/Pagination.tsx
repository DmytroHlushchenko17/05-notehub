import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onChangePage,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageClassName={css.page}
      previousClassName={css.page}
      nextClassName={css.page}
      breakClassName={css.page}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChangePage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
