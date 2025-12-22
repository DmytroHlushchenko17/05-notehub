import type { Note } from "../types/note";
import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api";

interface NoteResponse {
  results: Note[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchNotes = async (
  query: string,
  page: number = 1
): Promise<{
  results: Note[];
  total_pages: number;
}> => {
  const response = await axios.get<NoteResponse>(`${API_URL}/auth/notes`, {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  });
};

export default function createNote() {}

export default function deleteNote() {}
