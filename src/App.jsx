import { useState, useEffect, useRef } from "react";
import {
  Home, Heart, ListMusic, User, Disc3, Grid3x3, List,
  Moon, Sun, ChevronLeft, ChevronRight, ArrowUp, Play, Star,
  Crown, Flame, TrendingUp, Sparkles, Music2, Globe, Shuffle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — same Spotify embeds as the original site                    */
/* ------------------------------------------------------------------ */
const favoriteSongs = [
  "6J3pPfXLujwsWQpvR6XMgC", "1H2pPtoPS8kNlqCN7HfT6g", "7aux5UvnlBDYlrlwoczifW",
  "4e5kaIUjbskvGhpSXZdiA6", "0W0LK0oJEAU2cdYytd27gC", "2DMlu3yzDZkUXXBu8YpkkD",
  "6btL0nv4NlzIGHHQnGDlp5", "5wEy787VwmAnA7GGhEzjHR", "5oEoZdIrz0izZwqFCy6gDa",
  "4F2NudCv50tC2Bqc3dgn9v", "3fao1RoZVQPtkHY8upjezr", "0p5JKxO0pVynWVcWm3lMiP",
  "30C4LSxZHCWNtUjnZUxEoJ", "6W3beEMj18hHp1wDlqGcbt", "5jmPdv7WGoWm5KeRM1WIAf",
  "0QLoW4AZWUxHE1DfMmBwKz", "0OgBVLavb1pwjCQRvQCF30", "3JrQWFks5GS2rqorGYkkTD",
  "22sQUmLhT8umlEhQzDrzfJ", "5ZBs9dRavxKAS23WT1MwkQ", "3KLHSYHSmny4sJo2finqy9",
  "1AMzUKhF0vCFHZTx8H7OS4", "5pZVsZ8TOGly1KnYFmZ61B", "6zoNHckACUOGj2bERXgmnw",
  "0H1iMm1pO61srixV0rGYRe", "5dp3vri4d2JjeBsGriLFyW", "5ZNlX18DvNikcGOsAfoJbR",
  "3szBjRBhnc5Y645SQuvz22",
].map((id, i) => ({ id, kind: "track", tag: "favorite", num: String(i + 1).padStart(2, "0") }));

const topSongs = [
  "37i9dQZEVXbObFQZ3JLcXt", "37i9dQZEVXbIZK8aUquyx8", "37i9dQZEVXbMDoHDwVN2tF", 
  "37i9dQZEVXbNG2KDcFcKOF",
].map((id, i) => ({ id, kind: "playlist", tag: "top", num: String(i + 1).padStart(2, "0") }));

const myPlaylists = ["53uX01Hogg89i23FEtJypM", "0uvAH64BPhj5viiLpb8gu6"]
  .map((id, i) => ({ id, kind: "playlist", tag: "playlist", num: String(i + 1).padStart(2, "0") }));

const myArtists = ["6pNgnvzBa6Bthsv8SrZJYl", "4JX0GdKx8EduY2Ck7qac4H", "64tJ2EAv1R6UaZqc4iOCyj"]
  .map((id, i) => ({ id, kind: "artist", tag: "artist", num: String(i + 1).padStart(2, "0") }));

// TODO: ganti 2 ID placeholder di bawah dengan album ID Spotify kamu
// (buka album di Spotify -> ... -> Share -> Copy Spotify URI, ambil bagian setelah "album:")
const myAlbums = [
  "1xhO0GSoezdPJcSuNe1ySv",
  "5uStDUB4nlmItpz2AYlFtd",
  "68w73FF3dYC6C3RWdcV0Yl",
  "6wBkzKouHawAr9e7lLxZLA",
].map((id, i) => ({ id, kind: "album", tag: "album", num: String(i + 1).padStart(2, "0") }));

// TODO: ganti 6 ID placeholder di bawah dengan playlist ID Daily Mix kamu
// (klik ... pada tiap Daily Mix di Spotify -> Share -> Copy Spotify URI, ambil bagian setelah "playlist:")
const dailyMix = [
  "37i9dQZF1E37kjQBQCXm3z",
  "37i9dQZF1E354IJFXAhPL0",
  "37i9dQZF1E38sqpLFmypob",
  "37i9dQZF1E36PuovqOPSxU",
  "37i9dQZF1E3ahZ68dvHDya",
  "37i9dQZF1E37VYMVdWXoVx",
].map((id, i) => ({ id, kind: "playlist", tag: "dailymix", num: String(i + 1).padStart(2, "0") }));

/* ------------------------------------------------------------------ */
/*  Theme tokens — Hatsune Miku palette                                */
/* ------------------------------------------------------------------ */
const themes = {
  dark: {
    bg: "#0A1820", surface: "#0F2731", surface2: "#153542", border: "#1F4B57",
    borderStrong: "#2E6672", text: "#EAFBFC", muted: "#82ADB4",
    accent: "#39C5BB", accent2: "#7CF0E6", spark: "#FF9ED2", amber: "#FFC15E", espresso: "#04141B",
  },
  light: {
    bg: "#EFFBFB", surface: "#FFFFFF", surface2: "#DEF3F2", border: "#BFE7E5",
    borderStrong: "#8FD4D0", text: "#07262C", muted: "#4C7A80",
    accent: "#0EA99D", accent2: "#0C8B94", spark: "#E85CA6", amber: "#E29A2E", espresso: "#FFFFFF",
  },
};

/* ------------------------------------------------------------------ */
export default function MikuMusic() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("list");
  const [showTop, setShowTop] = useState(false);
  const mainRef = useRef(null);
  const T = themes[theme];

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setShowTop(el.scrollTop > 420);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [page]);

  const sections = [
    { id: "favorite-songs", title: "Lagu Favorit", icon: Heart, color: "berry", items: favoriteSongs, count: `${favoriteSongs.length} lagu` },
    {
      id: "playlist-hub", title: "Playlist", icon: ListMusic, color: "accent",
      groups: [
        { tag: "top", label: "Top", icon: TrendingUp, items: topSongs },
        { tag: "dailymix", label: "Daily", icon: Shuffle, items: dailyMix },
        { tag: "playlist", label: "Playlist", icon: ListMusic, items: myPlaylists },
      ],
      count: `${topSongs.length + dailyMix.length + myPlaylists.length} item`,
    },
    {
      id: "artist-album-hub", title: "Artis & Album", icon: User, color: "spark",
      groups: [
        { tag: "artist", label: "Artis", icon: User, items: myArtists },
        { tag: "album", label: "Album", icon: Disc3, items: myAlbums },
      ],
      count: `${myArtists.length + myAlbums.length} item`,
    },
  ];

  return (
    <div
      style={{
        "--bg": T.bg, "--surface": T.surface, "--surface2": T.surface2, "--border": T.border,
        "--borderStrong": T.borderStrong, "--text": T.text, "--muted": T.muted, "--accent": T.accent,
        "--accent2": T.accent2, "--berry": T.spark, "--amber": T.amber, "--espresso": T.espresso,
        background: "var(--bg)", color: "var(--text)", minHeight: "100vh", position: "relative",
        fontFamily: "'Work Sans', ui-sans-serif, sans-serif", overflow: "hidden",
      }}
      className="mm-root"
    >
      <Style />
      <FloatingNotes />
      <MikuStickers />

      <div className="flex h-screen">
        {/* ---------------- Sidebar ---------------- */}
        <aside className="mm-sidebar flex w-60 shrink-0 flex-col justify-between px-6 py-7">
          <div>
            <div className="mb-8 flex items-center gap-2.5">
              <div className="mm-logo-badge flex h-8 w-8 items-center justify-center rounded-full">
                <Disc3 size={17} strokeWidth={2.2} />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">Zoe Libraly</span>
              <span className="mm-cv01" title="Character Vocal Series 01 ✨">CV01</span>
            </div>

            <nav className="mb-8 flex flex-col gap-1">
              <button onClick={() => setPage("home")} className={`mm-nav-item ${page === "home" ? "active" : ""}`}>
                <Home size={15} /> <span>Home</span>
              </button>
            </nav>

            <h3 className="mm-eyebrow mb-2">Koleksi</h3>
            <nav className="mb-8 flex flex-col gap-1">
              {sections.map((s) => (
                <button key={s.id} onClick={() => setPage(s.id)} className={`mm-nav-item ${page === s.id ? "active" : ""}`}>
                  <s.icon size={15} /> <span>{s.title}</span>
                </button>
              ))}
            </nav>

            {page === "home" && (
              <div className="mb-6 animate-fadeUp">
                <h3 className="mm-eyebrow mb-2">Tautan Cepat</h3>
                <a href="#featured" className="mm-link"><Star size={13} /> <span>Unggulan</span></a>
                <a href="#stats" className="mm-link"><TrendingUp size={13} /> <span>Statistik</span></a>
              </div>
            )}

            <div className="mm-lang">
              <Globe size={13} className="opacity-70" />
              <span>🇮🇩</span>
              <span>Indonesia</span>
            </div>
          </div>

          <div className="mm-sidebar-footer pt-4">
            <div className="flex items-center gap-3">
              <div className="mm-avatar">ZK</div>
              <div className="leading-tight">
                <div className="text-sm font-medium">Zoe Kumori</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ---------------- Main ---------------- */}
        <main ref={mainRef} className="mm-main relative flex-1 overflow-y-auto">
          <header className="mm-topbar flex items-center justify-between px-10 py-4">
            <div className="flex gap-2">
              <button className="mm-icon-btn"><ChevronLeft size={13} /></button>
              <button className="mm-icon-btn"><ChevronRight size={13} /></button>
            </div>
            <button className="mm-icon-btn mm-theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Ganti tema">
              {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </header>

          {page === "home" ? (
            <HomePage T={T} setPage={setPage} />
          ) : (
            <CollectionPage
              key={page}
              section={sections.find((s) => s.id === page)}
              view={view} setView={setView}
            />
          )}

          <footer className="mm-footer flex flex-col items-start justify-between gap-4 px-10 py-8 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 font-display text-base font-semibold">
                <Disc3 size={15} className="mm-accent-text" /> <span>Zoe Libraly</span>
              </div>
              <p className="mt-1 text-xs mm-muted">© 2026 Zoe Libraly · dibuat dengan 💙 untuk Miku</p>
            </div>
            <div className="flex gap-5 text-xs mm-muted">
              <a href="#" className="hover:opacity-80">About</a>
              <a href="#" className="hover:opacity-80">Privacy</a>
              <a href="#" className="hover:opacity-80">Terms</a>
              <a href="#" className="hover:opacity-80">Contact</a>
            </div>
          </footer>

          <button
            onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className={`mm-scrolltop ${showTop ? "show" : ""}`}
          >
            <ArrowUp size={15} />
          </button>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function HomePage({ setPage }) {
  const stats = [
    { icon: ListMusic, num: "2+", label: "Playlist", c: "accent" },
    { icon: User, num: "2+", label: "Artis", c: "accent2" },
    { icon: TrendingUp, num: "6", label: "Chart Teratas", c: "berry" },
    { icon: Heart, num: "100+", label: "Lagu Favorit", c: "accent" },
  ];
  const featured = [
    { icon: Flame, title: "Top Hits", desc: "Chart dunia teratas", c: "accent", img: "cover-top-hits.jpg" },
    { icon: Heart, title: "Favorit Saya", desc: "Kumpulan lagu tersayang", c: "berry", img: "cover-favorit-saya.jpg" },
    { icon: Sparkles, title: "Vocaloid Vibes", desc: "PoPiPo & kawan-kawan", c: "accent2", img: "cover-vocaloid-vibes.jpg" },
  ];
  return (
    <>
      <section className="relative overflow-hidden px-10 pt-16 pb-24">
        <Equalizer />
        <div className="relative z-10 max-w-2xl animate-fadeUp">
          <div className="mm-badge mb-5">
            <Crown size={12} /> <span>Koleksi Premium</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold italic leading-[1.12] tracking-tight">
            Selamat Datang di<br />Semesta Musik Saya
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed mm-muted">
            Jelajahi playlist pilihan Zoe Libraly, chart teratas, dan artis favorit — ditemani nuansa biru toska ala Hatsune Miku. 🎵
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setPage("favorite-songs")} className="mm-btn-primary">
              <Play size={12} /> Jelajahi Koleksi
            </button>
            <a href="#featured" className="mm-btn-secondary">
              <Star size={12} /> Lihat Unggulan
            </a>
          </div>
        </div>
      </section>

      <section id="stats" className="grid grid-cols-2 gap-4 px-10 pb-4 pt-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="mm-card p-5 mm-hover-lift" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`mm-stat-icon mm-${s.c}-soft mb-3`}><s.icon size={15} /></div>
            <div className="font-display text-2xl font-semibold">{s.num}</div>
            <div className="text-xs mm-muted">{s.label}</div>
          </div>
        ))}
      </section>

      <section id="featured" className="px-10 py-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold">Koleksi Unggulan</h2>
          <p className="mt-1 text-sm mm-muted">Playlist pilihan khusus untukmu</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((f, i) => (
            <div key={i} className={`mm-featured-card mm-hover-lift mm-featured-${f.c}`} onClick={() => setPage("favorite-songs")}>
              <img
                src={`/assets/${f.img}`}
                alt=""
                className="mm-featured-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="mm-featured-scrim" />
              <div className="mm-featured-icon"><f.icon size={15} /></div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm mm-muted">{f.desc}</p>
              <div className="mm-featured-play"><Play size={12} /></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
function CollectionPage({ section, view, setView }) {
  const [filter, setFilter] = useState("all");
  if (!section) return null;

  const hasGroups = Array.isArray(section.groups);
  // When it has groups, keep each group as its own labeled block (like "♡ Lagu Favorit  6 lagu"),
  // just hide/show whole blocks based on the filter instead of flattening everything into one grid.
  const blocks = hasGroups
    ? section.groups.filter((g) => filter === "all" || filter === g.tag)
    : [{ tag: section.id, label: section.title, icon: section.icon, items: section.items }];

  return (
    <>
      <section className="px-10 pt-10">
        <div className="flex items-center gap-6">
          <div className="mm-lib-icon"><section.icon size={30} /></div>
          <div>
            <span className="mm-eyebrow">Koleksi</span>
            <h1 className="mt-1 font-display text-4xl md:text-5xl font-semibold italic leading-tight">{section.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm mm-muted">
              <span><User size={11} className="inline -mt-0.5 mr-1" />zyren.in.calm</span>
              <span>•</span><span>{section.count}</span><span>•</span><span>Diperbarui 2026</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mm-filterbar sticky top-0 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 px-10 py-3">
        <div className="flex flex-wrap gap-2">
          {hasGroups && (
            <>
              <button onClick={() => setFilter("all")} className={`mm-filter-btn ${filter === "all" ? "active" : ""}`}>
                <Globe size={11} /> <span>Semua</span>
              </button>
              {section.groups.map((g) => (
                <button key={g.tag} onClick={() => setFilter(g.tag)} className={`mm-filter-btn ${filter === g.tag ? "active" : ""}`}>
                  <g.icon size={11} /> <span>{g.label}</span>
                </button>
              ))}
            </>
          )}
        </div>
        <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="mm-icon-btn">
          {view === "grid" ? <List size={13} /> : <Grid3x3 size={13} />}
        </button>
      </div>

      {blocks.map((b) => (
        <section key={b.tag} className="px-10 py-10">
          <div className="mb-5 flex items-baseline gap-3">
            <h2 className={`flex items-center gap-2 font-display text-xl font-semibold mm-${section.color}-text`}>
              <b.icon size={16} /> <span className="mm-ink-text">{b.label}</span>
            </h2>
            <span className="mm-eyebrow-mono">{b.items.length} item</span>
          </div>
          <div className={`grid gap-6 ${view === "list" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {b.items.map((it) => (
              <div key={it.id} className="mm-item group relative animate-fadeUp">
                <div className={`mm-tab mm-${section.color}-bg`}>{it.num}</div>
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
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
function Equalizer() {
  const bars = Array.from({ length: 24 });
  return (
    <div className="mm-eq pointer-events-none absolute" style={{ left: "8%", right: "4%", top: "14%", bottom: "18%" }}>
      {bars.map((_, i) => (
        <span key={i} className="mm-eq-bar" style={{ animationDelay: `${(i % 7) * 0.13}s`, left: `${(i / bars.length) * 100}%` }} />
      ))}
    </div>
  );
}

/*
  MikuStickers — scattered decorative slots for YOUR OWN sticker files.
  Save your cropped PNGs into /public/assets using the names below (matched
  to each pose's mood/size), then swap the placeholder <div> content for:
    <img src={`/assets/${s.file}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
*/
const stickerSlots = [
  // hearts + leek — most "iconic" pose, gets prime real-estate near the hero title
  { file: "miku-hearts-leek.png", top: "5%",  left: "68%", size: 130, rot: -6 },
  // shy / teary close-up — small, peeking near a section header
  { file: "miku-shy.png",          top: "20%", left: "90%", size: 85,  rot: 9 },
  // eating lemon — playful, tucked low near the stat cards
  { file: "miku-lemon.png",        top: "44%", left: "6%",  size: 100, rot: 8 },
  // hugging plush — cozy, sits mid-page near the featured section
  { file: "miku-hug-plush.png",    top: "58%", left: "78%", size: 115, rot: -10 },
  // covering face, big floppy twintails — the biggest/boldest one, anchors lower area
  { file: "miku-shy-bigpose.png",  top: "76%", left: "32%", size: 145, rot: 6 },
  // sleepy sitting pose — relaxed, good near the footer
  { file: "miku-sleepy.png",       top: "93%", left: "84%", size: 100, rot: -7 },
];

function MikuStickers() {
  return (
    <div className="mm-sticker-layer">
      {stickerSlots.map((s, i) => (
        <div
          key={i}
          className={`mm-sticker-slot mm-drift-${(i % 4) + 1}`}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          title={`Ganti dengan ${s.file}`}
        >
          <img
            src={`/assets/${s.file}`}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain", transform: `rotate(${s.rot}deg)` }}
          />
        </div>
      ))}
    </div>
  );
}

function FloatingNotes() {
  const notes = ["♪", "♫", "🥬", "♪", "✨", "♫"];
  return (
    <div className="mm-notes pointer-events-none fixed inset-0 z-0">
      {notes.map((n, i) => (
        <span key={i} className={`mm-note mm-note-${i}`}>{n}</span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Style() {
  return (
    <style>{`
      .mm-root, .mm-root * { box-sizing: border-box; }
      .mm-root { --radius: 18px; }
      .mm-muted { color: var(--muted); }
      .mm-accent-text { color: var(--accent); }
      .mm-ink-text { color: var(--text); }
      .mm-berry-text { color: var(--berry); }
      .mm-accent2-text { color: var(--accent2); }
      .mm-spark-text { color: var(--berry); }
      .mm-amber-text { color: var(--amber); }

      .mm-sidebar { background: var(--surface); border-right: 1px solid var(--border); position: relative; z-index: 10; }
      .mm-logo-badge { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: var(--espresso); box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 55%, transparent); }
      .mm-cv01 { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: .06em; color: var(--accent); border: 1px solid var(--border); border-radius: 999px; padding: 2px 6px; margin-left: auto; opacity: .85; }

      .mm-nav-item, .mm-link { display: flex; align-items: center; gap: 0.65rem; width: 100%; text-align: left; border-radius: 12px; padding: 0.6rem 0.75rem; font-size: 0.85rem; font-weight: 500; color: var(--muted); background: transparent; border: none; cursor: pointer; transition: all .2s ease; }
      .mm-link { font-weight: 400; padding: 0.5rem 0.75rem; text-decoration: none; }
      .mm-nav-item:hover, .mm-link:hover { background: var(--surface2); color: var(--text); }
      .mm-nav-item.active { background: var(--surface2); color: var(--accent); }

      .mm-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: .14em; color: var(--muted); }
      .mm-eyebrow-mono { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); }

      .mm-lang { display:flex; align-items:center; gap:.5rem; border:1px solid var(--border); border-radius:12px; padding:.6rem .75rem; font-size:.8rem; color: var(--text); }

      .mm-avatar { display:flex; height:2.25rem; width:2.25rem; align-items:center; justify-content:center; border-radius:999px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: var(--espresso); font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; }
      .mm-sidebar-footer { border-top: 1px solid var(--border); }

      .mm-main { background: var(--bg); position: relative; }

      /* Scattered sticker slots — sits above the page bg, behind the actual cards/text */
      .mm-sticker-layer { position: absolute; inset: 0; height: 100%; z-index: 25; pointer-events: none; overflow: hidden; }
      .mm-sticker-slot {
        position: absolute; display: flex; align-items: center; justify-content: center; opacity: .85;
      }
      .mm-sticker-slot img { border: none; outline: none; background: transparent; display: block; }

      /* Free-roaming drift — each variant wanders a different diagonal/loop path */
      .mm-drift-1 { animation: drift1 14s ease-in-out infinite; }
      .mm-drift-2 { animation: drift2 17s ease-in-out infinite; }
      .mm-drift-3 { animation: drift3 12s ease-in-out infinite; }
      .mm-drift-4 { animation: drift4 19s ease-in-out infinite; }
      @keyframes drift1 {
        0%, 100% { transform: translate(0, 0); }
        25%      { transform: translate(18px, -14px); }
        50%      { transform: translate(4px, -28px); }
        75%      { transform: translate(-16px, -10px); }
      }
      @keyframes drift2 {
        0%, 100% { transform: translate(0, 0); }
        30%      { transform: translate(-22px, 10px); }
        60%      { transform: translate(-8px, -20px); }
        85%      { transform: translate(14px, 6px); }
      }
      @keyframes drift3 {
        0%, 100% { transform: translate(0, 0); }
        20%      { transform: translate(12px, 16px); }
        50%      { transform: translate(-14px, 22px); }
        80%      { transform: translate(-20px, -6px); }
      }
      @keyframes drift4 {
        0%, 100% { transform: translate(0, 0); }
        33%      { transform: translate(-16px, -18px); }
        66%      { transform: translate(20px, -8px); }
      }
      .mm-topbar { border-bottom: 1px solid var(--border); position: sticky; top:0; z-index: 15; background: color-mix(in srgb, var(--bg) 90%, transparent); backdrop-filter: blur(6px); }
      .mm-icon-btn { display:flex; height:2.1rem; width:2.1rem; align-items:center; justify-content:center; border-radius:999px; border:1px solid var(--border); color: var(--muted); background: var(--surface); cursor:pointer; transition: all .2s; }
      .mm-icon-btn:hover { color: var(--text); border-color: var(--borderStrong); }
      .mm-theme-toggle:hover { color: var(--accent); }

      .mm-badge { display:inline-flex; align-items:center; gap:.5rem; border-radius:999px; border:1px solid var(--border); background: var(--surface); padding:.4rem .9rem; font-size:.72rem; font-weight:600; color: var(--accent); }

      .mm-btn-primary, .mm-btn-secondary { display:inline-flex; align-items:center; gap:.5rem; border-radius:999px; padding:.65rem 1.3rem; font-size:.85rem; font-weight:600; cursor:pointer; border: none; transition: transform .2s, opacity .2s; text-decoration:none; }
      .mm-btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: var(--espresso); box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 40%, transparent); }
      .mm-btn-primary:hover { transform: translateY(-2px); }
      .mm-btn-secondary { border:1px solid var(--border); color: var(--text); background: var(--surface); }
      .mm-btn-secondary:hover { background: var(--surface2); }

      .mm-card { border-radius: var(--radius); border:1px solid var(--border); background: var(--surface); }
      .mm-hover-lift { transition: transform .3s ease, box-shadow .3s ease; animation: fadeUp .6s ease backwards; }
      .mm-hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 28px color-mix(in srgb, var(--accent) 15%, transparent); }

      .mm-stat-icon { display:flex; height:2.25rem; width:2.25rem; align-items:center; justify-content:center; border-radius:999px; }
      .mm-accent-soft { background: color-mix(in srgb, var(--accent) 18%, var(--surface2)); color: var(--accent); }
      .mm-accent2-soft { background: color-mix(in srgb, var(--accent2) 18%, var(--surface2)); color: var(--accent2); }
      .mm-berry-soft { background: color-mix(in srgb, var(--berry) 18%, var(--surface2)); color: var(--berry); }

      .mm-featured-card { position:relative; height:14rem; border-radius: var(--radius); border:1px solid var(--border); padding:1.25rem; display:flex; flex-direction:column; justify-content:flex-end; cursor:pointer; overflow:hidden; }
      .mm-featured-cover { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
      .mm-featured-scrim { position:absolute; inset:0; z-index:1; background: linear-gradient(180deg, color-mix(in srgb, var(--espresso) 10%, transparent) 0%, color-mix(in srgb, var(--espresso) 85%, transparent) 100%); }
      .mm-featured-card > *:not(.mm-featured-cover):not(.mm-featured-scrim):not(.mm-featured-play) { position:relative; z-index:2; }
      .mm-featured-accent { background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 30%, transparent), var(--surface2)); }
      .mm-featured-berry { background: linear-gradient(160deg, color-mix(in srgb, var(--berry) 26%, transparent), var(--surface2)); }
      .mm-featured-accent2 { background: linear-gradient(160deg, color-mix(in srgb, var(--accent2) 30%, transparent), var(--surface2)); }
      .mm-featured-icon { display:flex; height:2.25rem; width:2.25rem; align-items:center; justify-content:center; border-radius:999px; background: color-mix(in srgb, var(--espresso) 35%, transparent); color: var(--accent); margin-bottom:.5rem; }
      .mm-featured-play { position:absolute; right:1rem; top:1rem; z-index:2; display:flex; height:2.25rem; width:2.25rem; align-items:center; justify-content:center; border-radius:999px; background: color-mix(in srgb, var(--espresso) 35%, transparent); color: var(--text); transition: all .2s; }
      .mm-featured-card:hover .mm-featured-play { background: var(--accent); color: var(--espresso); }

      .mm-lib-icon { display:flex; height:6rem; width:6rem; flex-shrink:0; align-items:center; justify-content:center; border-radius: var(--radius); border:1px solid var(--border); background: var(--surface); color: var(--berry); }

      .mm-filterbar { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(6px); }
      .mm-filter-btn { display:flex; align-items:center; gap:.4rem; border-radius:999px; border:1px solid var(--border); padding:.4rem .85rem; font-size:.72rem; font-weight:600; color: var(--muted); background: transparent; cursor:pointer; transition: all .2s; }
      .mm-filter-btn:hover { color: var(--text); }
      .mm-filter-btn.active { background: var(--accent); border-color: var(--accent); color: var(--espresso); }

      .mm-item-inner { overflow:hidden; border-radius: var(--radius); border:1px solid var(--border); background: var(--surface); padding:.5rem; transition: transform .3s ease; }
      .mm-item:hover .mm-item-inner { transform: translateY(-4px); }
      .mm-tab { position:absolute; top:-0.75rem; left:-0.75rem; z-index:10; display:flex; height:2rem; width:2rem; align-items:center; justify-content:center; border-radius:999px; font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; color: var(--espresso); box-shadow: 0 4px 10px rgba(0,0,0,.25); }
      .mm-accent-bg { background: var(--accent); }
      .mm-accent2-bg { background: var(--accent2); }
      .mm-berry-bg { background: var(--berry); }
      .mm-spark-bg { background: var(--berry); }
      .mm-amber-bg { background: var(--amber); }
      .mm-amber-soft { background: color-mix(in srgb, var(--amber) 18%, var(--surface2)); color: var(--amber); }

      .mm-footer { border-top: 1px solid var(--border); }

      .mm-scrolltop { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 40; display:flex; height:2.75rem; width:2.75rem; align-items:center; justify-content:center; border-radius:999px; background: var(--accent); color: var(--espresso); border:none; box-shadow: 0 8px 20px rgba(0,0,0,.3); opacity:0; transform: translateY(10px); pointer-events:none; transition: all .3s ease; cursor:pointer; }
      .mm-scrolltop.show { opacity:1; transform:translateY(0); pointer-events:auto; }

      /* Equalizer hero decoration */
      .mm-eq {
        opacity: .28;
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 70%, transparent 100%),
                             linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        -webkit-mask-composite: source-in;
        mask-image: linear-gradient(to bottom, transparent 0%, black 35%, black 70%, transparent 100%),
                    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        mask-composite: intersect;
      }
      .mm-eq-bar { position:absolute; bottom:0; width: 2px; height: 14%; background: linear-gradient(to top, var(--accent), var(--accent2)); border-radius: 2px; animation: eqPulse 1.8s ease-in-out infinite; transform-origin: bottom; }
      @keyframes eqPulse { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

      /* Floating musical notes / leek */
      .mm-note { position:absolute; font-size: 1.1rem; color: var(--accent2); opacity: .3; animation: noteFloat 9s ease-in-out infinite; }
      .mm-note-0 { top: 12%; left: 8%; animation-delay: 0s; }
      .mm-note-1 { top: 65%; left: 4%; animation-delay: 1.4s; font-size: 1.4rem; }
      .mm-note-2 { top: 20%; left: 92%; animation-delay: .6s; font-size: 1.3rem; }
      .mm-note-3 { top: 78%; left: 88%; animation-delay: 2.2s; }
      .mm-note-4 { top: 45%; left: 50%; animation-delay: 3s; opacity:.15; }
      .mm-note-5 { top: 8%; left: 45%; animation-delay: 1.8s; }
      @keyframes noteFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-22px) rotate(10deg); } }

      @keyframes fadeUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:translateY(0); } }
      .animate-fadeUp { animation: fadeUp .5s ease backwards; }

      ::-webkit-scrollbar { width: 9px; height: 9px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

      @media (max-width: 900px) {
        .mm-sidebar { display: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: .001ms !important; }
      }
    `}</style>
  );
}
