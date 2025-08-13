import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tools } from "@/lib/tools";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="my-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Web Tools
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.href} passHref>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
