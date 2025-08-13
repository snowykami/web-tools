"use client";

import { Sun, Cloud, CloudRain, Zap } from "lucide-react";
import { BoardData, TrainType } from "@/app/rt-guide/types";

interface MtrDisplayBoardProps {
  data: BoardData;
}

const weatherIcons = {
  sunny: <Sun />,
  cloudy: <Cloud />,
  rainy: <CloudRain />,
  stormy: <Zap />,
};

const trainTypeMap: Record<TrainType, { en: string; cn: string }> = {
  local: { en: "Local", cn: "普通" },
  express: { en: "Express", cn: "直快" },
  rapid: { en: "Rapid", cn: "快速" },
  through: { en: "Through", cn: "贯通" },
};

const formatArrival = (arrival: string, lang: "en" | "cn"): string => {
  if (lang === "cn") {
    if (arrival.toLowerCase() === "arriving") {
      return "即将到达";
    }
    return arrival.replace("min", "分钟");
  }
  return arrival;
};

export function MtrDisplayBoard({ data }: MtrDisplayBoardProps) {
  const { statusBar, trains, theme, lang } = data;

  return (
    <div
      className="w-[600px] text-2xl font-bold shadow-lg"
      style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
    >
      {/* Status Bar */}
      <div
        className="flex items-center justify-between p-2"
        style={{
          backgroundColor: theme.statusBarColor,
          color: theme.statusBarTextColor,
        }}
      >
        <div className="flex items-center gap-2">
          {weatherIcons[statusBar.weather]}
          <span>{statusBar.temperature}°C</span>
        </div>
        <span>{statusBar.time}</span>
      </div>

      {/* Train List */}
      <div>
        {trains.map((train, index) => (
          <div
            key={index}
            className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-3"
            style={{
              backgroundColor:
                index % 2 === 0 ? theme.oddRowColor : theme.evenRowColor,
              color: theme.textColor,
            }}
          >
            <span className="font-semibold">
              {lang === "en" ? train.destination.en : train.destination.cn}
            </span>
            <span
              className="text-center text-lg rounded-full px-2 py-1"
              style={{ backgroundColor: theme.trainTypeColors[train.type] }}
            >
              {trainTypeMap[train.type][lang]}
            </span>
            <span
              className="text-center rounded-full w-8 h-8 flex items-center justify-center mx-auto"
              style={{
                backgroundColor: theme.platformBackgroundColor,
                color: theme.platformTextColor,
              }}
            >
              {train.platform}
            </span>
            <span className="text-right">
              {formatArrival(train.arrival, lang)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
