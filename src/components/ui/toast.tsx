'use client';

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ToastContextType {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    setIsOpen(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={cn(
          "fixed bottom-4 sm:bottom-6 left-1/2 z-50 flex items-center gap-2",
          "bg-[var(--surface)] border border-[var(--border)] border-l-[3px] border-l-[var(--accent)]",
          "px-3 py-2 sm:px-4 sm:py-3 shadow-[4px_4px_0_0_#000]",
          "transition-all duration-300 ease-out",
          isOpen
            ? "-translate-x-1/2 translate-y-0 opacity-100"
            : "-translate-x-1/2 translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--success)]"
        >
          <path
            d="M13.25 4.75L6 12L2.75 8.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-xs text-[var(--text)] whitespace-nowrap">{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
