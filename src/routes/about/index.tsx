import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";
import { ToolsNavbar } from "~/feature/tools/components/ToolsNavbar";

export const Route = createFileRoute("/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ToolsLayout>
      <ToolsNavbar />
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            About Developer Tools
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            This platform is built with ❤ by <strong>lcaohoanq</strong>, aiming
            to bring together a set of practical and time-saving tools for
            developers and anyone working with technology. If you find it
            helpful, feel free to share it with others who might benefit from it
            — and don’t forget to bookmark it for quick access!
          </p>

          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Developer Tools is completely free and open-source. While it will
            always remain free to use, hosting and maintaining the project do
            involve ongoing costs. If you’d like to support the development and
            encourage more tools to be added, you’re welcome to contribute or
            sponsor the project.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Technologies</h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Developer Tools is built using <strong>React</strong> and powered by
            a modern frontend ecosystem. The application is continuously
            deployed and hosted with Vercel. A number of third-party open-source
            libraries are integrated to enhance functionality across individual
            tools. You can find the full list in the project's package.json.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Found a bug? A tool is missing?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            If there's a tool you think should be added, or if you have an idea
            that could benefit others, feel free to submit a feature request
            through the GitHub issues page. And if something isn’t working as
            expected, please open a bug report so it can be fixed as soon as
            possible.
          </p>
        </div>
      </div>
    </ToolsLayout>
  );
}
