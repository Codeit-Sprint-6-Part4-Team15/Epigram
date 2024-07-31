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
const FACE_WIDTH = 2;
const OUTLINE_WIDTH = 2.25;
const SPACE_LENGTH = (OUTLINE_WIDTH * 2 * 360) / 100 / Math.PI;

export default function DonutChart({ rateObj }: DonutChartProps) {
  const [rates, setRates] = useState(getGraphRateArr(rateObj));

  const getCoordFromDegrees = (angle: number, radius: number, svgSize: number) => {
    const x = Math.cos((angle * Math.PI) / 180);
    const y = Math.sin((angle * Math.PI) / 180);
    const coordX = x * radius + svgSize / 2;
    const coordY = y * -radius + svgSize / 2;
    return `${coordX} ${coordY}`;
  }

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
  }

  return (
    <div className="flex gap-[48px] md:gap-[76px] xl:gap-[120px]">
      <div className="w-[180px] p-[10px]">
        <svg className="w-full" viewBox="0 0 100 100" transform="rotate(-90) scale(1 -1)">
          {rates[0] && <path
            fill="#48BB98"
            stroke="#48BB98"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - STROKE_WIDTH} ${50 - STROKE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
          />}
          {rates[1] && <path
            fill="#FBC85B"
            stroke="#FBC85B"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
          />}
          {rates[2] && <path
            fill="#C7D1E0"
            stroke="#C7D1E0"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
          />}
          {rates[3] && <path
            fill="#E3E9F1"
            stroke="#E3E9F1"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
          />}
          {rates[4] && <path
            fill="#EFF3F8"
            stroke="#EFF3F8"
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
          />}
        </svg>
      </div>
      <div>
        <ul className="flex flex-col gap-[14px]">
          {Object.entries(getSortedObj(rateObj)).map(([emoji, rate]) => (
            <li className="flex gap-[8px] chart-option items-center">
              <i className="block w-[8px] h-[8px] rounded-[2px]"></i>
              <Image src={getEmojiImg(emoji)} width={24} height={24} alt={emoji} />
              <span className="typo-sm-semibold xl:typo-xl-semibold text-gray-200 hover:text-black-600">{rate}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
