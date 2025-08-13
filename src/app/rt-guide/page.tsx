import { MtrTrainInfo } from "@/components/rt-guide/mtr-train-info";

export default function RtGuidePage() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold">Rail Transit Guide Generator</h1>
        <p className="text-muted-foreground">
          Customize the board and download it as an image.
        </p>
      </header>
      <main>
        <MtrTrainInfo />
      </main>
    </div>
  );
}