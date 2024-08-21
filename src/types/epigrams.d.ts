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

export interface EpigramsResponse {
  list: Epigram[];
  totalCount: number;
  nextCursor?: number;
}

export interface TextCardProps {
  content: string;
  author: string;
  tags: EpigramTag[];
  id: number;
}

export interface epigramsParams {
  id?: number;
  limit?: number;
  cursor?: number;
  keyword?: string;
  writerId?: number;
}

export interface PostEpigramData {
  tags?:string[];
  referenceUrl?: string;
  referenceTitle?: string;
  author?: string;
  content?: string;
}
