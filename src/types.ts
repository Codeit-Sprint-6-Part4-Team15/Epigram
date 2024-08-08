import { StaticImageData } from "next/image";

export interface Writer {
    image: string | null;
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
    id: number,
    userId: number,
    emotion: string,
    createdAt: Date,
}

export type EmotionDataMap = Record<string, string>;

export interface EmotionLog {
  createdAt: string;
  emotion: string;
  userId: number;
  id: number;
}

export interface Emotion {
  emoji: string;
  icon: string;
  postName?: string;
  name?: string;
  className?: string;
}

export interface EmotionSelectorProps {
  selectedDate: Date;
  setEmotionData: (data: EmotionDataMap) => void;
}