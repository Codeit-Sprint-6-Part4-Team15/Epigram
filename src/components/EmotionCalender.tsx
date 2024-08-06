"use client";

import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/src/components/EmotionCalender.css';
import Image from 'next/image';
import Dropdown from './commons/Dropdown';

const emotions = [
  { name: '감동', emoji: '/assets/emoji-heart.svg', icon: '/assets/ic-love.svg', className: 'emotion-love' },
  { name: '기쁨', emoji: '/assets/emoji-smile.svg', icon: '/assets/ic-happy.svg', className: 'emotion-happy' },
  { name: '고민', emoji: '/assets/emoji-worry.svg', icon: '/assets/ic-worry.svg', className: 'emotion-worry' },
  { name: '슬픔', emoji: '/assets/emoji-sad.svg', icon: '/assets/ic-sad.svg', className: 'emotion-sad' },
  { name: '분노', emoji: '/assets/emoji-mad.svg', icon: '/assets/ic-mad.svg', className: 'emotion-angry' },
];

interface Emotion {
  emoji: string;
  icon: string;
}

export default function EmotionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [emotionData, setEmotionData] = useState<Record<string, string>>({});
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('필터: 없음');

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = date.toISOString().split('T')[0];
    const icon = emotionData[dateKey];
    const emoji = emotions.find(e => e.icon === icon)?.emoji || null;
    setSelectedEmotion(icon ? { emoji: emoji ?? '', icon } : null);
  };

  const handleEmotionClick = (emoji: string, icon: string, className: string) => {
    setSelectedEmotion({ emoji, icon });
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      setEmotionData({
        ...emotionData,
        [dateKey]: icon,
      });
    }
  };

  const renderTileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    return view === 'month' && emotionData[dateKey] ? (
      <div className="emoji">
        <Image src={emotionData[dateKey]} alt="emotion" width={24} height={24} />
      </div>
    ) : null;
  };

  const renderTileClassName: CalendarProps['tileClassName'] = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    let className = '';
  
  if (view === 'month') {
    if (emotionData[dateKey]) {
      const emotion = emotions.find(e => e.icon === emotionData[dateKey]);
      if (emotion && selectedDate.toISOString().split('T')[0] === dateKey) {
        className += `react-calendar__tile--${emotion.className} selected-emotion`;
      } else if (emotion) {
        className += `react-calendar__tile--${emotion.className}`;
      }
      className += ' emoji';
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
      <div className="flex items-center">
        <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
        <span>{`${date.getFullYear()}년 ${label.split(' ')[1]}`}</span>
      </div>
    ) : label;
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl mb-2">오늘의 감정 ({selectedDate.toDateString()})</h2>
        <div className="flex space-x-4 typo-md-semibold">
          {emotions.map((emotion) => (
            <div className='flex flex-col items-center'>
            <div
              key={emotion.name}
              className={`cursor-pointer flex flex-col items-center ${selectedEmotion?.emoji === emotion.emoji ? `${emotion.className}-selected` : ''}`}
              onClick={() => handleEmotionClick(emotion.emoji, emotion.icon, emotion.className)}
              >
                <div className="emoji-container">
              <Image src={emotion.emoji} alt={emotion.name} width={56} height={56} className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px]" />
              </div>
            </div>
              <div>{emotion.name}</div>
              </div>
          ))}
        </div>
      </div>
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
