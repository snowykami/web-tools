"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/github-dark.css";

// 注册 JSON 语言
hljs.registerLanguage("json", json);
import { cn } from "@/lib/utils";
import { Clipboard, Download, AlertTriangle } from "lucide-react";

interface FormatOptions {
  indent: number;
  sortKeys: boolean;
  colorize: boolean;
}

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<FormatOptions>({
    indent: 2,
    sortKeys: false,
    colorize: true,
  });
  const [highlightedCode, setHighlightedCode] = useState("");

  const formatJSON = useCallback(() => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError(null);
        return;
      }

      let parsedJSON = JSON.parse(input);

      if (options.sortKeys) {
        parsedJSON = sortObjectKeys(parsedJSON);
      }

      const formatted = JSON.stringify(parsedJSON, null, options.indent);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }, [input, options]);

  useEffect(() => {
    if (options.colorize && output) {
      const highlighted = hljs.highlight(output, { language: "json" }).value;
      setHighlightedCode(highlighted);
    }
  }, [output, options.colorize]);

  const sortObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }

    return Object.keys(obj)
      .sort()
      .reduce((result: Record<string, any>, key) => {
        result[key] = sortObjectKeys(obj[key]);
        return result;
      }, {});
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>JSON 格式化工具</CardTitle>
          <CardDescription>
            将 JSON 文本格式化，支持语法高亮、键值排序等功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>配置选项</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="indent">缩进空格数</Label>
                    <Input
                      id="indent"
                      type="number"
                      min={0}
                      max={8}
                      value={options.indent}
                      onChange={(e) =>
                        setOptions({
                          ...options,
                          indent: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="sort-keys"
                      checked={options.sortKeys}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, sortKeys: checked })
                      }
                    />
                    <Label htmlFor="sort-keys">键值排序</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="colorize"
                      checked={options.colorize}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, colorize: checked })
                      }
                    />
                    <Label htmlFor="colorize">语法高亮</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>输入 JSON</Label>
                <Textarea
                  placeholder="在此输入 JSON 文本..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    formatJSON();
                  }}
                  className="h-[500px] font-mono"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>格式化结果</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={!output}
                    >
                      <Clipboard className="w-4 h-4 mr-2" />
                      复制
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadJSON}
                      disabled={!output}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      下载
                    </Button>
                  </div>
                </div>
                {error ? (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <pre
                    className={cn(
                      "block p-4 rounded-lg border bg-muted h-[500px] overflow-auto font-mono"
                    )}
                  >
                    {options.colorize ? (
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                      />
                    ) : (
                      <code>{output}</code>
                    )}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
