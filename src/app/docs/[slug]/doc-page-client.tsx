"use client";

import Link from "next/link";
import type { ComponentDoc } from "@/lib/component-docs";
import { CodeBlock } from "@/components/ui/code-block";
import { PixelButton, PixelBadge, PixelCard, PixelWindow, PixelLoader, PixelInput } from "@/components/ui";
import { Mascot, PixelCreature, PixelPersonality, MASCOT_PALETTE, MASCOT_BASE, MASCOT_FRAMES } from "@/components/mascot";

function ComponentPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "pixel-button":
      return (
        <div className="flex flex-wrap gap-4 items-center">
          <PixelButton variant="primary">Primary</PixelButton>
          <PixelButton variant="secondary">Secondary</PixelButton>
          <PixelButton variant="ghost">Ghost</PixelButton>
          <PixelButton variant="danger">Danger</PixelButton>
          <PixelButton variant="primary" size="sm">Small</PixelButton>
          <PixelButton variant="primary" size="lg">Large</PixelButton>
          <PixelButton variant="primary" disabled>Disabled</PixelButton>
        </div>
      );
    case "pixel-card":
      return (
        <div className="flex flex-wrap gap-6">
          <PixelCard className="w-56">
            <h4
              className="text-sm mb-2"
              style={{ fontFamily: "var(--font-pixel)", color: "var(--accent)" }}
            >
              Basic Card
            </h4>
            <p className="text-sm" style={{ color: "var(--text-2)" }}>
              A simple pixel card with hard shadow.
            </p>
          </PixelCard>
          <PixelCard notch hover className="w-56">
            <h4
              className="text-sm mb-2"
              style={{ fontFamily: "var(--font-pixel)", color: "var(--cool)" }}
            >
              Notched Card
            </h4>
            <p className="text-sm" style={{ color: "var(--text-2)" }}>
              Corner notches + hover lift.
            </p>
          </PixelCard>
        </div>
      );
    case "pixel-badge":
      return (
        <div className="flex flex-wrap gap-3 items-center">
          <PixelBadge>Default</PixelBadge>
          <PixelBadge variant="cool">Info</PixelBadge>
          <PixelBadge variant="success" dot>Online</PixelBadge>
          <PixelBadge variant="danger">Error</PixelBadge>
          <PixelBadge variant="outline">Outline</PixelBadge>
        </div>
      );
    case "pixel-window":
      return (
        <div className="flex flex-col gap-4 max-w-lg">
          <PixelWindow title="pixel_editor.exe">
            <p className="text-sm" style={{ color: "var(--text-2)" }}>
              A retro OS window with title bar and control dots.
            </p>
          </PixelWindow>
          <PixelWindow title="compact.txt" compact>
            <p className="text-sm" style={{ color: "var(--text-2)" }}>
              Compact variant with less padding.
            </p>
          </PixelWindow>
        </div>
      );
    case "pixel-loader":
      return (
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <PixelLoader size="sm" />
            <p className="mt-2 text-xs" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>SM</p>
          </div>
          <div className="text-center">
            <PixelLoader size="md" />
            <p className="mt-2 text-xs" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>MD</p>
          </div>
          <div className="text-center">
            <PixelLoader size="lg" />
            <p className="mt-2 text-xs" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>LG</p>
          </div>
        </div>
      );
    case "pixel-creature":
      return (
        <div className="flex gap-6 items-end">
          <div>
            <PixelCreature base={MASCOT_BASE} palette={MASCOT_PALETTE} size={6} />
            <p className="mt-2 text-xs text-center" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>6px</p>
          </div>
          <div>
            <PixelCreature base={MASCOT_BASE} palette={MASCOT_PALETTE} size={8} gridLines />
            <p className="mt-2 text-xs text-center" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>8px + grid</p>
          </div>
          <div>
            <PixelCreature base={MASCOT_BASE} palette={MASCOT_PALETTE} frames={MASCOT_FRAMES.idle} size={10} />
            <p className="mt-2 text-xs text-center" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>10px anim</p>
          </div>
        </div>
      );
    case "mascot":
      return (
        <div className="flex gap-8 items-end">
          <div className="text-center">
            <Mascot animation="idle" size={8} />
            <p className="mt-2 text-xs" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>Idle</p>
          </div>
          <div className="text-center">
            <Mascot animation="celebrate" size={10} />
            <p className="mt-2 text-xs" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>Celebrate</p>
          </div>
        </div>
      );
    case "pixel-input":
      return (
        <div className="flex flex-col gap-4 max-w-sm w-full">
          <PixelInput label="PLAYER" placeholder="enter name..." />
          <PixelInput label="EMAIL" hint="We never share this." defaultValue="you@arcade.dev" />
          <PixelInput label="CODE" error="Invalid invite code." defaultValue="XXXX" />
        </div>
      );
    case "pixel-personality":
    case "bit":
      return (
        <div className="flex flex-wrap gap-8 items-end justify-center">
          {(["idle", "working", "think", "celebrate", "error"] as const).map((mood) => (
            <div key={mood} className="text-center">
              <PixelPersonality name="bit" mood={mood} size={6} />
              <p className="mt-3 text-xs uppercase" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>
                {mood}
              </p>
            </div>
          ))}
        </div>
      );
    case "volt":
      return (
        <div className="flex flex-wrap gap-6 items-end justify-center">
          {(["idle", "wave", "working", "think", "dash", "flex", "celebrate", "error"] as const).map((mood) => (
            <div key={mood} className="text-center">
              <PixelPersonality name="volt" mood={mood} size={5} />
              <p className="mt-3 text-xs uppercase" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>
                {mood}
              </p>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center p-8">
          <p className="text-sm" style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}>
            Preview coming soon...
          </p>
        </div>
      );
  }
}

