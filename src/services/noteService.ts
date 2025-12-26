import type {
  FetchNotesParams,
  FetchNotesResponse,
  Note,
  NoteTag,
} from "../types/note";
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
  tag: NoteTag;
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

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
