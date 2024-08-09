'use client';

import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import IMG_EMOTION from '@/public/assets/emotionChart';

import '@/src/components/EmotionCalender.css';

import { getMonthlyEmotions } from '../app/api/emotionLog';
import { EmotionDataMap } from '../types/emotion';
import Dropdown from './commons/Dropdown';
import { emotions } from './commons/TodayEmotionSelector';
import TodayEmotionSelector from './commons/TodayEmotionSelector';

export default function EmotionCalendar() {
  const [selectedDate] = useState<Date>(new Date());
  const [emotionData, setEmotionData] = useState<EmotionDataMap>({});
  const [selectedValue, setSelectedValue] = useState<string>('필터: 없음');

  useEffect(() => {
    const fetchMonthlyEmotions = async () => {
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const userId = 766; // 테스트
        const data = await getMonthlyEmotions(userId, year, month);
        const emotionData: EmotionDataMap = {};
        data.forEach((emotionLog) => {
          const dateKey = new Date(emotionLog.createdAt)
            .toISOString()
            .split('T')[0];
          emotionData[dateKey] = emotionLog.emotion;
        });
        setEmotionData(emotionData);
      } catch (error) {
        console.error('Error fetching monthly emotions:', error);
      }
    };

    fetchMonthlyEmotions();
  }, [selectedDate]);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'HAPPY':
        return IMG_EMOTION.HAPPY;
      case 'MOVED':
        return IMG_EMOTION.MOVED;
      case 'WORRIED':
        return IMG_EMOTION.WORRIED;
      case 'SAD':
        return IMG_EMOTION.SAD;
      case 'ANGRY':
        return IMG_EMOTION.ANGRY;
      default:
        return '';
    }
  };

  const formatDateToLocalString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset)
      .toISOString()
      .split('T')[0];
    return localISOTime;
  };

  const renderTileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    const dateKey = formatDateToLocalString(date);
    const emotion = emotionData[dateKey];
    const emotionIcon = getEmotionIcon(emotion);
    return view === 'month' && emotionData[dateKey] ? (
      <div className="emoji">
        <img src={emotionIcon} alt={emotion} width={24} height={24} />
      </div>
    ) : null;
  };

  const renderTileClassName: CalendarProps['tileClassName'] = ({
    date,
    view,
  }) => {
    const dateKey = formatDateToLocalString(date);
    let className = '';

    if (view === 'month' && emotionData[dateKey]) {
      className += ' emoji';
    }

    if (view === 'month') {
      if (emotionData[dateKey]) {
        const emotion = emotions.find((e) => e.icon === emotionData[dateKey]);
        if (emotion) {
          className += ` react-calendar__tile--${emotion.className}`;
        }
      }
      if (date.toDateString() === new Date().toDateString()) {
        className += ' react-calendar__tile--now';
      }
    }
    return `${className.trim()} cursor-default no-hover`;
  };

  const formatShortWeekday: CalendarProps['formatShortWeekday'] = (
    locale,
    date,
  ) => {
    return date
      .toLocaleDateString(locale ?? 'ko-KR', { weekday: 'short' })
      .charAt(0);
  };

  const formatDay: CalendarProps['formatDay'] = (locale, date) => {
    return date.getDate().toString();
  };

  const navigationLabel: CalendarProps['navigationLabel'] = ({
    date,
    view,
    label,
  }) => {
    return view === 'month' ? (
      <div className="flex w-full items-center justify-between">
        <span className="cursor-pointer">{`${date.getFullYear()}년 ${label.split(' ')[1]}`}</span>
        <div className="flex items-center">
          <Dropdown
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </div>
    ) : (
      label
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <TodayEmotionSelector userId={766} />
      <Calendar
        tileContent={renderTileContent}
        tileClassName={renderTileClassName}
        className="rounded-lg shadow-lg"
        locale="ko-KR"
        calendarType="gregory"
        formatShortWeekday={formatShortWeekday}
        formatDay={formatDay}
        navigationLabel={navigationLabel}
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
}
