'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { componentDocs, type ComponentDoc } from '@/lib/component-docs';
import { librarySections } from '@/lib/library-sections';
import { PixelButton, PixelCard, PixelBadge, PixelWindow, PixelInput, PixelToggle, PixelCheckbox, PixelRadioGroup, PixelSelect, PixelLoader, PixelDotsLoader, PixelBarLoader, PixelOrbitLoader, PixelStackLoader, PixelScanLoader, PixelSnakeLoader, PixelHourglassLoader, PixelGlitchLoader, PixelRingLoader, PixelEqualizerLoader, PixelPulseLoader, PixelDropLoader, PixelHelixLoader } from '@/components/ui';
import { HeroDotMorph, HeroDotSection, HeroPixel, TestimonialsPixel, DashboardPixel } from '@/components/blocks';
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
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
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
    setActiveGroup(null);
    setSearchQuery('');
  };

  const selectSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSlug(null);
    setActiveGroup(null);
    setIsSidebarOpen(false);
  };

  const selectGroup = (groupId: string, categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveGroup(groupId);
    setActiveSlug(null);
    setIsSidebarOpen(false);
  };

  const selectItem = (doc: ComponentDoc) => {
    setActiveCategory(doc.category);
    setActiveSlug(doc.slug);
    setActiveGroup(doc.group ?? null);
    setIsSidebarOpen(false);
    setExpandedSections(prev => { const next = new Set(prev); next.add(doc.category); return next; });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
    selectSection(sectionId);
  };

  const filteredDocs = useMemo(() => {
    return (
      componentDocs?.filter((doc) => {
        const matchesCategory = activeCategory ? doc.category === activeCategory : true;
        const matchesGroup = activeGroup ? doc.group === activeGroup : true;
        const matchesSlug = activeSlug ? doc.slug === activeSlug : true;
        // When a group is selected without a slug, show every card in that group
        const slugOk = activeSlug ? matchesSlug : true;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          doc.name.toLowerCase().includes(q) ||
          doc.description.toLowerCase().includes(q) ||
          doc.category.toLowerCase().includes(q) ||
          doc.slug.toLowerCase().includes(q) ||
          (doc.groupLabel?.toLowerCase().includes(q) ?? false);
        return matchesCategory && matchesGroup && slugOk && matchesSearch;
      }) || []
    );
  }, [activeCategory, activeSlug, activeGroup, searchQuery]);

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
          const isExpanded = expandedSections.has(section.id);
          const sectionActive = activeCategory === section.id;

          if (isCollapsed) {
            return (
              <div key={section.id} className="flex justify-center">
                <button
                  title={section.label}
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    'w-10 h-10 flex items-center justify-center transition-colors border border-[var(--border)]',
                    sectionActive
                      ? 'bg-[rgba(255,176,32,0.12)] border-[rgba(255,176,32,0.4)] text-[var(--accent)]'
                      : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  )}
                >
                  <span className="font-pixel text-[14px]">{section.icon}</span>
                </button>
              </div>
            );
          }

          const ungrouped = items.filter((d) => !d.group);
          const groups = new Map<string, { label: string; docs: ComponentDoc[] }>();
          for (const doc of items) {
            if (!doc.group) continue;
            const existing = groups.get(doc.group);
            if (existing) existing.docs.push(doc);
            else groups.set(doc.group, { label: doc.groupLabel || doc.group, docs: [doc] });
          }

          return (
            <div key={section.id}>
              {/* Section header — click to expand + filter */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-2.5 py-2 transition-colors group text-left',
                  sectionActive
                    ? 'text-[var(--accent)] hover:bg-[rgba(255,176,32,0.06)]'
                    : 'text-[var(--text-2)] hover:bg-[var(--surface-2)]'
                )}
              >
                <span className={cn(
                  'font-pixel text-[9px] leading-none shrink-0',
                  isExpanded ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                )}>
                  {isExpanded ? '▾' : '▸'}
                </span>
                <span className={cn(
                  'font-pixel text-[11px] flex-1 tracking-widest',
                  sectionActive ? 'text-[var(--accent)]' : 'group-hover:text-[var(--text)]'
                )}>
                  {section.label}
                </span>
                <span className={cn(
                  'font-mono text-[9px] shrink-0',
                  sectionActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                )}>
                  {items.length}
                </span>
              </button>

              {/* Expanded item list */}
              {isExpanded && (
                <ul className="mb-1 ml-3 border-l border-[var(--border)] pl-1.5 space-y-0.5">
                  {ungrouped.map((doc) => {
                    const itemActive = activeSlug === doc.slug;
                    return (
                      <li key={doc.slug}>
                        <button
                          type="button"
                          onClick={() => selectItem(doc)}
                          className={cn(
                            'w-full flex items-center gap-2 px-2 py-1.5 transition-colors text-left',
                            itemActive
                              ? 'bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                              : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                          )}
                        >
                          <span className="text-[8px] leading-none shrink-0">·</span>
                          <span className={cn('font-pixel text-[11px] truncate', itemActive ? 'text-[var(--accent)]' : '')}>
                            {doc.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}

                  {[...groups.entries()].map(([groupId, group]) => {
                    const groupSelected = activeGroup === groupId && !activeSlug;
                    return (
                      <li key={groupId} className="mt-1">
                        <button
                          type="button"
                          onClick={() => selectGroup(groupId, section.id)}
                          className={cn(
                            'w-full flex items-center justify-between px-2 py-1.5 transition-colors',
                            groupSelected
                              ? 'bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                              : 'text-[var(--text-2)] hover:bg-[var(--surface-2)]'
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="text-[8px]">▾</span>
                            <span className="font-pixel text-[11px]">{group.label}</span>
                          </span>
                          <span className="font-mono text-[9px] text-[var(--text-3)]">{group.docs.length}</span>
                        </button>
                        <ul className="mt-0.5 ml-2 border-l border-[var(--border)] pl-1 space-y-0.5">
                          {group.docs.map((doc) => {
                            const itemActive = activeSlug === doc.slug;
                            return (
                              <li key={doc.slug}>
                                <button
                                  type="button"
                                  onClick={() => selectItem(doc)}
                                  className={cn(
                                    'w-full flex items-center gap-2 px-2 py-1.5 transition-colors text-left',
                                    itemActive
                                      ? 'bg-[rgba(255,176,32,0.12)] text-[var(--accent)]'
                                      : 'text-[var(--text-3)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                                  )}
                                >
                                  <span className="text-[8px] shrink-0">·</span>
                                  <span className="font-pixel text-[11px] truncate">{doc.name}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              )}
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
      case 'PixelToggle':
        // Uncontrolled so the cards stay interactive without hooks in here
        return (
          <div className="flex flex-col items-start justify-center gap-3.5 p-4">
            <PixelToggle size="sm" label="SCANLINES" defaultChecked />
            <PixelToggle size="md" label="SOUND FX" />
            <PixelToggle size="lg" label="CRT MODE" defaultChecked />
          </div>
        );
      case 'PixelCheckbox':
        return (
          <div className="flex flex-col items-start justify-center gap-3 p-4">
            <PixelCheckbox label="SCANLINES" defaultChecked />
            <PixelCheckbox label="SOUND FX" />
            <PixelCheckbox label="LOCKED" disabled />
          </div>
        );
      case 'PixelRadioGroup':
        return (
          <div className="w-full max-w-[200px] px-4">
            <PixelRadioGroup
              label="DIFFICULTY"
              defaultValue="normal"
              options={[
                { value: 'easy', label: 'EASY' },
                { value: 'normal', label: 'NORMAL' },
                { value: 'hard', label: 'HARD' },
              ]}
            />
          </div>
        );
      case 'PixelSelect':
        return (
          <div className="w-full max-w-[210px]">
            <PixelSelect
              label="REGION"
              defaultValue="eu"
              options={[
                { value: 'na', label: 'North America' },
                { value: 'eu', label: 'Europe' },
                { value: 'jp', label: 'Japan' },
              ]}
            />
          </div>
        );
      case 'HeroDotMorph':
        // Negative inset bleeds through the p-6 padding of the preview stage
        return (
          <div style={{ position: 'absolute', inset: -24 }}>
            <HeroDotMorph />
          </div>
        );
      case 'HeroDotSection':
        return (
          <div style={{ position: 'absolute', inset: -24, backgroundColor: '#FAF8F5', overflow: 'hidden' }}>
            {/* Mini navbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid #E8E2DA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, backgroundColor: '#C8102E' }} />
                <span style={{ fontSize: 8, fontWeight: 800, color: '#18120F', letterSpacing: '-0.02em' }}>RetroChunk</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Features', 'Docs', 'Pricing'].map(l => (
                  <span key={l} style={{ fontSize: 7, color: '#9E9089' }}>{l}</span>
                ))}
              </div>
              <div style={{ backgroundColor: '#C8102E', padding: '2px 6px' }}>
                <span style={{ fontSize: 7, color: '#fff', fontWeight: 600 }}>Get started</span>
              </div>
            </div>
            {/* Mini hero body */}
            <div style={{ display: 'flex', height: 'calc(100% - 27px)', position: 'relative' }}>
              {/* Left text */}
              <div style={{ width: '54%', padding: '14px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#C8102E' }} />
                  <span style={{ fontSize: 6, color: '#9E9089', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Now in open beta</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#18120F', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
                  UI that<br />feels <span style={{ color: '#C8102E' }}>alive.</span>
                </div>
                <div style={{ fontSize: 7, color: '#7A6F65', lineHeight: 1.5, maxWidth: 90 }}>Canvas-powered React components.</div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 2 }}>
                  <div style={{ backgroundColor: '#C8102E', padding: '3px 8px' }}>
                    <span style={{ fontSize: 7, color: '#fff', fontWeight: 600 }}>Start free</span>
                  </div>
                  <span style={{ fontSize: 7, color: '#9E9089' }}>See all →</span>
                </div>
              </div>
              {/* Right: animation */}
              <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }}>
                <div style={{ position: 'absolute', inset: '-6%' }}>
                  <HeroDotMorph />
                </div>
              </div>
              {/* Gradient blend */}
              <div style={{ position: 'absolute', top: 0, height: '100%', left: '44%', width: '14%', background: 'linear-gradient(to right, #FAF8F5, transparent)', zIndex: 3, pointerEvents: 'none' }} />
            </div>
          </div>
        );
      case 'HeroPixel':
        return (
          <div className="flex flex-col items-start justify-center gap-3 w-full h-full px-2">
            <div className="font-pixel text-[9px] text-[var(--text-3)] uppercase tracking-widest">Hero Block</div>
            <div className="font-pixel text-[15px] leading-snug text-[var(--text)]">Build<br />Retro UIs</div>
            <div className="font-sans text-[10px] text-[var(--text-2)]">Pixel-art hero with mascot + CTAs.</div>
            <div className="flex gap-2 mt-1">
              <div className="px-2 py-1 text-[9px] font-pixel bg-[var(--accent)] text-[var(--accent-ink)] border-2 border-[var(--accent-ink)] shadow-[2px_2px_0_var(--accent-ink)]">GET STARTED</div>
              <div className="px-2 py-1 text-[9px] font-pixel border-2 border-[var(--border)] text-[var(--text-2)]">GITHUB</div>
            </div>
          </div>
        );
      case 'TestimonialsPixel':
        return (
          <div className="flex flex-col gap-2 w-full h-full justify-center px-1">
            {[
              { name: 'ALEX.JS', role: 'Frontend Dev', text: 'This UI library brings nostalgic joy!' },
              { name: 'PIXEL.DEV', role: 'Game Dev', text: 'Components are super easy to use.' },
            ].map((t) => (
              <div key={t.name} className="border border-[var(--border)] bg-[var(--surface-2)] p-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 bg-[var(--accent)] shrink-0" />
                  <div>
                    <div className="font-pixel text-[8px] text-[var(--accent)]">{t.name}</div>
                    <div className="font-mono text-[7px] text-[var(--text-3)]">{t.role}</div>
                  </div>
                </div>
                <p className="font-sans text-[9px] text-[var(--text-2)] leading-tight">{t.text}</p>
              </div>
            ))}
          </div>
        );
      case 'DashboardPixel':
        return (
          <div className="flex flex-col gap-2 w-full h-full justify-center">
            <div className="font-pixel text-[9px] text-[var(--accent)] mb-1">ADMIN_PANEL</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ label: 'USERS', val: '1,337', up: true }, { label: 'REVENUE', val: '9,001', up: true }, { label: 'ERRORS', val: '404', up: false }, { label: 'SESSIONS', val: '8,192', up: true }].map(s => (
                <div key={s.label} className="border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1.5">
                  <div className="font-pixel text-[7px] text-[var(--text-3)] mb-0.5">{s.label}</div>
                  <div className="font-pixel text-[11px] text-[var(--text)]">{s.val}</div>
                  <div className={`font-mono text-[7px] ${s.up ? 'text-[var(--success)]' : 'text-[var(--danger,#ef4444)]'}`}>{s.up ? '+' : ''}12%</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Bit':
        return (
          <div className="flex flex-col items-center justify-center gap-3 scale-125">
            <PixelPersonality name="bit" mood="working" size={7} />
            <span className="font-pixel text-[10px] text-[var(--text-3)]">Bit · working</span>
          </div>
        );
      default:
        if (doc.loader) {
          const loaders = {
            grid: <PixelLoader size="md" />,
            dots: <PixelDotsLoader size="md" />,
            bar: <PixelBarLoader size="md" />,
            orbit: <PixelOrbitLoader size="md" />,
            stack: <PixelStackLoader size="md" />,
            scan: <PixelScanLoader size="md" />,
            snake: <PixelSnakeLoader size="md" />,
            hourglass: <PixelHourglassLoader size="md" />,
            glitch: <PixelGlitchLoader size="md" />,
            ring: <PixelRingLoader size="md" />,
            equalizer: <PixelEqualizerLoader size="md" />,
            pulse: <PixelPulseLoader size="md" />,
            drop: <PixelDropLoader size="md" />,
            helix: <PixelHelixLoader size="md" />,
          } as const;
          const node = loaders[doc.loader as keyof typeof loaders] ?? <PixelLoader />;
          return (
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full min-h-[120px]">
              {node}
            </div>
          );
        }
        if (doc.personality && doc.mood) {
          return (
            <div className="flex flex-col items-center justify-center gap-3 scale-125">
              <PixelPersonality
                name={doc.personality}
                mood={doc.mood as 'idle' | 'working' | 'think' | 'celebrate' | 'error' | 'wave' | 'flex' | 'dash'}
                size={7}
              />
              <span className="font-pixel text-[10px] text-[var(--text-3)]">{doc.name}</span>
            </div>
          );
        }
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
        <section className="relative px-4 py-8 sm:px-8 sm:py-10 md:p-[44px_32px_28px] border-b border-[var(--border)] shrink-0 bg-[var(--bg)] pixel-grid overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
          <div className="relative max-w-4xl">
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
                <div
                  key={doc.name}
                  className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-border)] hover:shadow-[4px_4px_0_var(--accent-soft)] transition-all duration-200 overflow-hidden"
                >
                  
                  {/* Preview Area */}
                  <div className="preview-stage relative w-full aspect-[4/3] border-b border-[var(--border)] flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[var(--surface)]/90 border border-[var(--border)] px-1.5 py-0.5 z-10 backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 bg-[var(--success)] animate-pulse" />
                      <span className="font-pixel text-[8px] text-[var(--text-2)]">LIVE</span>
                    </div>
                    <div className="relative z-[1] w-full h-full flex items-center justify-center">
                      {renderPreview(doc)}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-pixel text-[13px] text-[var(--text)]">{doc.name}</h3>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 border border-[var(--accent)] text-[var(--accent)] bg-[rgba(255,176,32,0.1)]">
                        {doc.groupLabel || doc.category}
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
                      onClick={() => {
                        setCodeModalDoc(doc);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-pixel text-[var(--text-2)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors border-r border-[var(--border)]"
                    >
                      <span>◧</span> View Code
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(doc.code).then(() => {
                          toast(`Copied ${doc.name}`);
                        });
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-pixel text-[var(--text-2)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <span>▣</span> Copy
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
