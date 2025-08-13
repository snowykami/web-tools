import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 px-4 items-center">
        <div className="flex-1" />
        <div className="flex-1 text-center">
          <Link href="/" className="font-bold">
            Web Tools
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
