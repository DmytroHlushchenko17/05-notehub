import type { Note } from "../types/note";
import axios from "axios";

const API_URL = "https://notehub-public.goit.study/api";

interface NoteResponse {
  notes: Note[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchNotes = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<{
  notes: Note[];
  total_pages: number;
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (query) {
    params.append("search", query);
  }

  const response = await axios.get<NoteResponse>(
    `${API_URL}/notes?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return {
    notes: response.data.notes,
    total_pages: response.data.total_pages,
  };
};

export const createNote = async (note: object): Promise<Note> => {
  const response = await axios.post<Note>(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
};
