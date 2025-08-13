"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(formatted);
      setError("");
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const clearText = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold mt-4">JSON Formatter</h1>
      </header>
      <main className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="json-input">Input</label>
          <Textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here"
            className="h-96"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="json-output">Output</label>
          <Textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here"
            className="h-96"
          />
        </div>
      </main>
      <footer className="mt-4 flex gap-2">
        <Button onClick={formatJson}>Format JSON</Button>
        <Button onClick={copyToClipboard} disabled={!output}>
          Copy to Clipboard
        </Button>
        <Button onClick={clearText} variant="destructive">
          Clear
        </Button>
      </footer>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
