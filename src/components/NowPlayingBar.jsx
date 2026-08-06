import { X, ChevronUp, ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Persistent Now Playing bar — lives OUTSIDE the Home/CollectionPage */
/*  swap, so it never unmounts when you navigate. This is the only way */
/*  a Spotify iframe embed can survive a page switch: the DOM node it  */
/*  lives in has to never be removed.                                  */
/*                                                                      */
/*  expanded/onToggleExpand are lifted up to App.jsx (rather than local */
/*  state here) so App can also grow <main>'s bottom padding to match — */
/*  otherwise the taller player would just cover page content instead   */
/*  of pushing it up.                                                   */
/* ------------------------------------------------------------------ */
export default function NowPlayingBar({ nowPlaying, onClose, sidebarCollapsed, expanded, onToggleExpand }) {
  if (!nowPlaying) return null;

  // Spotify's embed actually redraws its own UI (compact row vs full card
  // with artwork) based on the iframe's real rendered height — it's not
  // just clipping the same content, so changing this height genuinely
  // switches the embed's layout, not just how much of it we can see.
  const height = expanded ? (nowPlaying.kind === "track" ? 352 : 380) : 80;

  return (
    <div className={`mm-nowplaying ${sidebarCollapsed ? "mm-nowplaying-full" : ""}`}>
      <div className="mm-nowplaying-frame" style={{ height }}>
        <iframe
          title="now-playing"
          src={`https://open.spotify.com/embed/${nowPlaying.kind}/${nowPlaying.id}?utm_source=generator&theme=0`}
          width="100%" height="100%"
          style={{ border: "none", display: "block" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
      <div className="mm-nowplaying-controls">
        <button
          className="mm-nowplaying-btn"
          onClick={onToggleExpand}
          title={expanded ? "Perkecil player" : "Perbesar player"}
        >
          {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </button>
        <button className="mm-nowplaying-btn" onClick={onClose} title="Tutup player">
          <X size={13} />
        </button>
      </div>
    </div>
  );
}