export function DocPageClient({ doc }: { doc: ComponentDoc }) {
  const categoryColors: Record<string, string> = {
    primitive: "var(--accent)",
    mascot: "var(--cool)",
    block: "var(--success)",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 border-b-2 border-[var(--border)] px-6 py-3"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--accent)" }}
          >
            ← RETROCHUNK
          </Link>
          <span
            className="text-xs uppercase"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}
          >
            docs / {doc.slug}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "var(--font-pixel)", color: "var(--text)" }}
            >
              {doc.name}
            </h1>
            <PixelBadge
              variant={doc.category === "primitive" ? "default" : doc.category === "mascot" ? "cool" : "success"}
            >
              {doc.category}
            </PixelBadge>
          </div>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-2)" }}>
            {doc.description}
          </p>
        </div>

        {/* Live Preview */}
        <div className="mb-10">
          <h2
            className="text-sm mb-4 uppercase"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}
          >
            Live Preview
          </h2>
          <PixelWindow title={`${doc.slug}_preview.tsx`}>
            <div className="py-4">
              <ComponentPreview slug={doc.slug} />
            </div>
          </PixelWindow>
        </div>

        {/* Code Example */}
        <div className="mb-10">
          <h2
            className="text-sm mb-4 uppercase"
            style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}
          >
            Usage
          </h2>
          <CodeBlock code={doc.code} />
        </div>

        {/* Props Table */}
        {doc.props.length > 0 && (
          <div className="mb-10">
            <h2
              className="text-sm mb-4 uppercase"
              style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}
            >
              Props
            </h2>
            <div
              className="border-2 border-[var(--border)] overflow-hidden"
              style={{ boxShadow: "4px 4px 0 var(--shadow-hard)" }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--surface-2)" }}>
                    {["Prop", "Type", "Default", "Description"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs px-4 py-3 border-b-2 border-[var(--border)]"
                        style={{ fontFamily: "var(--font-pixel)", color: "var(--text-3)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop) => (
                    <tr
                      key={prop.name}
                      className="border-b border-[var(--border)] last:border-b-0"
                      style={{ backgroundColor: "var(--surface)" }}
                    >
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                      >
                        {prop.name}
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--cool)" }}
                      >
                        {prop.type}
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-3)" }}
                      >
                        {prop.default ?? "—"}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "var(--text-2)" }}
                      >
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
