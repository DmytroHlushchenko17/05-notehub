import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { deleteNote, fetchNotes, createNote } from "../../services/noteService";


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, page],
    queryFn: () => fetchNotes(debouncedSearchQuery, page),
  });

  const notes = data?.notes ?? [];  
  const totalPages = data?.total_pages ?? 0;

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
    onError: () => {
        toast.error('Failed to create note');
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
        toast.error('Failed to delete note');
    }
  });


  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateNote = (note: {
    title: string;
    content: string;
    tag: string;
  }) => {
    createNoteMutation.mutate(note);
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {(isLoading || createNoteMutation.isPending || deleteNoteMutation.isPending) && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && notes?.length > 0 && (
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSubmit={handleCreateNote} />
        </Modal>
      )}
      <Toaster toastOptions={{
        success: {
          style: {
            background: 'green',
          },
        },
        error: {
          style: {
            background: 'red',
          },
        },
      }}/>
    </div>
  );
}
