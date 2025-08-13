"use client";

import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

interface ScreenshotTakerProps {
  children: React.ReactNode;
  fileName?: string;
}

export function ScreenshotTaker({
  children,
  fileName = "download.png",
}: ScreenshotTakerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const takeScreenshot = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  }, [ref, fileName]);

  return (
    <div>
      <div ref={ref}>{children}</div>
      <Button onClick={takeScreenshot} className="mt-4">
        Download Screenshot
      </Button>
    </div>
  );
}
