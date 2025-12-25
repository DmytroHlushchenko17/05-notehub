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
  page: number = 1,
  perPage: number = 10
): Promise<{
  results: Note[];
  total_pages: number;
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (query) {
    params.append('query', query);
  }

  const response = await axios.get<NoteResponse>(`${API_URL}/auth/notes?${params.toString()}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};

export const createNote = () => {};

export const deleteNote = () => {};
