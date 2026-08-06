import { useState, useEffect, useRef } from "react";
import {
  Heart, ListMusic, User, Disc3, TrendingUp, Shuffle, ArrowUp,
} from "lucide-react";

import { themes } from "./theme.js";
import { favoriteSongs, topSongs, myPlaylists, myArtists, myAlbums, dailyMix } from "./data/library.js";
import { usePreferences } from "./hooks/usePreferences.js";
import { useNavStack } from "./hooks/useNavStack.js";
import { useHeartBurst } from "./effects/useHeartBurst.js";

import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import NowPlayingBar from "./components/NowPlayingBar.jsx";
import ParticleField from "./components/ParticleField.jsx";
import MikuStickers from "./components/MikuStickers.jsx";
import HomePage from "./pages/HomePage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";

/* ------------------------------------------------------------------ */
export default function MikuMusic() {
  const { theme, toggleTheme, fx, setFx } = usePreferences();
  const [view, setView] = useState("list");
  const [showTop, setShowTop] = useState(false);
  const [showFxPanel, setShowFxPanel] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Desktop-only: hamburger collapses/reveals the sidebar in place (unlike
  // mobile, where it opens an overlay drawer via mobileNavOpen above).
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // The currently "pinned" track/playlist — rendered in a persistent bottom
  // bar OUTSIDE the Home/CollectionPage swap, so navigating between pages
  // never unmounts it and playback keeps going.
  const [nowPlaying, setNowPlaying] = useState(null); // { kind, id, num, label }
  const mainRef = useRef(null);
  const T = themes[theme];

  const { page, pendingFilter, goTo, goBack, goForward, canGoBack, canGoForward } =
    useNavStack("home", { onNavigate: () => setMobileNavOpen(false) });

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  // If the window is resized down into mobile range while the desktop
  // sidebar happens to be collapsed, drop the collapsed state — otherwise
  // it'd combine with the mobile drawer's off-canvas transform into a
  // sidebar that's both zero-width AND translated, i.e. permanently invisible.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 900) setSidebarCollapsed(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 900) setMobileNavOpen(true);
    else setSidebarCollapsed((v) => !v);
  };

  const heartBurst = useHeartBurst(["var(--berry)", "#ff5fa3", "#ffb3d1"]);
  const fireHeartBurst = (e) => {
    if (!fx.heartBurst) return;
    heartBurst(e.clientX, e.clientY);
  };

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
        "--scrim": "#04141B",
        "--glow1": T.glow1, "--glow2": T.glow2, "--glow3": T.glow3,
        background: "var(--bg)", color: "var(--text)", minHeight: "100vh", position: "relative",
        fontFamily: "'Work Sans', ui-sans-serif, sans-serif", overflow: "hidden",
      }}
      className="mm-root"
    >
      {fx.particles && <ParticleField />}
      {fx.stickers && <MikuStickers />}

      <div className="flex h-screen">
        {mobileNavOpen && (
          <div className="mm-sidebar-backdrop" onClick={() => setMobileNavOpen(false)} />
        )}
        <Sidebar
          page={page}
          sections={sections}
          onNavigate={goTo}
          onHeart={fireHeartBurst}
          mobileNavOpen={mobileNavOpen}
          onCloseMobileNav={() => setMobileNavOpen(false)}
          collapsed={sidebarCollapsed}
        />

        {/* ---------------- Main ---------------- */}
        <main ref={mainRef} className="mm-main relative flex-1 overflow-y-auto" style={{ paddingBottom: nowPlaying ? 80 : 0 }}>
          <TopBar
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
            onBack={goBack} canGoBack={canGoBack}
            onForward={goForward} canGoForward={canGoForward}
            showFxPanel={showFxPanel}
            onToggleFxPanel={() => setShowFxPanel((v) => !v)}
            onCloseFxPanel={() => setShowFxPanel(false)}
            fx={fx} setFx={setFx}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {page === "home" ? (
            <HomePage T={T} onNavigate={goTo} fx={fx} onHeart={fireHeartBurst} />
          ) : (
            <CollectionPage
              key={page}
              section={sections.find((s) => s.id === page)}
              view={view} setView={setView}
              fx={fx}
              initialFilter={pendingFilter}
              nowPlaying={nowPlaying}
              onPlay={setNowPlaying}
            />
          )}

          <Footer />

          <button
            onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className={`mm-scrolltop ${showTop ? "show" : ""}`}
          >
            <ArrowUp size={15} />
          </button>
        </main>
      </div>

      <NowPlayingBar nowPlaying={nowPlaying} onClose={() => setNowPlaying(null)} />
    </div>
  );
}