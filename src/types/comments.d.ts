export interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export interface Comment {
  epigramId: number;
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
}

export interface CommentsResponse {
  totalCount: number;
  nextCursor: number;
  list: Comment[];
}