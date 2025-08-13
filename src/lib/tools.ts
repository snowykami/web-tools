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
    title: "JSON formatter",
    description: "JSON 格式化工具",
    href: "/json-formatter",
  }
];
