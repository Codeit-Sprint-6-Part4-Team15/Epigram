/* Comments type */
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

export interface CommentsProps {
  comments: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface CommentsResponse {
    totalCount: number;
    nextCursor: number;
    list: Comment[];
}


/* TextCard type */
export interface EpigramTag {
  name: string;
  id: number;
}

export interface Epigram {
  likeCount: number;
  tags: EpigramTag[];
  writerId: number;
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}

export interface TextCardProps {
  content: string;
  author: string;
  tags: EpigramTag[];
  id: number;
}
