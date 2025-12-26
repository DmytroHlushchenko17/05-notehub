import type { Note } from "../types/note";
import axios from "axios";

export const API_URL = "https://notehub-public.goit.study/api";

export type NoteCreate = "title" | "content" | "tag";

export interface NoteDelete {
  id: string;
}

interface NoteResponse {
  notes: Note[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchNotes = async (
  query: string,
  page: number = 1,
  perPage: number = 5
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

  const totalPages =
    response.data.total_pages ??
    (response.data.total_results
      ? Math.max(1, Math.ceil(response.data.total_results / perPage))
      : 0);

  console.debug("fetchNotes response:", {
    notes: response.data.notes.length,
    total_pages: response.data.total_pages,
    total_results: response.data.total_results,
    calculated_total_pages: totalPages,
    page,
    perPage,
  });

  return {
    notes: response.data.notes,
    total_pages: totalPages,
  };
};

export const createNote = async (note: NoteCreate): Promise<NoteCreate> => {
  const response = await axios.post<NoteCreate>(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<NoteDelete> => {
  const response = await axios.delete<NoteDelete>(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
  return response.data;
};
