import { useEffect, useState } from "react";

interface DonutChartProps {
  rateArr: number[];
}

function getCoordFromDegrees(angle: number, radius: number, svgSize: number) {
  const x = Math.cos((angle * Math.PI) / 180);
  const y = Math.sin((angle * Math.PI) / 180);
  const coordX = x * radius + svgSize / 2;
  const coordY = y * -radius + svgSize / 2;
  return `${coordX} ${coordY}`;
}

function getGraphRateArr(arr: number[]) {
  const newArr = arr.map((x, index, arr) => {
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

export default function DonutChart({ rateArr }: DonutChartProps) {
  const [rates, setRates] = useState(getGraphRateArr(rateArr));

  return (
    <div className="w-[180px] p-[10px]">
      <svg className="w-full" viewBox="0 0 100 100" transform="rotate(-90) scale(1 -1)">
        <path
          fill="#48BB98"
          stroke="#48BB98"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - STROKE_WIDTH} ${50 - STROKE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[0] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
        />
        <path
          fill="#FBC85B"
          stroke="#FBC85B"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[1] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[0] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
        />
        <path
          fill="#C7D1E0"
          stroke="#C7D1E0"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[2] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[1] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
        />
        <path
          fill="#E3E9F1"
          stroke="#E3E9F1"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[3] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[2] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
        />
        <path
          fill="#EFF3F8"
          stroke="#EFF3F8"
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
          d={`M ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          A ${50 - OUTLINE_WIDTH} ${50 - OUTLINE_WIDTH} 0 0 0 ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - STROKE_WIDTH, 100)}
          L ${getCoordFromDegrees(rates[4] - SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}
          A ${50 - FACE_WIDTH - STROKE_WIDTH} ${50 - FACE_WIDTH - STROKE_WIDTH} 0 0 1 ${getCoordFromDegrees(rates[3] + SPACE_LENGTH, 50 - FACE_WIDTH - STROKE_WIDTH, 100)}`}
        />
      </svg>
    </div>
  );
}
