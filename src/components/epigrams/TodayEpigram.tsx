'use client';

import React, { useEffect, useState } from 'react';

import instance from '../../app/api/axios';
import { Epigram } from '../../types/epigrams';
import Loader from '../commons/Loader';
import LoadingError from '../commons/LoadingError';
import TextCard from '../commons/TextCard';

export default function TodayEpigram() {
  const [todayEpigram, setTodayEpigram] = useState<Epigram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const getTodayEpigram = async () => {
    let todayEpigramData;
    setIsLoading(true);
    try {
      let res = await instance.get('epigrams/today');
      if (!res.data) {
        res = await instance.get('epigrams/222');
      }
      todayEpigramData = await res.data;
    } catch (error) {
      console.error('오늘의 에피그램 데이터를 불러오는데 실패했습니다.', error);
      setLoadingError(error as Error);
    } finally {
      setIsLoading(false);
    }
    return todayEpigramData;
  };

  useEffect(() => {
    const fetchTodayEpigram = async () => {
      const data = await getTodayEpigram();
      setTodayEpigram(data);
    };

    fetchTodayEpigram();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (loadingError) {
    return <LoadingError>{loadingError?.message}</LoadingError>;
  }

  return (
    <>
      <TextCard
        id={todayEpigram?.id ?? 0}
        content={todayEpigram?.content ?? ''}
        author={todayEpigram?.author ?? ''}
        tags={todayEpigram?.tags ?? []}
      />
    </>
  );
}
