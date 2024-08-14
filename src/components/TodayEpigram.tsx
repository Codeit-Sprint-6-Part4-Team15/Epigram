'use client';

import React, { useEffect, useState } from 'react';

import instance from '../app/api/axios';
import { Epigram } from '../types/epigrams';
import Loader from './commons/Loader';
import TextCard from './commons/TextCard';

async function getTodayEpigram() {
  let todayEpigramData;
  try {
    let res = await instance.get('epigrams/today');
    if (!res.data) {
      res = await instance.get('epigrams/222');
    }
    todayEpigramData = await res.data;
  } catch (error) {
    console.error('오늘의 에피그램 데이터를 불러오는데 실패했습니다.', error);
  }
  return todayEpigramData;
}

export default function TodayEpigram() {
  const [todayEpigram, setTodayEpigram] = useState<Epigram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayEpigram = async () => {
      const data = await getTodayEpigram();
      setTodayEpigram(data);
      setLoading(false);
    };

    fetchTodayEpigram();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <TextCard
      id={todayEpigram?.id ?? 0}
      content={todayEpigram?.content ?? ''}
      author={todayEpigram?.author ?? ''}
      tags={todayEpigram?.tags ?? []}
    />
  );
}
