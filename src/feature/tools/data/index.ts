import {
  BookMarkedIcon,
  Code2,
  Database,
  FileCode,
  FileJson,
  Heading1,
  Network,
  Settings,
  Sparkles,
  Terminal,
  Wrench,
  Lock,
  Hash,
  RefreshCw,
  Globe,
  Image,
  Calculator,
  Ruler,
  BarChart3,
} from "lucide-react";

// Base tool interface with all properties
interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  category: string;
  badge?: string;
}

// Sidebar-specific tool (subset of Tool properties)
interface ToolSidebar {
  id: string;
  title: string;
  icon: React.ElementType;
  path: string;
  description: string;
}

// Tool group structure
interface ToolGroup {
  groupTitle: string;
  tools: ToolSidebar[];
}

// Category structure
interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
}

export const toolGroups: ToolGroup[] = [
  {
    groupTitle: "Editors",
    tools: [
      {
        id: "vscode",
        title: "VS Code Editor",
        icon: Code2,
        path: "/tools/vscode",
        description: "Browser-based Monaco Editor",
      },
      {
        id: "json-editor",
        title: "JSON Editor",
        icon: FileJson,
        path: "/tools/json-editor",
        description: "Format and validate JSON",
      },
      {
        id: "markdown-editor",
        title: "Markdown Editor",
        icon: Heading1,
        path: "/tools/markdown-editor",
        description: "Write and preview Markdown",
      },
    ],
  },
  {
    groupTitle: "Development",
    tools: [
      {
        id: "terminal",
        title: "Web Terminal",
        icon: Terminal,
        path: "/tools/terminal",
        description: "Interactive terminal environment",
      },
      {
        id: "ghostty",
        title: "Ghostty Terminal",
        icon: Terminal,
        path: "/tools/ghostty-terminal",
        description: "Embedded Ghostty Web Terminal",
      },
      {
        id: "regex-tester",
        title: "Regex Tester",
        icon: FileCode,
        path: "/tools/regex-tester",
        description: "Test and debug regular expressions",
      },
      {
        id: "diff-checker",
        title: "Diff Checker",
        icon: Wrench,
        path: "/tools/diff-checker",
        description: "Compare text differences",
      },
    ],
  },
  {
    groupTitle: "Database",
    tools: [
      {
        id: "sql-client",
        title: "SQL Client",
        icon: Database,
        path: "/tools/sql-client",
        description: "Query and manage databases",
      },
      {
        id: "sql-formatter",
        title: "SQL Formatter",
        icon: FileCode,
        path: "/tools/sql-formatter",
        description: "Format and beautify SQL queries",
      },
    ],
  },
  {
    groupTitle: "Network",
    tools: [
      {
        id: "api-tester",
        title: "API Tester",
        icon: Network,
        path: "/tools/api-tester",
        description: "Test REST APIs",
      },
      {
        id: "websocket-client",
        title: "WebSocket Client",
        icon: Network,
        path: "/tools/websocket-client",
        description: "Test WebSocket connections",
      },
    ],
  },
  {
    groupTitle: "Crypto",
    tools: [
      {
        id: "hash-generator",
        title: "Hash Generator",
        icon: Hash,
        path: "/tools/hash-generator",
        description: "Generate MD5, SHA-256, and more",
      },
      {
        id: "base64-encoder",
        title: "Base64 Encoder",
        icon: Lock,
        path: "/tools/base64-encoder",
        description: "Encode and decode Base64",
      },
      {
        id: "jwt-decoder",
        title: "JWT Decoder",
        icon: Lock,
        path: "/tools/jwt-decoder",
        description: "Decode and verify JWT tokens",
      },
    ],
  },
  {
    groupTitle: "Converter",
    tools: [
      {
        id: "timestamp-converter",
        title: "Timestamp Converter",
        icon: RefreshCw,
        path: "/tools/timestamp-converter",
        description: "Convert Unix timestamps to dates",
      },
      {
        id: "color-converter",
        title: "Color Converter",
        icon: Sparkles,
        path: "/tools/color-converter",
        description: "Convert between HEX, RGB, HSL",
      },
      {
        id: "unit-converter",
        title: "Unit Converter",
        icon: RefreshCw,
        path: "/tools/unit-converter",
        description: "Convert various units",
      },
    ],
  },
  {
    groupTitle: "Web",
    tools: [
      {
        id: "url-encoder",
        title: "URL Encoder",
        icon: Globe,
        path: "/tools/url-encoder",
        description: "Encode and decode URLs",
      },
      {
        id: "html-entities",
        title: "HTML Entities",
        icon: Code2,
        path: "/tools/html-entities",
        description: "Encode and decode HTML entities",
      },
      {
        id: "qr-generator",
        title: "QR Code Generator",
        icon: Sparkles,
        path: "/tools/qr-generator",
        description: "Generate QR codes",
      },
    ],
  },
  {
    groupTitle: "Images & Videos",
    tools: [
      {
        id: "quick-take-unsplash-image",
        title: "Quick Take Unsplash Image",
        icon: Image,
        path: "/tools/quick-take-unsplash-image",
        description: "",
      },
      {
        id: "image-compressor",
        title: "Image Compressor",
        icon: Image,
        path: "/tools/image-compressor",
        description: "Compress and optimize images",
      },
      {
        id: "image-converter",
        title: "Image Converter",
        icon: RefreshCw,
        path: "/tools/image-converter",
        description: "Convert image formats",
      },
    ],
  },
  {
    groupTitle: "Math",
    tools: [
      {
        id: "calculator",
        title: "Scientific Calculator",
        icon: Calculator,
        path: "/tools/calculator",
        description: "Advanced scientific calculator",
      },
      {
        id: "percentage-calculator",
        title: "Percentage Calculator",
        icon: Calculator,
        path: "/tools/percentage-calculator",
        description: "Calculate percentages easily",
      },
    ],
  },
  {
    groupTitle: "Measurement",
    tools: [
      {
        id: "ruler",
        title: "Screen Ruler",
        icon: Ruler,
        path: "/tools/ruler",
        description: "Measure elements on screen",
      },
      {
        id: "reading-time",
        title: "Reading Time",
        icon: Ruler,
        path: "/tools/reading-time",
        description: "Estimate text reading time",
      },
    ],
  },
  {
    groupTitle: "Data",
    tools: [
      {
        id: "csv-viewer",
        title: "CSV Viewer",
        icon: BarChart3,
        path: "/tools/csv-viewer",
        description: "View and analyze CSV files",
      },
      {
        id: "json-to-csv",
        title: "JSON to CSV",
        icon: RefreshCw,
        path: "/tools/json-to-csv",
        description: "Convert JSON to CSV format",
      },
      {
        id: "data-generator",
        title: "Data Generator",
        icon: Sparkles,
        path: "/tools/data-generator",
        description: "Generate mock data",
      },
    ],
  },
];

