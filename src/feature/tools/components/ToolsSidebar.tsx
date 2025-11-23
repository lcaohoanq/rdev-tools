import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/shared/components/ui/button";
import { cn } from "~/shared/utils/utils";
import { toolGroups } from "../data";

interface Props {
  className?: string;
}

export function ToolsSidebar({ className }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load sidebar collapsed state from localStorage
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >(() => {
    // Load collapsed groups from localStorage on initial render
    const saved = localStorage.getItem("sidebar-collapsed-groups");
    return saved ? JSON.parse(saved) : {};
  });
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups((prev) => {
      const newState = {
        ...prev,
        [groupTitle]: !prev[groupTitle],
      };
      // Save to localStorage whenever state changes
      localStorage.setItem(
        "sidebar-collapsed-groups",
        JSON.stringify(newState),
      );
      return newState;
    });
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-border mb-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-primary">DevTools</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newState = !isCollapsed;
              setIsCollapsed(newState);
              localStorage.setItem("sidebar-collapsed", String(newState));
            }}
            className="hidden lg:flex h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1 overflow-y-auto">
        {/* Tool Groups */}
        {toolGroups.map((group, groupIndex) => {
          const isGroupCollapsed = collapsedGroups[group.groupTitle];

          return (
            <div key={group.groupTitle}>
              {/* Group Title - Clickable to toggle */}
              {!isCollapsed && (
                <button
                  onClick={() => toggleGroup(group.groupTitle)}
                  className="w-full flex items-center justify-between px-2 mb-2 text-xs font-semibold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors group"
                >
                  <span>{group.groupTitle}</span>
                  {isGroupCollapsed ? (
                    <ChevronRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              )}

              {/* Tools in Group - Collapsible */}
              <div
                className={cn(
                  "space-y-1 mb-3 transition-all duration-200 overflow-hidden",
                  isGroupCollapsed && "max-h-0 mb-0 opacity-0",
                  !isGroupCollapsed && "max-h-[1000px] opacity-100",
                )}
              >
                {group.tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = currentPath === tool.path;

                  return (
                    <Link key={tool.id} to={tool.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 group relative",
                          isCollapsed && "justify-center px-2",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isActive && "text-white",
                          )}
                        />
                        {!isCollapsed && (
                          <span className="font-medium truncate w-full">
                            {tool.title}
                          </span>
                        )}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md border border-border">
                            {tool.title}
                          </div>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              {/* Horizontal Separator (except after last group) */}
              {groupIndex < toolGroups.length - 1 && (
                <div className="my-4 border-t border-border" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground text-center">
            <p>Developer Tools v1.0</p>
            <p className="mt-1">@2025 lcaohoanq</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-background border-r border-border z-40 lg:hidden transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "w-64",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-background border-r border-border sticky top-0 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
