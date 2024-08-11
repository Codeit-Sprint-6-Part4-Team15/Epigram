'use client';

import { useEffect, useState } from 'react';

import IMG_EMOTION from '@/public/assets/emotionChart';
import {
  BG_GRAY_EMOTION,
  UNCLICKED_EMOTION,
} from '@/public/assets/emotionChart/emotion';

import '@/src/components/EmotionCalender.css';

import { getTodayEmotion, postTodayEmotion } from '../../app/api/emotionLog';
import { Emotion } from '../../types/emotion';

// const userId = 766; // 테스트
interface EmotionSelectorProps {
  userId: number;
}

export const emotions: Emotion[] = [
  {
    name: '감동',
    postName: 'MOVED',
    emoji: BG_GRAY_EMOTION.MOVED,
    icon: IMG_EMOTION.MOVED,
    unclickedIcon: UNCLICKED_EMOTION.MOVED,
    className: 'emotion-love',
  },
  {
    name: '기쁨',
    postName: 'HAPPY',
    emoji: BG_GRAY_EMOTION.HAPPY,
    icon: IMG_EMOTION.HAPPY,
    unclickedIcon: UNCLICKED_EMOTION.HAPPY,
    className: 'emotion-happy',
  },
  {
    name: '고민',
    postName: 'WORRIED',
    emoji: BG_GRAY_EMOTION.WORRIED,
    icon: IMG_EMOTION.WORRIED,
    unclickedIcon: UNCLICKED_EMOTION.WORRIED,
    className: 'emotion-worry',
  },
  {
    name: '슬픔',
    postName: 'SAD',
    emoji: BG_GRAY_EMOTION.SAD,
    icon: IMG_EMOTION.SAD,
    unclickedIcon: UNCLICKED_EMOTION.SAD,
    className: 'emotion-sad',
  },
  {
    name: '분노',
    postName: 'ANGRY',
    emoji: BG_GRAY_EMOTION.ANGRY,
    icon: IMG_EMOTION.ANGRY,
    unclickedIcon: UNCLICKED_EMOTION.ANGRY,
    className: 'emotion-angry',
  },
];

export default function TodayEmotionSelector({ userId }: EmotionSelectorProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionPosted, setIsEmotionPosted] = useState<boolean>(false);

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
          const emotion = emotions.find(
            (e) => e.postName === todayEmotion.emotion,
          );
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
    <div className="flex items-center space-x-[8px] md:space-x-[16px]">
      {emotions.map((emotion) => (
        <div key={emotion.name} className="flex flex-col items-center">
          <div
            className={`flex cursor-pointer flex-col items-center ${selectedEmotion?.emoji === emotion.emoji ? `${emotion.className}-selected` : ''}`}
            onClick={() => handleEmotionClick(emotion)}
          >
            <div className="emoji-container">
              <img
                src={
                  isEmotionPosted &&
                  selectedEmotion?.postName !== emotion.postName
                    ? emotion.unclickedIcon
                    : emotion.emoji
                }
                alt={emotion.name ?? 'Emotion'}
                width={56}
                height={56}
                className="h-[56px] w-[56px] rounded-[16px] md:h-[64px] md:w-[64px] xl:h-[96px] xl:w-[96px]"
              />
            </div>
          </div>
          <div
            className={`typo-xs-semibold md:typo-lg-semibold xl:typo-xl-semibold ${selectedEmotion?.emoji === emotion.emoji ? 'text-illust-sub-blue_1' : 'text-blue-400'}`}
          >
            {emotion.name}
          </div>
        </div>
      ))}
    </div>
  );
}
