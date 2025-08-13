export interface Tool {
  title: string;
  description: string;
  href: string;
}

export const tools: Tool[] = [
  {
    title: "Rail Transit Guide",
    description: "轨道交通导视生成器",
    href: "/rt-guide",
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode or decode URLs and strings.",
    href: "/url-encoder",
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode or decode strings to and from Base64.",
    href: "/base64-encoder",
  },
];
