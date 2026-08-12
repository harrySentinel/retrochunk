"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div
      className={cn(
        "relative border-2 border-[var(--border)] overflow-hidden",
        className
      )}
      style={{
        boxShadow: "4px 4px 0 var(--shadow-hard)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b-2 border-[var(--border)]"
        style={{ backgroundColor: "var(--surface-2)" }}
      >
        <span
          className="text-xs uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-pixel)",
            color: "var(--text-3)",
          }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 border-2 border-[var(--border)] transition-all duration-100 cursor-pointer"
          style={{
            fontFamily: "var(--font-pixel)",
            backgroundColor: copied ? "var(--success)" : "var(--surface)",
            color: copied ? "var(--accent-ink)" : "var(--text-2)",
            boxShadow: "2px 2px 0 var(--shadow-hard)",
          }}
          onMouseDown={(e) => {
            const target = e.currentTarget;
            target.style.boxShadow = "0px 0px 0 var(--shadow-hard)";
            target.style.transform = "translate(2px, 2px)";
          }}
          onMouseUp={(e) => {
            const target = e.currentTarget;
            target.style.boxShadow = "2px 2px 0 var(--shadow-hard)";
            target.style.transform = "translate(0, 0)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.boxShadow = "2px 2px 0 var(--shadow-hard)";
            target.style.transform = "translate(0, 0)";
          }}
        >
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>

      {/* Code area */}
      <pre
        className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{
          backgroundColor: "var(--surface)",
          fontFamily: "var(--font-mono)",
          color: "var(--text-2)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
