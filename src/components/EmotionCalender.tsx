import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '@/src/components/EmotionCalender.css';

const emotions = [
  { name: '감동', emoji: '🥰', className: 'emotion-love' },
  { name: '기쁨', emoji: '😊', className: 'emotion-happy' },
  { name: '고민', emoji: '😕', className: 'emotion-worry' },
  { name: '슬픔', emoji: '😢', className: 'emotion-sad' },
  { name: '분노', emoji: '😡', className: 'emotion-angry' },
];

export default function EmotionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [emotionData, setEmotionData] = useState<Record<string, string>>({});
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = date.toISOString().split('T')[0];
    setSelectedEmotion(emotionData[dateKey] || null);
  };

  const handleEmotionClick = (emoji: string, className: string) => {
    setSelectedEmotion(emoji);
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      setEmotionData({
        ...emotionData,
        [dateKey]: emoji,
      });
    }
  };

  const renderTileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    return view === 'month' && emotionData[dateKey] ? (
      <div className="emoji">{emotionData[dateKey]}</div>
    ) : null;
  };

  const renderTileClassName: CalendarProps['tileClassName'] = ({
    date,
    view,
  }) => {
    const dateKey = date.toISOString().split('T')[0];
    if (view === 'month') {
      if (emotionData[dateKey]) {
        const emotion = emotions.find((e) => e.emoji === emotionData[dateKey]);
        if (emotion && selectedDate.toISOString().split('T')[0] === dateKey) {
          return `react-calendar__tile--${emotion.className} selected-emotion`;
        }
        return emotion ? `react-calendar__tile--${emotion.className}` : '';
      }
      if (date.toDateString() === new Date().toDateString()) {
        return 'react-calendar__tile--today';
      }
    }
    return '';
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
    return view === 'month'
      ? `${date.getFullYear()}년 ${label.split(' ')[1]}`
      : label;
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-2 text-xl">
          오늘의 감정 ({selectedDate.toDateString()})
        </h2>
        <div className="flex space-x-4">
          {emotions.map((emotion) => (
            <div
              key={emotion.name}
              className={`flex cursor-pointer flex-col items-center ${selectedEmotion === emotion.emoji ? `${emotion.className}-selected` : ''}`}
              onClick={() =>
                handleEmotionClick(emotion.emoji, emotion.className)
              }
            >
              <div className="text-2xl">{emotion.emoji}</div>
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
