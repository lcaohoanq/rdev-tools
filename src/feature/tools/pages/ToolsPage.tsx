import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { ToolsNavbar } from "~/feature/tools/components/ToolsNavbar";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { categories, tools } from "../data";

export function ToolsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTools =
    selectedCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  return (
    <ToolsLayout>
      <ToolsNavbar />
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Developer Tools
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Select a tool to get started or explore all available tools below
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category.id
                          ? "bg-white/20"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mb-12">
            {filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-2">
                  No tools found in this category
                </div>
                <p className="text-muted-foreground text-sm">
                  More tools coming soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card
                      key={tool.id}
                      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 overflow-hidden relative hover:cursor-pointer"
                      onClick={() => {
                        navigate({ to: tool.path });
                      }}
                    >
                      {/* Badge */}
                      {tool.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                            {tool.badge}
                          </span>
                        </div>
                      )}

                      <CardHeader>
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
