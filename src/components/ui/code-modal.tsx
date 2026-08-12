'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { PixelButton } from '@/components/ui';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  category: string;
  code: string;
  onCopy?: () => void;
}

export function CodeModal({ isOpen, onClose, name, category, code, onCopy }: CodeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      if (onCopy) onCopy();
    });
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center",
        "transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" 
        onClick={onClose} 
      />
      
      <div
        className={cn(
          "relative z-10 w-full sm:max-w-[900px] bg-[var(--surface)] border border-[var(--border)]",
          "flex flex-col rounded-t-[8px] sm:rounded-none",
          "max-h-[92vh] sm:max-h-[85vh]",
          "transition-transform duration-300 ease-out shadow-[4px_4px_0_0_#000]",
          isOpen ? "translate-y-0" : "translate-y-full sm:translate-y-8"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <h2 className="font-pixel text-[var(--text)] text-sm sm:text-base m-0">
              {name}
            </h2>
            <span className="bg-[var(--surface-2)] text-[var(--text-2)] font-mono text-[10px] px-2 py-1 border border-[var(--border)] uppercase tracking-wider">
              {category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors p-1 cursor-pointer"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4">
          <pre className="font-mono text-xs sm:text-sm text-[var(--text)] overflow-x-auto m-0">
            <code>{code}</code>
          </pre>
        </div>

        <div className="flex items-center justify-end gap-4 p-4 border-t border-[var(--border)] bg-[var(--surface)]">
          <PixelButton variant="secondary" onClick={onClose}>
            Close
          </PixelButton>
          <PixelButton variant="primary" onClick={handleCopy}>
            Copy Code
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
