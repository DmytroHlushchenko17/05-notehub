import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import type { Note } from "../../types/note";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  // Temporary dummy data for verification
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "First Note",
      content: "This is a test note",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tag: "test",
    },
  ]);
  const [totalPages] = useState<number>(2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox />}
        {totalPages > 1 && <Pagination />}
        {<button className={css.button} onClick={openModal}>Create note +</button>}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
