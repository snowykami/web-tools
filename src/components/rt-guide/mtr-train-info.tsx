"use client";

import { useState } from "react";
import { BoardData } from "@/app/rt-guide/types";
import { MtrDisplayBoard } from "./mtr-display-board";
import { MtrBoardForm } from "./mtr-board-form";
import { ScreenshotTaker } from "@/components/screenshot-taker";

const initialData: BoardData = {
  statusBar: {
    weather: "sunny",
    temperature: "34",
    time: "13:21",
  },
  trains: [
    {
      destination: { en: "Wangjiazhuang", cn: "王家庄" },
      platform: "3",
      type: "rapid",
      arrival: "Arriving",
    },
    {
      destination: { en: "Tangjiatuo", cn: "唐家坨" },
      platform: "3",
      type: "express",
      arrival: "3 min",
    },
    {
      destination: { en: "Yuetong North Road", cn: "悦港北路" },
      platform: "3",
      type: "local",
      arrival: "7 min",
    },
    {
      destination: { en: "Shiqiaopu", cn: "石桥铺" },
      platform: "3",
      type: "through",
      arrival: "10 min",
    },
  ],
  theme: {
    statusBarColor: "#0033A0",
    statusBarTextColor: "#FFFFFF",
    oddRowColor: "#42b7de",
    evenRowColor: "#5899cd",
    textColor: "#FFFFFF",
    platformBackgroundColor: "#00529B",
    platformTextColor: "#FFFFFF",
    trainTypeColors: {
      local: "#319d2f",
      express: "#D93A3A",
      rapid: "#F2B705",
      through: "#9352ff",
    },
  },
  lang: "en",
};

export function MtrTrainInfo() {
  const [data, setData] = useState<BoardData>(initialData);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <MtrBoardForm data={data} setData={setData} />
      <div className="flex flex-col items-center">
        <ScreenshotTaker fileName="mtr-guide.png">
          <MtrDisplayBoard data={data} />
        </ScreenshotTaker>
      </div>
    </div>
  );
}
