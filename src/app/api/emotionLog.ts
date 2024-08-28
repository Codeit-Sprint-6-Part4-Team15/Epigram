import { EmotionLog } from '@/src/types/emotion';
import axios from 'axios';

import instance from './axios';

export const setToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const postTodayEmotion = async (
  postName: string,
): Promise<EmotionLog> => {
  try {
    const response = await instance.post<EmotionLog>('/emotionLogs/today', {
      emotion: postName,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error posting today's emotion:",
        error.response ? error.response.data : error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const getTodayEmotion = async (
  userId: number,
): Promise<EmotionLog | null> => {
  try {
    const response = await instance.get<EmotionLog>(`/emotionLogs/today`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user's emotions:", error);
    throw error;
  }
};

export const getMonthlyEmotions = async (
  userId: number,
  year: number,
  month: number,
): Promise<EmotionLog[]> => {
  try {
    const response = await instance.get<EmotionLog[]>(`/emotionLogs/monthly`, {
      params: { userId, year, month },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching monthly emotions:',
        error.response ? error.response.data : error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
