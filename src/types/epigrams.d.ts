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

export interface EpigramsResponse {
  totalCount: number,
  nextCursor: number,
  list: Epigram[];
}