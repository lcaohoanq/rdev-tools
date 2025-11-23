import React from "react";
import { ToolsSidebar } from "../components/ToolsSidebar";
import { SidebarProvider } from "../../../shared/contexts/SidebarContext";

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <SidebarProvider>
      <title>DevTools - Handy online tools for developer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex min-h-screen bg-background">
        <ToolsSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
