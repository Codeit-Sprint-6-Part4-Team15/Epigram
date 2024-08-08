"use client";
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/src/components/EmotionCalender.css';
import Image from 'next/image';
import Dropdown from './commons/Dropdown';
import EmotionSelector, { emotions } from './EmotionSelector';
import { getMonthlyEmotions } from '../app/api/emotionLog';
import { EmotionDataMap } from '../types';

export default function EmotionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [emotionData, setEmotionData] = useState<EmotionDataMap>({});
  const [selectedValue, setSelectedValue] = useState<string>('필터: 없음');

  useEffect(() => {
    const fetchMonthlyEmotions = async () => {
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const data = await getMonthlyEmotions(766, year, month);
        const emotionData: EmotionDataMap = {};
        data.forEach((emotionLog) => {
          const dateKey = new Date(emotionLog.createdAt).toISOString().split('T')[0];
          emotionData[dateKey] = emotionLog.emotion;
        });
        setEmotionData(emotionData);
      } catch (error) {
        console.error("Error fetching monthly emotions:", error);
      }
    };

    fetchMonthlyEmotions();
  }, [selectedDate]);

  const formatDateToLocalString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset).toISOString().split('T')[0];
    return localISOTime;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderTileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    const dateKey = formatDateToLocalString(date);
    return view === 'month' && emotionData[dateKey] ? (
      <div className="emoji">
        <Image src={emotionData[dateKey]} alt="emotion" width={24} height={24} />
      </div>
    ) : null;
  };

  const renderTileClassName: CalendarProps['tileClassName'] = ({ date, view }) => {
    const dateKey = formatDateToLocalString(date);
    let className = '';

    if (view === 'month' && emotionData[dateKey]) {
      className += ' emoji';
    }

    if (view === 'month') {
      if (emotionData[dateKey]) {
        const emotion = emotions.find(e => e.icon === emotionData[dateKey]);
        if (emotion && formatDateToLocalString(selectedDate) === dateKey) {
          className += ` react-calendar__tile--${emotion.className} selected-emotion`;
        } else if (emotion) {
          className += ` react-calendar__tile--${emotion.className}`;
        }
      }
      if (date.toDateString() === new Date().toDateString()) {
        className += ' react-calendar__tile--now';
      }
    }
    return className.trim();
  };

  const formatShortWeekday: CalendarProps['formatShortWeekday'] = (locale, date) => {
    return date.toLocaleDateString(locale ?? 'ko-KR', { weekday: 'short' }).charAt(0);
  };

  const formatDay: CalendarProps['formatDay'] = (locale, date) => {
    return date.getDate().toString();
  };

  const navigationLabel: CalendarProps['navigationLabel'] = ({ date, view, label }) => {
    return view === 'month' ? (
      <div className="flex items-center justify-between w-full">
        <span className="cursor-pointer">{`${date.getFullYear()}년 ${label.split(' ')[1]}`}</span>
        <div className="flex items-center">
          <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </div>
      </div>
    ) : label;
  };

  return (
    <div>
      <EmotionSelector 
        selectedDate={selectedDate} 
        setEmotionData={setEmotionData}
      />
      <Calendar
        onClickDay={handleDateClick}
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
