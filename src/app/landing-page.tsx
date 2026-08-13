'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { componentDocs, type ComponentDoc } from '@/lib/component-docs';
import { librarySections } from '@/lib/library-sections';
import { PixelButton, PixelCard, PixelBadge, PixelWindow, PixelLoader, PixelInput } from '@/components/ui';
import {
  Mascot,
  PixelCreature,
  PixelPersonality,
  MASCOT_PALETTE,
  MASCOT_BASE,
} from '@/components/mascot';
import { cn } from '@/lib/cn';
import { CodeModal } from '@/components/ui/code-modal';
import { useToast } from '@/components/ui/toast';

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [codeModalDoc, setCodeModalDoc] = useState<ComponentDoc | null>(null);
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('retrochunk-sidebar-collapsed');
    if (saved !== null) setIsCollapsed(saved === 'true');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSearchQuery('');
        setIsSidebarOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSlug(null);
    setSearchQuery('');
  };

  const selectSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSlug(null);
    setIsSidebarOpen(false);
  };

  const selectItem = (doc: ComponentDoc) => {
    setActiveCategory(doc.category);
    setActiveSlug(doc.slug);
    setIsSidebarOpen(false);
  };

  const filteredDocs = useMemo(() => {
    return (
      componentDocs?.filter((doc) => {
        const matchesCategory = activeCategory ? doc.category === activeCategory : true;
        const matchesSlug = activeSlug ? doc.slug === activeSlug : true;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          doc.name.toLowerCase().includes(q) ||
          doc.description.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q) ||
          doc.slug.toLowerCase().includes(q);
        return matchesCategory && matchesSlug && matchesSearch;
      }) || []
    );
  }, [activeCategory, activeSlug, searchQuery]);

  const getCategoryCount = (categoryId: string) =>
    componentDocs?.filter((d) => d.category === categoryId).length || 0;

  const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="flex flex-col h-full">
      <div className={cn('flex items-center gap-3 mb-8', isCollapsed ? 'justify-center' : '')}>
        <div className="grid grid-cols-4 grid-rows-4 w-6 h-6 gap-[1px]">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-full h-full',
                [0, 3, 5, 6, 9, 10, 12, 15].includes(i) ? 'bg-[var(--accent)]' : 'bg-transparent'
              )}
            />
          ))}
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="font-pixel text-[14px] leading-tight text-[var(--text)]">RETROCHUNK</h1>
            <p className="font-mono text-[9px] text-[var(--text-3)] uppercase">pixel component library</p>
          </div>
        )}
      </div>

      <nav
        className={cn(
          'flex-1 overflow-y-auto pb-4 scrollbar-thin',
          isCollapsed ? 'space-y-4 px-0' : 'space-y-6 pr-2'
        )}
      >
        <div>
          <button
            title="All Components"
            onClick={() => {
              clearFilters();
              setIsSidebarOpen(false);
            }}
            className={cn(
              'w-full flex items-center transition-colors group',
              isCollapsed ? 'justify-center py-2' : 'justify-between px-2.5 py-1.5',
              activeCategory === null && activeSlug === null
                ? 'bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                : 'text-[var(--text-2)] hover:bg-[var(--surface-2)]'
            )}
          >
            {isCollapsed ? (
              <span
                className={cn(
                  'font-pixel text-[16px]',
                  activeCategory === null ? 'text-[var(--accent)]' : 'text-[var(--text-2)] group-hover:text-[var(--text)]'
                )}
              >
                ⊞
              </span>
            ) : (
              <>
                <span
                  className={cn(
                    'font-pixel text-[12px]',
                    activeCategory === null && activeSlug === null
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-2)] group-hover:text-[var(--text)]'
                  )}
                >
                  All Components
                </span>
                <span
                  className={cn(
                    'text-[10px] px-[7px] py-[1px] min-w-[22px] text-center font-mono',
                    activeCategory === null && activeSlug === null
                      ? 'bg-[rgba(255,176,32,0.2)] text-[var(--accent)]'
                      : 'bg-[var(--surface-2)] text-[var(--text-3)] group-hover:text-[var(--text-2)]'
                  )}
                >
                  {componentDocs?.length || 0}
                </span>
              </>
            )}
          </button>
        </div>

        {librarySections.map((section) => {
          const items = componentDocs?.filter((d) => d.category === section.id) || [];
          if (items.length === 0) return null;
          const sectionActive = activeCategory === section.id && !activeSlug;

          if (isCollapsed) {
            return (
              <div key={section.id} className="flex justify-center">
                <button
                  title={section.label}
                  onClick={() => selectSection(section.id)}
                  className={cn(
                    'w-10 h-10 flex items-center justify-center transition-colors border border-[var(--border)]',
                    activeCategory === section.id
                      ? 'bg-[rgba(255,176,32,0.12)] border-[rgba(255,176,32,0.4)] text-[var(--accent)]'
                      : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  )}
                >
                  <span className="font-pixel text-[14px]">{section.icon}</span>
                </button>
              </div>
            );
          }

          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => selectSection(section.id)}
                className="w-full flex items-center gap-3 mb-2 px-1 group text-left"
                title={section.description}
              >
                <h2
                  className={cn(
                    'text-[10px] tracking-[0.22em] uppercase font-sans font-semibold',
                    sectionActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)] group-hover:text-[var(--text-2)]'
                  )}
                >
                  {section.label}
                </h2>
                <div
                  className="flex-1 h-[1px]"
                  style={{
                    background:
                      'repeating-linear-gradient(to right, var(--border) 0 3px, transparent 3px 6px)',
                  }}
                />
                <span className="font-mono text-[9px] text-[var(--text-3)]">{getCategoryCount(section.id)}</span>
              </button>
              <ul className="space-y-0.5">
                {items.map((doc) => {
                  const itemActive = activeSlug === doc.slug;
                  return (
                    <li key={doc.slug}>
                      <button
                        type="button"
                        onClick={() => selectItem(doc)}
                        className={cn(
                          'w-full flex items-center justify-between px-2.5 py-1.5 transition-colors group',
                          itemActive
                            ? 'bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                            : 'text-[var(--text-2)] hover:bg-[var(--surface-2)]'
                        )}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span
                            className={cn(
                              'text-[9px]',
                              itemActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                            )}
                          >
                            ▸
                          </span>
                          <span
                            className={cn(
                              'font-pixel text-[12px] truncate',
                              itemActive
                                ? 'text-[var(--accent)]'
                                : 'text-[var(--text-2)] group-hover:text-[var(--text)]'
                            )}
                          >
                            {doc.name}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div className={cn(isCollapsed ? 'hidden' : 'px-1 pt-2')}>
          <Link
            href="/playground"
            onClick={() => setIsSidebarOpen(false)}
            className="w-full flex items-center gap-2 px-2.5 py-2 font-pixel text-[11px] text-[var(--accent)] border border-[rgba(255,176,32,0.35)] bg-[rgba(255,176,32,0.08)] hover:bg-[rgba(255,176,32,0.14)] transition-colors"
          >
            <span>▸</span> Playground
          </Link>
        </div>
      </nav>

      {!isCollapsed && (
        <div className="mt-auto pt-4 border-t border-[var(--border)]">
          <div className="flex items-center justify-between text-[11px] text-[var(--text-3)] font-sans mb-2">
            <span>Search</span>
            <kbd className="bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-mono leading-none">
              /
            </kbd>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-3)] font-sans">
            <span>Clear / Close</span>
            <kbd className="bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-mono leading-none">
              esc
            </kbd>
          </div>
        </div>
      )}

      <button
        title={isCollapsed ? 'Expand' : 'Collapse'}
        onClick={() => {
          const newState = !isCollapsed;
          setIsCollapsed(newState);
          localStorage.setItem('retrochunk-sidebar-collapsed', String(newState));
        }}
        className={cn(
          'w-full py-2 text-center text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors border-t border-[var(--border)] mt-4',
          isCollapsed ? 'text-[16px]' : 'text-[12px]'
        )}
      >
        <span className="font-pixel">{isCollapsed ? '»' : '«'}</span>
      </button>
    </div>
  );

  const renderPreview = (doc: ComponentDoc) => {
    switch (doc.name) {
      case 'PixelButton':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3 p-4">
            <PixelButton variant="primary">Primary</PixelButton>
            <PixelButton variant="secondary">Secondary</PixelButton>
          </div>
        );
      case 'PixelCard':
        return (
          <div className="w-[160px]">
            <PixelCard className="p-4 flex flex-col items-center text-center">
              <span className="font-pixel text-[var(--text-3)] text-[10px] mb-2">SCORE</span>
              <span className="font-pixel text-[var(--accent)] text-xl">9999</span>
            </PixelCard>
          </div>
        );
      case 'PixelBadge':
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <PixelBadge variant="success">SUCCESS</PixelBadge>
            <PixelBadge variant="cool">INFO</PixelBadge>
            <PixelBadge variant="danger">DANGER</PixelBadge>
          </div>
        );
      case 'PixelWindow':
        return (
          <div className="w-[180px]">
            <PixelWindow title="sys.exe">
              <div className="p-3 text-center">
                <p className="font-pixel text-[10px] text-[var(--text)]">System ready.</p>
              </div>
            </PixelWindow>
          </div>
        );
      case 'PixelLoader':
        return (
          <div className="flex items-center justify-center h-full">
            <PixelLoader />
          </div>
        );
      case 'PixelCreature':
        return (
          <div className="flex items-center justify-center h-full scale-150">
            <PixelCreature size={6} base={MASCOT_BASE} palette={MASCOT_PALETTE} gridLines />
          </div>
        );
      case 'Mascot':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 group">
            <span className="font-pixel text-[10px] text-[var(--text-3)] group-hover:text-[var(--accent)] transition-colors">
              Hover / tap me
            </span>
            <div className="scale-125">
              <Mascot />
            </div>
          </div>
        );
      case 'PixelInput':
        return (
          <div className="w-full max-w-[200px]">
            <PixelInput label="PLAYER" placeholder="enter name..." />
          </div>
        );
      case 'PixelPersonality':
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <PixelPersonality name="bit" mood="working" size={5} />
            <span className="font-pixel text-[10px] text-[var(--text-3)]">Bit · working</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <span className="font-pixel text-xs text-[var(--text-3)]">Preview available</span>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:block sticky top-0 h-screen overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)] shrink-0 transition-all duration-200",
        isCollapsed ? "w-[50px] p-2" : "w-[210px] lg:w-[260px] p-[22px_20px]"
      )}>
        <SidebarContent isCollapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen w-[260px] bg-[var(--surface)] border-r border-[var(--border)] p-[22px_20px] z-50 transition-transform duration-300 ease-in-out md:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent isCollapsed={false} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative bg-[var(--bg)]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center h-14 bg-[rgba(12,13,16,0.85)] backdrop-blur-[8px] border-b border-[var(--border)] px-4 shrink-0">
          <button 
            className="md:hidden mr-3 p-1.5 text-[var(--text-2)] hover:text-[var(--text)]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex-1 flex items-center group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-3)] group-focus-within:text-[var(--accent)] transition-colors mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search components..."
              className="flex-1 bg-transparent border-none outline-none text-[14px] font-sans text-[var(--text)] placeholder-[var(--text-3)] w-full"
            />
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <kbd className="bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-3)] leading-none">/</kbd>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-8 sm:px-8 sm:py-10 md:p-[44px_32px_28px] border-b border-[var(--border)] shrink-0 bg-[var(--bg)]">
          <div className="max-w-4xl">
            <div className="font-pixel text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-4 sm:mb-6">
              RETROCHUNK · V0.1 · {componentDocs?.length || 0} COMPONENTS
            </div>
            <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[var(--text)] leading-relaxed mb-3 sm:mb-4 max-w-2xl">
              Pixel UI for React — <span className="text-[var(--accent)]">buttons to dashboards</span>, plus living mascots.
            </h2>
            <p className="font-sans text-[14px] sm:text-[15px] text-[var(--text-2)] mb-5 sm:mb-6 max-w-xl leading-relaxed">
              Browse live. Copy the code. Theme with CSS variables. Built to ship retro product UIs and
              living mascot personalities — not just creature packs.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="font-mono text-[11px] text-[var(--text-3)] bg-[var(--surface-2)] inline-block px-3 py-1.5 border border-[var(--border)] shadow-[4px_4px_0_0_var(--accent-ink)]">
                {componentDocs?.length || 0} components · {librarySections.length} sections · CSS vars
              </div>
              <Link
                href="/playground"
                className="font-pixel text-[11px] text-[var(--accent-ink)] bg-[var(--accent)] border-2 border-[var(--accent-ink)] px-3 py-1.5 shadow-[3px_3px_0_0_var(--accent-ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Open Playground
              </Link>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <section className="p-4 md:p-8 flex-1 bg-[var(--bg)]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 bg-[var(--accent)]" />
            <p className="font-pixel text-[11px] text-[var(--text-2)]">
              showing {filteredDocs.length} of {componentDocs?.length || 0}
            </p>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[var(--border)] bg-[var(--surface)]">
              <div className="font-pixel text-4xl mb-4 text-[var(--text-3)]">?</div>
              <p className="font-pixel text-sm text-[var(--text-2)]">No components found.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 font-pixel text-xs text-[var(--accent)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[14px]">
              {filteredDocs.map((doc) => (
                <div key={doc.name} className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] hover:border-[rgba(255,176,32,0.4)] transition-colors overflow-hidden">
                  
                  {/* Preview Area */}
                  <div className="relative w-full aspect-[4/3] bg-[#0f0f0f] border-b border-[var(--border)] flex items-center justify-center p-4 overflow-hidden">
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[var(--surface-2)] border border-[var(--border)] px-1.5 py-0.5 z-10">
                      <div className="w-1.5 h-1.5 bg-[var(--success)] animate-pulse" />
                      <span className="font-pixel text-[8px] text-[var(--text-2)]">LIVE</span>
                    </div>
                    {/* Pattern background overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--text) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                    <div className="relative z-0 w-full h-full flex items-center justify-center">
                      {renderPreview(doc)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-pixel text-[13px] text-[var(--text)]">{doc.name}</h3>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 border border-[var(--accent)] text-[var(--accent)] bg-[rgba(255,176,32,0.1)]">
                        {doc.category}
                      </span>
                    </div>
                    <p className="font-sans text-[12px] text-[var(--text-3)] line-clamp-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex border-t border-[var(--border)] bg-[var(--surface)]">
                    <Link 
                      href={`/docs/${doc.slug || doc.name.toLowerCase()}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-pixel text-[var(--text-2)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors border-r border-[var(--border)]"
                    >
                      <span>▸</span> Preview
                    </Link>
                    <button 
                      onClick={() => setCodeModalDoc(doc)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-pixel text-[var(--text-2)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <span>◧</span> View Code
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <CodeModal
        isOpen={!!codeModalDoc}
        onClose={() => setCodeModalDoc(null)}
        name={codeModalDoc?.name || ''}
        category={codeModalDoc?.category || ''}
        code={codeModalDoc?.code || ''}
      />
    </div>
  );
}
