import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolsNavbar } from "~/feature/tools/components/ToolsNavbar";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";

export const Route = createFileRoute("/tools/quick-take-unsplash-image/")({
  component: RouteComponent,
});

function doMagicLink(url: string): string {
  return url.slice(0, url.indexOf("&ixlib="));
}

function RouteComponent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolsLayout>
      <ToolsNavbar />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Quick Take Unsplash Image
          </h1>
          <textarea
            className="w-full h-32 p-4 border-2 border-border rounded-lg mb-4 resize-none"
            placeholder="Paste Unsplash image URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            onClick={() => {
              try {
                const url = new URL(input.trim());
                setOutput(doMagicLink(url.toString()));
              } catch (e) {
                setOutput("Invalid URL");
                return;
              }
            }}
          >
            Shorten URL
          </button>
          {output && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Shortened URL:</h2>
              <p className="break-all">{output}</p>
            </div>
          )}
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              onClick={() => {
                navigator.clipboard.writeText(output);
              }}
            >
              Copy URL
            </button>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