export const tools: Tool[] = [
  // Editors
  {
    id: "vscode",
    title: "VS Code Editor",
    description:
      "A browser-based code editor powered by Monaco Editor. Write, edit, and experiment with code directly in your browser.",
    icon: Code2,
    path: "/tools/vscode",
    color: "from-blue-500 to-cyan-500",
    category: "editors",
    badge: "Popular",
  },
  {
    id: "json-editor",
    title: "JSON Editor",
    description:
      "Format, validate, and edit JSON data with syntax highlighting and error detection.",
    icon: FileJson,
    path: "/tools/json-editor",
    color: "from-yellow-500 to-orange-500",
    category: "editors",
  },
  {
    id: "markdown-editor",
    title: "Markdown Editor",
    description:
      "Write and preview Markdown with live rendering and export options.",
    icon: Heading1,
    path: "/tools/markdown-editor",
    color: "from-purple-500 to-pink-500",
    category: "editors",
  },

  // Development
  {
    id: "terminal",
    title: "Web Terminal",
    description:
      "A simulated terminal environment in your browser. Practice command-line skills and run basic shell commands.",
    icon: Terminal,
    path: "/tools/terminal",
    color: "from-green-500 to-lime-500",
    category: "development",
    badge: "New",
  },
  {
    id: "ghostty-terminal",
    title: "Ghostty Terminal",
    description:
      "Embedded Ghostty Web Terminal for a full-featured terminal experience directly in your browser.",
    icon: Terminal,
    path: "/tools/ghostty-terminal",
    color: "from-green-500 to-lime-500",
    category: "development",
    badge: "New",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description:
      "Test and debug regular expressions with live matching and explanation.",
    icon: FileCode,
    path: "/tools/regex-tester",
    color: "from-red-500 to-rose-500",
    category: "development",
  },
  {
    id: "diff-checker",
    title: "Diff Checker",
    description: "Compare two text files and highlight the differences.",
    icon: Wrench,
    path: "/tools/diff-checker",
    color: "from-indigo-500 to-blue-500",
    category: "development",
  },

  // Database
  {
    id: "sql-client",
    title: "SQL Client",
    description: "Query and manage databases with an intuitive interface.",
    icon: Database,
    path: "/tools/sql-client",
    color: "from-cyan-500 to-teal-500",
    category: "database",
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter",
    description: "Format and beautify SQL queries for better readability.",
    icon: FileCode,
    path: "/tools/sql-formatter",
    color: "from-emerald-500 to-green-500",
    category: "database",
  },

  // Network
  {
    id: "api-tester",
    title: "API Tester",
    description: "Test REST APIs with custom headers, parameters, and body.",
    icon: Network,
    path: "/tools/api-tester",
    color: "from-violet-500 to-purple-500",
    category: "network",
  },
  {
    id: "websocket-client",
    title: "WebSocket Client",
    description: "Test WebSocket connections and monitor real-time messages.",
    icon: Network,
    path: "/tools/websocket-client",
    color: "from-fuchsia-500 to-pink-500",
    category: "network",
  },

  // Crypto
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate various hash types: MD5, SHA-1, SHA-256, and more.",
    icon: Hash,
    path: "/tools/hash-generator",
    color: "from-slate-500 to-gray-500",
    category: "crypto",
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode and decode text and files to/from Base64.",
    icon: Lock,
    path: "/tools/base64-encoder",
    color: "from-zinc-500 to-stone-500",
    category: "crypto",
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and verify JSON Web Tokens with signature validation.",
    icon: Lock,
    path: "/tools/jwt-decoder",
    color: "from-amber-500 to-yellow-500",
    category: "crypto",
  },

  // Converter
  {
    id: "timestamp-converter",
    title: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa.",
    icon: RefreshCw,
    path: "/tools/timestamp-converter",
    color: "from-sky-500 to-blue-500",
    category: "converter",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert colors between HEX, RGB, HSL, and HSV formats.",
    icon: Sparkles,
    path: "/tools/color-converter",
    color: "from-pink-500 to-rose-500",
    category: "converter",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description:
      "Convert between various units: length, weight, temperature, and more.",
    icon: RefreshCw,
    path: "/tools/unit-converter",
    color: "from-lime-500 to-green-500",
    category: "converter",
  },

  // Web
  {
    id: "url-encoder",
    title: "URL Encoder",
    description: "Encode and decode URLs for safe transmission.",
    icon: Globe,
    path: "/tools/url-encoder",
    color: "from-blue-500 to-indigo-500",
    category: "web",
  },
  {
    id: "html-entities",
    title: "HTML Entities",
    description: "Encode and decode HTML entities for special characters.",
    icon: Code2,
    path: "/tools/html-entities",
    color: "from-orange-500 to-red-500",
    category: "web",
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and contact information.",
    icon: Sparkles,
    path: "/tools/qr-generator",
    color: "from-teal-500 to-cyan-500",
    category: "web",
  },

  // Images & Videos
  {
    id: "quick-take-unsplash-image",
    title: "Quick Take Unsplash Image",
    description: "Shorten the URL of unsplash images for easy sharing.",
    icon: Image,
    path: "/tools/quick-take-unsplash-image",
    color: "from-pink-500 to-purple-500",
    category: "images-videos",
  },

  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress and optimize images without losing quality.",
    icon: Image,
    path: "/tools/image-compressor",
    color: "from-purple-500 to-violet-500",
    category: "images-videos",
  },
  {
    id: "image-converter",
    title: "Image Converter",
    description: "Convert images between formats: PNG, JPG, WebP, and more.",
    icon: RefreshCw,
    path: "/tools/image-converter",
    color: "from-fuchsia-500 to-purple-500",
    category: "images-videos",
  },

  // Math
  {
    id: "calculator",
    title: "Scientific Calculator",
    description:
      "Advanced calculator with scientific and programming functions.",
    icon: Calculator,
    path: "/tools/calculator",
    color: "from-gray-500 to-slate-500",
    category: "math",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and ratios.",
    icon: Calculator,
    path: "/tools/percentage-calculator",
    color: "from-stone-500 to-neutral-500",
    category: "math",
  },

  // Measurement
  {
    id: "ruler",
    title: "Screen Ruler",
    description: "Measure elements on your screen with pixel precision.",
    icon: Ruler,
    path: "/tools/ruler",
    color: "from-cyan-500 to-blue-500",
    category: "measurement",
  },
  {
    id: "reading-time",
    title: "Reading Time",
    description: "Calculate estimated reading time for articles and documents.",
    icon: Ruler,
    path: "/tools/reading-time",
    color: "from-green-500 to-emerald-500",
    category: "measurement",
  },

  // Data
  {
    id: "csv-viewer",
    title: "CSV Viewer",
    description: "View, sort, and filter CSV files with an interactive table.",
    icon: BarChart3,
    path: "/tools/csv-viewer",
    color: "from-violet-500 to-indigo-500",
    category: "data",
  },
  {
    id: "json-to-csv",
    title: "JSON to CSV",
    description: "Convert JSON data to CSV format and vice versa.",
    icon: RefreshCw,
    path: "/tools/json-to-csv",
    color: "from-rose-500 to-pink-500",
    category: "data",
  },
  {
    id: "data-generator",
    title: "Data Generator",
    description:
      "Generate mock data for testing: names, emails, addresses, and more.",
    icon: Sparkles,
    path: "/tools/data-generator",
    color: "from-yellow-500 to-amber-500",
    category: "data",
  },
];

