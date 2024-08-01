import Image from "next/image";
import { useState } from "react";
import IcoHappy from "@/public/assets/emoji-smile.svg";
import IcoMoved from "@/public/assets/emoji-heart.svg";
import IcoWorried from "@/public/assets/emoji-worry.svg";
import IcoSad from "@/public/assets/emoji-sad.svg";
import IcoAngry from "@/public/assets/emoji-mad.svg";

interface EmotionRates {
  HAPPY: number;
  MOVED: number;
  WORRIED: number;
  SAD: number;
  ANGRY: number;
}
interface DonutChartProps {
  rateObj: EmotionRates;
  bestEmotion: string;
}

function getSortedObj(obj: Object) {
  return Object.fromEntries(Object.entries(obj).sort(([, a], [, b]) => b - a));
}

function getGraphRateArr(obj: EmotionRates) {
  const sortedObj = getSortedObj(obj);
  const newArr = Object.values(sortedObj).map((x, index, arr) => {
    let result = 0;

    for (let i = 0; i <= index; i++) {
      result += arr[i];
    }
    return (result * 360) / 100;
  });
  return newArr;
}

const STROKE_WIDTH = 4;
const FACE_WIDTH = 1;
const OUTLINE_WIDTH = 1.5;
const SPACE_LENGTH = (OUTLINE_WIDTH * 2 * 360) / 100 / Math.PI;

export default function DonutChart({ rateObj, bestEmotion }: DonutChartProps) {
  const [rates, setRates] = useState(getGraphRateArr(rateObj));

  const getCoordFromDegrees = (angle: number, radius: number, svgSize: number) => {
    const x = Math.cos((angle * Math.PI) / 180);
    const y = Math.sin((angle * Math.PI) / 180);
    const coordX = x * radius + svgSize / 2;
    const coordY = y * -radius + svgSize / 2;
    return `${coordX} ${coordY}`;
  };

  const getEmojiImg = (emoji: string) => {
    switch (emoji) {
      case "HAPPY":
        return IcoHappy;
      case "MOVED":
        return IcoMoved;
      case "WORRIED":
        return IcoWorried;
      case "SAD":
        return IcoSad;
      case "ANGRY":
        return IcoAngry;
      default:
        return IcoHappy;
    }
  };
  const getEmojiTxt = (emoji: string) => {
    switch (emoji) {
      case "HAPPY":
        return "기쁨";
      case "MOVED":
        return "감동";
      case "WORRIED":
        return "걱정";
      case "SAD":
        return "슬픔";
      case "ANGRY":
        return "분노";
      default:
        return "기쁨";
    }
  };

  return (
    <div className="flex items-center gap-[48px] md:gap-[76px] xl:gap-[120px]">
      <div className="relative h-[120px] w-[120px] xl:h-[180px] xl:w-[180px]">
        <svg className="w-full" viewBox="0 0 100 100" transform="rotate(-90) scale(1 -1)">
          {rates[0] && (
            <path
              fill="#48BB98"
              stroke="#48BB98"
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={`M ${getCoordFromDegrees(SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            A ${50 - STROKE_WIDTH / 2} ${50 - STROKE_WIDTH / 2} 0 0 0 ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
          L ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}`}
            />
          )}
          {rates[1] && (
            <path
              fill="#FBC85B"
              stroke="#FBC85B"
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={`M ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            L ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}
            A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}`}
            />
          )}
          {rates[2] && (
            <path
              fill="#C7D1E0"
              stroke="#C7D1E0"
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={`M ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            L ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}
            A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}`}
            />
          )}
          {rates[3] && (
            <path
              fill="#E3E9F1"
              stroke="#E3E9F1"
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={`M ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            L ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}
            A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}`}
            />
          )}
          {rates[4] && (
            <path
              fill="#EFF3F8"
              stroke="#EFF3F8"
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={`M ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - STROKE_WIDTH / 2, 100)}
            L ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}
            A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2, 100)}`}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px]">
          <figure className="relative h-[24px] w-[24px] xl:h-[40px] xl:w-[40px]">
            <Image src={getEmojiImg(bestEmotion)} fill alt={bestEmotion} />
          </figure>
          <strong>{getEmojiTxt(bestEmotion)}</strong>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-[8px] xl:gap-[14px]">
          {Object.entries(getSortedObj(rateObj)).map(([emoji, rate]) => (
            <li className="chart-option flex items-center gap-[8px]">
              <i className="block h-[8px] w-[8px] rounded-[2px]"></i>
              <figure className="relative h-[18px] w-[18px] xl:h-[24px] xl:w-[24px]">
                <Image src={getEmojiImg(emoji)} fill alt={emoji} />
              </figure>
              <span className="typo-sm-semibold text-gray-200 xl:typo-xl-semibold hover:text-black-600">{rate}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
