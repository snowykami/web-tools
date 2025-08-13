"use client";

import * as React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function ColorPicker({
  value,
  onChange,
  label,
  className,
}: ColorPickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", {
              "h-8": !label,
            })}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded ring-1 ring-inset ring-gray-200/20"
                style={{ backgroundColor: value }}
              />
              <HexColorInput
                color={value}
                onChange={onChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <HexColorPicker color={value} onChange={onChange} />
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded ring-1 ring-inset ring-gray-200/20"
                style={{ backgroundColor: value }}
              />
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
