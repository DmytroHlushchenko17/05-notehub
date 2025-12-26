import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);

  const { data, isError, isPending, isFetching } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, page],
    queryFn: () => fetchNotes(debouncedSearchQuery, page),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.total_pages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onChangePage={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isPending && <Loader />}
      {isError && <ErrorMessage />}

      {!isPending && !isError && (
        <div style={{ opacity: isFetching ? 0.6 : 1 }}>
          {" "}
          <NoteList notes={notes} />
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSuccess={closeModal} />
        </Modal>
      )}

      <Toaster
        toastOptions={{
          success: { style: { background: "green", color: "white" } },
          error: { style: { background: "red", color: "white" } },
        }}
      />
    </div>
  );
}
