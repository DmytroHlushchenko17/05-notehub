export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  tag: string;
}

export interface NoteDelete {
  id: string;
}
