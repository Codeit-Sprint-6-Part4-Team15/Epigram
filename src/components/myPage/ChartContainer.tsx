'use client';

import { useEffect, useState } from 'react';

import IMG_EMOTION from '@/public/assets/emotionChart';
import { EmotionData } from '@/src/types/emotion';
import useSWR from 'swr';

import instance from '@/src/app/api/axios';

import DonutChart from '@/src/components/myPage/DonutChart';

import Loader from '../commons/Loader';
import LoadingError from '../commons/LoadingError';

interface ChartContainerProps {
  userId: number;
  year: number;
  month: number;
  key: number;
}

type Item = {
  emotion: string;
};

type EmotionCounts = {
  [key: string]: number;
};

const emotionInfo: EmotionData[] = [
  {
    emotion: 'HAPPY',
    rate: 0,
    image: IMG_EMOTION.HAPPY,
    label: '기쁨',
    color: '#E46E80',
  },
  {
    emotion: 'MOVED',
    rate: 0,
    image: IMG_EMOTION.MOVED,
    label: '감동',
    color: '#FBC85B',
  },
  {
    emotion: 'WORRIED',
    rate: 0,
    image: IMG_EMOTION.WORRIED,
    label: '고민',
    color: '#48BB98',
  },
  {
    emotion: 'SAD',
    rate: 0,
    image: IMG_EMOTION.SAD,
    label: '슬픔',
    color: '#5195EE',
  },
  {
    emotion: 'ANGRY',
    rate: 0,
    image: IMG_EMOTION.ANGRY,
    label: '분노',
    color: '#8E80E3',
  },
];

async function getMonthlyData(
  id: number,
  year: number,
  month: number,
): Promise<EmotionData[]> {
  let monthlyData: Item[] = [];
  let emotionCounts: EmotionCounts = {};

  try {
    const res = await instance.get('emotionLogs/monthly', {
      params: {
        userId: id,
        year: year,
        month: month,
      },
    });
    monthlyData = res.data || [];
  } catch (error) {
    console.error('사용자의 월 감정 데이터를 불러오는데 실패했습니다.');
    return emotionInfo;
  }

  if (monthlyData.length > 0) {
    emotionCounts = monthlyData.reduce((acc: EmotionCounts, item: Item) => {
      acc[item.emotion] = (acc[item.emotion] || 0) + 1;
      return acc;
    }, {});
    const totalRecords = monthlyData.length;

    // 비율 계산
    const updatedEmotionInfo = emotionInfo.map((info) => {
      const count = emotionCounts[info.emotion] || 0;
      const rate = totalRecords > 0 ? Number((count / totalRecords) * 100) : 0;
      return { ...info, rate };
    });

    return updatedEmotionInfo;
  }

  return emotionInfo; // Return default data if no monthlyData
}

export default function ChartContainer({
  userId,
  year,
  month,
  key,
}: ChartContainerProps) {
  const { data, error, isValidating } = useSWR(
    ['emotionLogs/monthly', userId, year, month],
    () => getMonthlyData(userId, year, month),
  );

  if (isValidating) return <Loader />;
  if (error) return <LoadingError>{error?.message}</LoadingError>;

  return (
    <div>
      <DonutChart data={data} />
    </div>
  );
}
