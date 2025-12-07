import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";

// --- QUAN TRỌNG: Import từ thư viện ghostty-web ---
import { FitAddon, init, Terminal } from "ghostty-web";

import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";
import { ToolsNavbar } from "~/feature/tools/components/ToolsNavbar";

// --- GHOSTTY WASM SINGLETON ---
let initGhosttyPromise: Promise<void> | null = null;

// Helper: Khởi tạo Ghostty WASM (Chỉ chạy 1 lần duy nhất)
const initGhosttyWasm = async () => {
  if (!initGhosttyPromise) {
    initGhosttyPromise = init();
  }
  return initGhosttyPromise;
};

const RemoteTerminal = () => {
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null); // Thay shellProcess bằng WebSocket
  const isInitializedRef = useRef<boolean>(false);

  // State cho UI
  const [status, setStatus] = useState<
    "disconnected" | "connected" | "connecting"
  >("disconnected");

  useEffect(() => {
    // Prevent double initialization
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    let fitAddon: FitAddon;

    const startSystem = async () => {
      try {
        // 1. Kiểm tra môi trường (WASM vẫn cần headers bảo mật)
        if (!crossOriginIsolated) {
          console.error("Thiếu Cross-Origin Isolation (COOP/COEP).");
          // Lưu ý: Ghostty Web vẫn cần cái này để render, dù không dùng WebContainer
        }

        // 2. Khởi tạo WASM của Ghostty
        await initGhosttyWasm();

        // Trước khi tạo terminal mới, hãy xóa sạch mọi thứ trong thẻ chứa (container)
        // Để đảm bảo không bị render 2 lần canvas
        if (terminalContainerRef.current) {
          terminalContainerRef.current.innerHTML = "";
        }

        // 3. Khởi tạo Terminal UI
        const term = new Terminal({
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'Monaco, Menlo, "Courier New", monospace',
          theme: {
            background: "#1e1e1e",
            foreground: "#d4d4d4",
          },
          scrollback: 10000,
        });

        // 4. Setup Addons
        fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        // 5. Mount vào DOM
        if (terminalContainerRef.current) {
          term.open(terminalContainerRef.current);
          fitAddon.fit();
        }
        terminalInstanceRef.current = term;

        // Xử lý resize window
        window.addEventListener("resize", () => fitAddon.fit());

        // --- KẾT NỐI VỚI REAL LINUX SERVER (FLY.IO) ---
        // term.write("\x1b[33mConnecting to Linux Server...\x1b[0m\r\n");
        setStatus("connecting");

        // URL Server của bạn: https -> wss
        const SERVER_URL =
          import.meta.env.VITE_LINUX_SERVER_HOST ?? "ws://localhost:4000";

        const ws = new WebSocket(SERVER_URL);
        wsRef.current = ws;

        // A. Khi kết nối thành công
        ws.onopen = () => {
          // term.write("\x1b[32mConnected successfully!\x1b[0m\r\n");
          setStatus("connected");

          // Gửi kích thước terminal hiện tại lên server để Bash biết mà xuống dòng đúng chỗ
          ws.send(
            JSON.stringify({
              type: "resize",
              cols: term.cols,
              rows: term.rows,
            }),
          );
        };

        // B. Khi nhận dữ liệu từ Server (Bash output) -> Hiển thị lên Terminal
        ws.onmessage = (event) => {
          // Server gửi text raw, ta chỉ việc write vào terminal
          if (typeof event.data === "string") {
            term.write(event.data);
          } else {
            // Trường hợp blob (ít gặp với setup node-pty đơn giản)
            event.data.text().then((txt: string) => term.write(txt));
          }
        };

        // C. Khi người dùng gõ phím (Terminal input) -> Gửi lên Server
        term.onData((data) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
          }
        });

        // D. Khi người dùng kéo giãn cửa sổ -> Báo Server resize Bash
        term.onResize((size) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: "resize",
                cols: size.cols,
                rows: size.rows,
              }),
            );
          }
        });

        // E. Xử lý lỗi/đóng kết nối
        ws.onclose = () => {
          setStatus("disconnected");
          term.write("\r\n\x1b[31mConnection closed.\x1b[0m\r\n");
        };

        ws.onerror = (err) => {
          console.error("WebSocket Error:", err);
          term.write("\r\n\x1b[31mConnection Error.\x1b[0m\r\n");
        };

        // Fit lại lần cuối
        setTimeout(() => fitAddon.fit(), 100);
      } catch (error) {
        console.error("Lỗi khởi tạo:", error);
        if (terminalInstanceRef.current) {
          terminalInstanceRef.current.write(
            `\r\n\x1b[31mError: ${String(error)}\x1b[0m\r\n`,
          );
        }
      }
    };

    startSystem();

    // Cleanup
    return () => {
      isInitializedRef.current = false;

      // Đóng WebSocket
      if (wsRef.current) {
        wsRef.current.close();
      }

      // Hủy Terminal
      if (terminalInstanceRef.current) {
        try {
          terminalInstanceRef.current.dispose();
          terminalInstanceRef.current = null;
        } catch (e) {
          console.error("Error disposing terminal:", e);
        }
      }
    };
  }, []);

  return (
    <ToolsLayout>
      <ToolsNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
        {/* Terminal Window Frame */}
        <div className="w-full max-w-5xl bg-[#1e1e1e] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
          {/* Title Bar */}
          <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-3 border-b border-[#1a1a1a]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>

            <div className="text-[#e5e5e5] text-[13px] font-medium tracking-wide ml-2">
              root@fly-machine:~
            </div>

            <div className="ml-auto text-[11px] text-gray-400 flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  status === "connected" ? "bg-[#27c93f]" : "bg-red-500"
                }`}
              />
              <span className="capitalize">{status}</span>
            </div>
          </div>

          <div className="relative h-[600px] p-4 bg-[#1e1e1e] overflow-hidden">
            <div
              ref={terminalContainerRef}
              className="w-full h-full"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
};

export const Route = createFileRoute("/tools/ghostty-terminal/")({
  component: RemoteTerminal,
});
