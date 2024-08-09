import { StaticImageData } from "next/image";

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
  unclickedIcon?: string;
  className?: string;
  borderColor?: string;
}