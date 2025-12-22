import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox />}
        {<Pagination />}
        {<button className={css.button}>Create note +</button>}
      </header>
      <NoteList />
    </div>
  );
}
