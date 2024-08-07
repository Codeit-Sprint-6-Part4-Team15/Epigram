"use client";
import Image from "next/image";
import { useState } from "react";
import { EmotionChartData, EmotionData } from "@/src/types/emotion";

interface DonutChartProps {
  data: EmotionData[];
}

const sortAndCalculateDeg = (data: EmotionData[]): EmotionChartData[] => {
  const sortedData = data.sort((a, b) => b.rate - a.rate);

  let cumulativeDeg = 0;

  return sortedData.map(el => {
    const deg = (el.rate * 360) / 100;
    const updatedEl = { ...el, deg: cumulativeDeg + deg };
    cumulativeDeg += deg;
    return updatedEl;
  });
};

const STROKE_WIDTH = 4;
const FACE_WIDTH = 1;
const OUTLINE_WIDTH = 1.5;
const SPACE_LENGTH = (OUTLINE_WIDTH * 2 * 360) / 100 / Math.PI;

export default function DonutChart({ data }: DonutChartProps) {
  const [sortedData, setSortedData] = useState<EmotionChartData[]>(sortAndCalculateDeg(data));
  const [bestEmotion, setBestEmotion] = useState<EmotionChartData>(sortedData[0]);

  const getCoordFromDegrees = (angle: number, radius: number) => {
    const svgSize = 100;
    const x = Math.cos((angle * Math.PI) / 180);
    const y = Math.sin((angle * Math.PI) / 180);
    const coordX = x * radius + svgSize / 2;
    const coordY = y * -radius + svgSize / 2;

    return `${coordX} ${coordY}`;
  };

  const renderPath = (prevDeg: number, curDeg: number, color: string) => {
    const pathData = `
      M ${getCoordFromDegrees(prevDeg + SPACE_LENGTH, 50 - STROKE_WIDTH / 2)}
      A ${50 - STROKE_WIDTH / 2} ${50 - STROKE_WIDTH / 2} 0 0 0 ${getCoordFromDegrees(curDeg - SPACE_LENGTH, 50 - STROKE_WIDTH / 2)}
      L ${getCoordFromDegrees(curDeg - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}
      A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 0 1 ${getCoordFromDegrees(prevDeg + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}
    `;

    return (
      <path
        fill={color}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        strokeLinecap="round"
        d={pathData}
      />
    );
  };

  const renderDonutChart = () => {
    if (sortedData.every((item) => item.rate === 0)) {
      return (
        <path
          fill="#ddd"
          stroke="#ddd"
          strokeWidth={STROKE_WIDTH}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(0, 50 - STROKE_WIDTH / 2)}
              A ${50 - STROKE_WIDTH / 2} ${50 - STROKE_WIDTH / 2} 0 1 0 ${getCoordFromDegrees(360 - SPACE_LENGTH, 50 - STROKE_WIDTH / 2)}
              L ${getCoordFromDegrees(360 - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}
              A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 1 1 ${getCoordFromDegrees(0, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}`}
        />
      );
    }
    return sortedData.map((item, index) => {
      if (item.rate === 0) {
        return null;
      }
      if (index === 0) {
        return (
          <path
            key={item.emotion}
            fill={item.color}
            stroke={item.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinejoin="round"
            strokeLinecap="round"
            d={`M ${getCoordFromDegrees(SPACE_LENGTH, 50 - STROKE_WIDTH / 2)}
                A ${50 - STROKE_WIDTH / 2} ${50 - STROKE_WIDTH / 2} 0 ${item.rate > 50 ? 1 : 0} 0 ${getCoordFromDegrees(item.deg - SPACE_LENGTH, 50 - STROKE_WIDTH / 2)}
                L ${getCoordFromDegrees(item.deg - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}
                A ${50 - FACE_WIDTH - STROKE_WIDTH / 2} ${50 - FACE_WIDTH - STROKE_WIDTH / 2} 0 ${item.rate > 50 ? 1 : 0} 1 ${getCoordFromDegrees(SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH / 2)}`}
          />
        );
      }

      if (index > 0 && index < sortedData.length) {
        return renderPath(sortedData[index - 1].deg, item.deg, item.color);
      }

      return null;
    });
  };

  return (
    <div className="flex items-center gap-[48px] md:gap-[76px] xl:gap-[120px]">
      <div className="relative h-[120px] w-[120px] xl:h-[180px] xl:w-[180px]">
        <svg className="w-full" viewBox="0 0 100 100" transform="rotate(-90) scale(1 -1)">
          {renderDonutChart()}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px]">
          <figure className="relative h-[24px] w-[24px] xl:h-[40px] xl:w-[40px]">
            <Image src={bestEmotion.image} fill alt={bestEmotion.label} />
          </figure>
          <strong>{bestEmotion.label}</strong>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-[8px] xl:gap-[14px]">
          {sortedData.map((el) => (
            <li key={el.emotion} className="group flex items-center gap-[8px]">
              <i style={{ background: `${el.rate !== 0 ? el.color : "#ddd"}` }} className="block h-[8px] w-[8px] rounded-[2px]"></i>
              <figure className="relative h-[18px] w-[18px] xl:h-[24px] xl:w-[24px]">
                <Image src={el.image} fill alt={el.emotion} />
              </figure>
              <span className="typo-sm-semibold text-gray-200 xl:typo-xl-semibold hover:text-black-600">{el.rate}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
