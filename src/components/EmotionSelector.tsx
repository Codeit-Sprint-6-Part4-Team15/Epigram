import { useState } from 'react';
import Image from 'next/image';
import { IMG_EMOTION, BG_GRAY_EMOTION } from '@/public/assets/emotionChart';

export const emotions = [
  { name: '감동', emoji: BG_GRAY_EMOTION.MOVED, icon: IMG_EMOTION.MOVED, className: 'emotion-love' },
  { name: '기쁨', emoji: BG_GRAY_EMOTION.HAPPY, icon: IMG_EMOTION.HAPPY, className: 'emotion-happy' },
  { name: '고민', emoji: BG_GRAY_EMOTION.WORRIED, icon: IMG_EMOTION.WORRIED, className: 'emotion-worry' },
  { name: '슬픔', emoji: BG_GRAY_EMOTION.SAD, icon: IMG_EMOTION.SAD, className: 'emotion-sad' },
  { name: '분노', emoji: BG_GRAY_EMOTION.ANGRY, icon: IMG_EMOTION.ANGRY, className: 'emotion-angry' },
];

interface Emotion {
  emoji: string;
  icon: string;
}

interface EmotionSelectorProps {
  selectedDate: Date;
  selectedEmotion: Emotion | null;
  setSelectedEmotion: (emotion: Emotion | null) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedDate, selectedEmotion, setSelectedEmotion }) => {
  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="typo-2xl-semibold">오늘의 감정</div>
        <div className="typo-xl-regular text-blue-400">{formatDateToString(selectedDate)}</div>
      </div>
      <div className="flex space-x-4 typo-md-semibold items-center">
        {emotions.map((emotion) => (
          <div key={emotion.name} className="flex flex-col items-center">
            <div
              className={`cursor-pointer flex flex-col items-center ${selectedEmotion?.emoji === emotion.emoji ? `${emotion.className}-selected` : ''}`}
              onClick={() => setSelectedEmotion({ emoji: emotion.emoji, icon: emotion.icon })}
            >
              <div className="emoji-container">
                <Image src={emotion.emoji} alt={emotion.name} width={56} height={56} className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px]" />
              </div>
            </div>
            <div className={`typo-xs-regular ${selectedEmotion?.emoji === emotion.emoji ? 'text-black' : 'text-blue-400'}`}>{emotion.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;
