"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoardData, ThemeInfo,  TrainType } from "./types";

interface BoardFormProps {
    data: BoardData;
    setData: (data: BoardData) => void;
}

export function BoardForm({ data, setData }: BoardFormProps) {
    const handleStatusBarChange = (field: string, value: string) => {
        setData({ ...data, statusBar: { ...data.statusBar, [field]: value } });
    };

    type TrainField =
        | "platform"
        | "arrival"
        | "type"
        | "destination.en"
        | "destination.cn";

    const handleTrainChange = (
        index: number,
        field: TrainField,
        value: string | TrainType
    ) => {
        const newTrains = [...data.trains];
        const trainToUpdate = { ...newTrains[index] };

        if (field === "destination.en" || field === "destination.cn") {
            const [, subkey] = field.split(".") as ["destination", "en" | "cn"];
            trainToUpdate.destination[subkey] = value as string;
        } else if (field === "type") {
            trainToUpdate[field] = value as TrainType;
        } else {
            trainToUpdate[field as "platform" | "arrival"] = value;
        }

        newTrains[index] = trainToUpdate;
        setData({ ...data, trains: newTrains });
    };

    const handleThemeChange = (
        field: keyof Omit<ThemeInfo, "trainTypeColors"> | "trainTypeColors",
        value: string | Record<TrainType, string>
    ) => {
        setData({ ...data, theme: { ...data.theme, [field]: value } });
    };

    const handleLangChange = (checked: boolean) => {
        setData({ ...data, lang: checked ? "cn" : "en" });
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Board Configuration</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="statusbar">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="statusbar">Status Bar</TabsTrigger>
                        <TabsTrigger value="trains">Train Info</TabsTrigger>
                        <TabsTrigger value="theme">Theme</TabsTrigger>
                    </TabsList>

                    {/* Status Bar Tab */}
                    <TabsContent value="statusbar" className="mt-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="weather">Weather</Label>
                                    <Select
                                        value={data.statusBar.weather}
                                        onValueChange={(value) =>
                                            handleStatusBarChange("weather", value)
                                        }
                                    >
                                        <SelectTrigger id="weather">
                                            <SelectValue placeholder="Select weather" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sunny">Sunny</SelectItem>
                                            <SelectItem value="cloudy">Cloudy</SelectItem>
                                            <SelectItem value="rainy">Rainy</SelectItem>
                                            <SelectItem value="stormy">Stormy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="temperature">Temperature (°C)</Label>
                                    <Input
                                        id="temperature"
                                        type="number"
                                        value={data.statusBar.temperature}
                                        onChange={(e) =>
                                            handleStatusBarChange("temperature", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="text"
                                    value={data.statusBar.time}
                                    onChange={(e) => handleStatusBarChange("time", e.target.value)}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* Trains Tab */}
                    <TabsContent value="trains" className="mt-4">
                        <div className="space-y-6">
                            {data.trains.map((train, index) => (
                                <div key={index}>
                                    <Label className="text-lg font-semibold">
                                        Train {index + 1}
                                    </Label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <Label htmlFor={`dest-en-${index}`}>
                                                Destination (EN)
                                            </Label>
                                            <Input
                                                id={`dest-en-${index}`}
                                                value={train.destination.en}
                                                onChange={(e) =>
                                                    handleTrainChange(
                                                        index,
                                                        "destination.en",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`dest-cn-${index}`}>
                                                Destination (CN)
                                            </Label>
                                            <Input
                                                id={`dest-cn-${index}`}
                                                value={train.destination.cn}
                                                onChange={(e) =>
                                                    handleTrainChange(
                                                        index,
                                                        "destination.cn",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`platform-${index}`}>Platform</Label>
                                            <Input
                                                id={`platform-${index}`}
                                                value={train.platform}
                                                onChange={(e) =>
                                                    handleTrainChange(index, "platform", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`arrival-${index}`}>Arrival</Label>
                                            <Input
                                                id={`arrival-${index}`}
                                                value={train.arrival}
                                                onChange={(e) =>
                                                    handleTrainChange(index, "arrival", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`type-${index}`}>Type</Label>
                                            <Select
                                                value={train.type}
                                                onValueChange={(value: TrainType) =>
                                                    handleTrainChange(index, "type", value)
                                                }
                                            >
                                                <SelectTrigger id={`type-${index}`}>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="rapid">Rapid</SelectItem>
                                                    <SelectItem value="express">Express</SelectItem>
                                                    <SelectItem value="through">Through</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {index < data.trains.length - 1 && (
                                        <Separator className="mt-6" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Theme Tab */}
                    <TabsContent value="theme" className="mt-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="statusbar-color">Status Bar Color</Label>
                                    <Input
                                        id="statusbar-color"
                                        type="color"
                                        value={data.theme.statusBarColor}
                                        onChange={(e) =>
                                            handleThemeChange("statusBarColor", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="text-color">Text Color</Label>
                                    <Input
                                        id="text-color"
                                        type="color"
                                        value={data.theme.textColor}
                                        onChange={(e) =>
                                            handleThemeChange("textColor", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="odd-row-color">Odd Row Color</Label>
                                    <Input
                                        id="odd-row-color"
                                        type="color"
                                        value={data.theme.oddRowColor}
                                        onChange={(e) =>
                                            handleThemeChange("oddRowColor", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="even-row-color">Even Row Color</Label>
                                    <Input
                                        id="even-row-color"
                                        type="color"
                                        value={data.theme.evenRowColor}
                                        onChange={(e) =>
                                            handleThemeChange("evenRowColor", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <Label className="text-lg font-semibold">Train Type Colors</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {(Object.keys(data.theme.trainTypeColors) as TrainType[]).map(
                                    (type) => (
                                        <div key={type}>
                                            <Label htmlFor={`color-${type}`} className="capitalize">
                                                {type}
                                            </Label>
                                            <Input
                                                id={`color-${type}`}
                                                type="color"
                                                value={data.theme.trainTypeColors[type]}
                                                onChange={(e) => {
                                                    const newColors: Record<TrainType, string> = {
                                                        ...data.theme.trainTypeColors,
                                                        [type]: e.target.value,
                                                    };
                                                    handleThemeChange("trainTypeColors", newColors);
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center space-x-2 mt-4">
                                <Switch
                                    id="language-switch"
                                    checked={data.lang === "cn"}
                                    onCheckedChange={handleLangChange}
                                />
                                <Label htmlFor="language-switch">
                                    Display Chinese (中文)
                                </Label>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
