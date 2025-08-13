export type TrainType = "local" | "express" | "rapid" | "through";

export interface TrainInfo {
  destination: {
    en: string;
    cn: string;
  };
  platform: string;
  type: TrainType;
  arrival: string;
}

export interface StatusBarInfo {
  weather: "sunny" | "cloudy" | "rainy" | "stormy";
  temperature: string;
  time: string;
}

export interface ThemeInfo {
  statusBarColor: string;
  statusBarTextColor: string;
  oddRowColor: string;
  evenRowColor: string;
  textColor: string;
  platformBackgroundColor: string;
  platformTextColor: string;
  trainTypeColors: Record<TrainType, string>;
}

export interface BoardData {
  statusBar: StatusBarInfo;
  trains: TrainInfo[];
  theme: ThemeInfo;
  lang: "en" | "cn";
}
