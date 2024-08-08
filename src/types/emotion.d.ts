
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