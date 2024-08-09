"use client";
import { useEffect, useState } from 'react';
import { IMG_EMOTION, BG_GRAY_EMOTION, UNCLICKED_EMOTION } from '@/public/assets/emotionChart';
import { postTodayEmotion, getTodayEmotion } from '../../app/api/emotionLog';
import { Emotion } from '../../types/emotion';
import '@/src/components/EmotionCalender.css';

// const userId = 766; // 테스트
interface EmotionSelectorProps {
  userId: number;
  title?: string;
  showDate?: boolean;
}

export const emotions: Emotion[] = [
  { name: '감동', postName: 'MOVED', emoji: BG_GRAY_EMOTION.MOVED, icon: IMG_EMOTION.MOVED, unclickedIcon: UNCLICKED_EMOTION.MOVED, className: 'emotion-love' },
  { name: '기쁨', postName: 'HAPPY', emoji: BG_GRAY_EMOTION.HAPPY, icon: IMG_EMOTION.HAPPY, unclickedIcon: UNCLICKED_EMOTION.HAPPY, className: 'emotion-happy' },
  { name: '고민', postName: 'WORRIED', emoji: BG_GRAY_EMOTION.WORRIED, icon: IMG_EMOTION.WORRIED, unclickedIcon: UNCLICKED_EMOTION.WORRIED, className: 'emotion-worry' },
  { name: '슬픔', postName: 'SAD', emoji: BG_GRAY_EMOTION.SAD, icon: IMG_EMOTION.SAD, unclickedIcon: UNCLICKED_EMOTION.SAD, className: 'emotion-sad' },
  { name: '분노', postName: 'ANGRY', emoji: BG_GRAY_EMOTION.ANGRY, icon: IMG_EMOTION.ANGRY, unclickedIcon: UNCLICKED_EMOTION.ANGRY, className: 'emotion-angry' },];

export default function TodayEmotionSelector({ userId, title = "오늘의 감정", showDate = true }:EmotionSelectorProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionPosted, setIsEmotionPosted] = useState<boolean>(false);

  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getTodayDateInLocal = (): Date => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset);
  };

  const today = getTodayDateInLocal();

  useEffect(() => {
    const fetchTodayEmotion = async () => {
      try {
        const todayEmotion = await getTodayEmotion(userId);
        if (todayEmotion) {
          const emotion = emotions.find(e => e.postName === todayEmotion.emotion);
          if (emotion) {
            setSelectedEmotion(emotion);
            setIsEmotionPosted(true);
          }
        }
      } catch (error) {
        console.error("Error fetching today's emotion:", error);
      }
    };

    fetchTodayEmotion();
  }, []);

  const handleEmotionClick = async (emotion: Emotion) => {
    if (isEmotionPosted) return;

    setSelectedEmotion(emotion);
    try {
      await postTodayEmotion(emotion.postName ?? 'defaultPostName');
      console.log("Posted today's emotion:", emotion.postName);
      setIsEmotionPosted(true);
    } catch (error) {
      console.error("Error posting today's emotion:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="xl:mb-[40px] mb-[24px] flex justify-between items-center w-full xl:max-w-[640px] md:max-w-[384px] max-w-[312px]">
        <div className="typo-lg-semibold xl:typo-2xl-semibold">{title}</div>
        {showDate && (
          <div className="typo-lg-regular xl:typo-xl-semibold text-blue-400">
            {formatDateToString(today)}
          </div>
        )}
      </div>
      <div className="flex space-x-[8px] md:space-x-[16px] items-center">
        {emotions.map((emotion) => (
          <div key={emotion.name} className="flex flex-col items-center">
            <div
              className={`cursor-pointer flex flex-col items-center ${selectedEmotion?.emoji === emotion.emoji ? `${emotion.className}-selected` : ''}`}
              onClick={() => handleEmotionClick(emotion)}
            >
              <div className="emoji-container">
                <img src={isEmotionPosted && selectedEmotion?.postName !== emotion.postName ? emotion.unclickedIcon : emotion.emoji} alt={emotion.name ?? 'Emotion'} width={56} height={56} className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] xl:w-[96px] xl:h-[96px] rounded-[16px]" />
              </div>
            </div>
            <div className={`typo-xs-semibold md:typo-lg-semibold xl:typo-xl-semibold ${selectedEmotion?.emoji === emotion.emoji ? 'text-illust-sub-blue_1' : 'text-blue-400'}`}>{emotion.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
