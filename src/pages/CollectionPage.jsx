import { useState } from "react";
import { User, Globe, List, Grid3x3, Pin, PinOff } from "lucide-react";
import GlowNav from "../effects/GlowNav.jsx";

export default function CollectionPage({ section, view, setView, fx, initialFilter, nowPlaying, onPlay }) {
  const [filter, setFilter] = useState(initialFilter || "all");

  if (!section) return null;

  const hasGroups = Array.isArray(section.groups);
  // When it has groups, keep each group as its own labeled block (like "♡ Lagu Favorit  6 lagu"),
  // just hide/show whole blocks based on the filter instead of flattening everything into one grid.
  const blocks = hasGroups
    ? section.groups.filter((g) => filter === "all" || filter === g.tag)
    : [{ tag: section.id, label: section.title, icon: section.icon, items: section.items }];

  return (
    <>
      <section className="px-4 sm:px-6 md:px-10 pt-10">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="mm-lib-icon"><section.icon size={30} /></div>
          <div>
            <span className="mm-eyebrow">Koleksi</span>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl md:text-5xl font-semibold italic leading-tight">{section.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm mm-muted">
              <span><User size={11} className="inline -mt-0.5 mr-1" />zoe.kumori</span>
              <span>•</span><span>{section.count}</span><span>•</span><span>Diperbarui 2026</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mm-filterbar sticky mt-8 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 md:px-10 py-3">
        {hasGroups && (
          <GlowNav
            items={[{ id: "all", label: "Semua", icon: Globe }, ...section.groups.map((g) => ({ id: g.tag, label: g.label, icon: g.icon }))]}
            active={filter}
            onSelect={setFilter}
            enabled={fx?.glowTabs}
          />
        )}
        <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="mm-icon-btn ml-auto">
          {view === "grid" ? <List size={13} /> : <Grid3x3 size={13} />}
        </button>
      </div>

      {blocks.map((b) => (
        <section key={b.tag} className="px-4 sm:px-6 md:px-10 py-10">
          <div className="mb-5 flex items-baseline gap-3">
            <h2 className={`flex items-center gap-2 font-display text-xl font-semibold mm-${section.color}-text`}>
              <b.icon size={16} /> <span className="mm-ink-text">{b.label}</span>
            </h2>
            <span className="mm-eyebrow-mono">{b.items.length} item</span>
          </div>
          <div className={`grid gap-6 ${view === "list" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {b.items.map((it) => {
              const isPinned = nowPlaying?.kind === it.kind && nowPlaying?.id === it.id;
              return (
                <div key={it.id} className="mm-item group relative animate-fadeUp">
                  <div className={`mm-tab mm-${section.color}-bg`}>{it.num}</div>
                  <button
                    className={`mm-pin-btn ${isPinned ? "active" : ""}`}
                    onClick={() => onPlay?.(isPinned ? null : { kind: it.kind, id: it.id })}
                    title={isPinned ? "Lepas dari player bawah" : "Putar & tetap lanjut walau pindah halaman"}
                  >
                    {isPinned ? <PinOff size={12} /> : <Pin size={12} />}
                  </button>
                  <div className="mm-item-inner">
                    <iframe
                      title={`${b.label}-${it.num}`}
                      src={`https://open.spotify.com/embed/${it.kind}/${it.id}?utm_source=generator&theme=0`}
                      width="100%" height={view === "list" ? 152 : it.kind === "track" ? 352 : 380}
                      style={{ borderRadius: 12, border: "none", display: "block" }}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
