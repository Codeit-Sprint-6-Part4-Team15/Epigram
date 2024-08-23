'use client';

import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import IMG_EMOTION from '@/public/assets/emotionChart';
import ArrowLeft from '@/public/assets/ic-arrow-left.svg';
import ArrowRight from '@/public/assets/ic-arrow-right.svg';
import Image from 'next/image';

import '@/src/components/myPage/EmotionCalender.css';

import { getMonthlyEmotions } from '../../app/api/emotionLog';
import { EmotionDataMap } from '../../types/emotion';
import Dropdown from '../commons/Dropdown';
import { emotions } from '../commons/TodayEmotionSelector';

interface EmotionCalenderProps {
  userId: number;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function EmotionCalendar({
  userId,
  selectedDate,
  onDateChange,
}: EmotionCalenderProps) {
  const [emotionData, setEmotionData] = useState<EmotionDataMap>({});
  const [selectedValue, setSelectedValue] = useState<string>('필터: 없음');

  const emotionNameToPostNameMap = emotions.reduce(
    (map, emotion) => {
      if (emotion.name && emotion.postName) {
        map[emotion.name] = emotion.postName;
      }
      return map;
    },
    {} as { [key: string]: string },
  );

  useEffect(() => {
    const fetchMonthlyEmotions = async () => {
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
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

    if (
      selectedValue !== '필터: 없음' &&
      emotion !== emotionNameToPostNameMap[selectedValue]
    ) {
      return null;
    }

    const emotionIcon = getEmotionIcon(emotion);
    return view === 'month' && emotionData[dateKey] ? (
      <div className="emoji">
        <Image
          src={emotionIcon.src}
          alt={emotion}
          width={24}
          height={24}
          className="h-[24px] w-[24px] xl:mt-[8px] xl:h-[36px] xl:w-[36px]"
        />
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
      const emotion = emotions.find((e) => e.postName === emotionData[dateKey]);
      if (
        emotion &&
        (selectedValue === '필터: 없음' ||
          emotion.postName === emotionNameToPostNameMap[selectedValue])
      ) {
        className += ` emoji react-calendar__tile--${emotion.className}`;
      } else {
        className += ' react-calendar__tile--no-emotion';
      }
    } else {
      className += ' react-calendar__tile--no-emotion';
    }

    if (date.toDateString() === new Date().toDateString()) {
      className += ' react-calendar__tile--now';
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

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const isCurrentMonth =
    currentMonth === selectedDate.getMonth() + 1 &&
    currentYear === selectedDate.getFullYear();

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <span className="typo-lg-semibold text-black-600 xl:typo-2xl-semibold">
          {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`}
        </span>
        <div className="flex items-center space-x-2">
          <Dropdown
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <button
            onClick={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)),
              )
            }
          >
            <Image
              src={ArrowLeft}
              alt=""
              width={20}
              height={20}
              className="mr-[4px] h-[20px] w-[20px] xl:mr-[6px] xl:h-[24px] xl:w-[24px]"
            />
          </button>
          <button
            onClick={handleTodayClick}
            className={`typo-md-semibold text-black-600 transition-opacity duration-200 xl:typo-2lg-semibold ${
              isCurrentMonth ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            {currentMonth}월
          </button>
          <button
            onClick={() =>
              onDateChange(
                new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)),
              )
            }
          >
            <Image
              src={ArrowRight}
              alt=""
              width={20}
              height={20}
              className="ml-[4px] h-[20px] w-[20px] xl:ml-[6px] xl:h-[24px] xl:w-[24px]"
            />
          </button>
        </div>
      </div>
      <Calendar
        value={selectedDate}
        onClickMonth={(date) => onDateChange(date)}
        tileContent={renderTileContent}
        tileClassName={renderTileClassName}
        locale="ko-KR"
        calendarType="gregory"
        formatShortWeekday={formatShortWeekday}
        formatDay={formatDay}
        next2Label={null}
        prev2Label={null}
        showNavigation={false}
      />
    </div>
  );
}
