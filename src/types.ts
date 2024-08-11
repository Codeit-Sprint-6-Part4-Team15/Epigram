import { StaticImageData } from 'next/image';

export interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export interface CommentType {
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
  list: CommentType[];
}

export interface EmotionData {
  emotion: string;
  rate: number;
  image: StaticImageData;
  label: string;
  color: string;
}

export interface EmotionChartData extends EmotionData {
  deg: number;
}

export interface MonthlyEmotionResponse {
  id: number;
  userId: number;
  emotion: string;
  createdAt: Date;
}