export const categories: Category[] = [
  { id: "all", name: "All Tools", icon: Sparkles, count: tools.length },
  {
    id: "editors",
    name: "Editors",
    icon: FileCode,
    count: tools.filter((t) => t.category === "editors").length,
  },
  {
    id: "development",
    name: "Development",
    icon: Wrench,
    count: tools.filter((t) => t.category === "development").length,
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    count: tools.filter((t) => t.category === "database").length,
  },
  {
    id: "network",
    name: "Network",
    icon: Network,
    count: tools.filter((t) => t.category === "network").length,
  },
  {
    id: "crypto",
    name: "Crypto",
    icon: Lock,
    count: tools.filter((t) => t.category === "crypto").length,
  },
  {
    id: "converter",
    name: "Converter",
    icon: RefreshCw,
    count: tools.filter((t) => t.category === "converter").length,
  },
  {
    id: "web",
    name: "Web",
    icon: Globe,
    count: tools.filter((t) => t.category === "web").length,
  },
  {
    id: "images-videos",
    name: "Images & Videos",
    icon: Image,
    count: tools.filter((t) => t.category === "images-videos").length,
  },
  {
    id: "math",
    name: "Math",
    icon: Calculator,
    count: tools.filter((t) => t.category === "math").length,
  },
  {
    id: "measurement",
    name: "Measurement",
    icon: Ruler,
    count: tools.filter((t) => t.category === "measurement").length,
  },
  {
    id: "data",
    name: "Data",
    icon: BarChart3,
    count: tools.filter((t) => t.category === "data").length,
  },
];
