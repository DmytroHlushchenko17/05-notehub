import type { FetchNotesParams, FetchNotesResponse, Note } from "../types/note";
import axios from "axios";

const api = axios.create({ baseURL: "https://notehub-public.goit.study/api" });
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface NoteCreate {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    params: { page, perPage, search: search || undefined },
  });
  return response.data;
};

export const createNote = async (value: NoteCreate): Promise<Note> => {
  const response = await api.post<Note>(`/notes`, value);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response = await api.delete<{ id: string }>(`/notes/${id}`);
  return response.data;
};
