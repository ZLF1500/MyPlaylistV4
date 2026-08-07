import { X, ChevronUp, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

/* ------------------------------------------------------------------ */
/*  Persistent Now Playing bar — lives OUTSIDE the Home/CollectionPage */
/*  swap, so it never unmounts when you navigate. This is the only way */
/*  a Spotify iframe embed can survive a page switch: the DOM node it  */
/*  lives in has to never be removed.                                  */
/*                                                                      */
/*  expanded/fullscreen + their toggles are lifted up to App.jsx        */
/*  (rather than local state here) so App can also grow <main>'s       */
/*  bottom padding and lock body scroll to match — otherwise the       */
/*  taller/fullscreen player would just cover page content instead of   */
/*  pushing it up / blocking scroll behind it.                          */
/* ------------------------------------------------------------------ */
export default function NowPlayingBar({
  nowPlaying, onClose, sidebarCollapsed,
  expanded, onToggleExpand,
  fullscreen, onToggleFullscreen,
}) {
  const { t } = useLanguage();
  if (!nowPlaying) return null;

  // Spotify's embed actually redraws its own UI (compact row vs full card
  // with artwork) based on the iframe's real rendered height — it's not
  // just clipping the same content, so changing this height genuinely
  // switches the embed's layout, not just how much of it we can see.
  // Spotify's track embed is a fixed-size compact/card player — it can't
  // grow to fill a fullscreen viewport, so going fullscreen on a track just
  // leaves a dead gap below the card. Playlist/album/artist embeds have a
  // scrollable track list that genuinely benefits from the extra height, so
  // fullscreen is only offered for those.
  const canFullscreen = nowPlaying.kind !== "track";

  const height = fullscreen ? "100%" : expanded ? (nowPlaying.kind === "track" ? 352 : 380) : 80;

  return (
    <div
      className={`mm-nowplaying ${sidebarCollapsed ? "mm-nowplaying-full" : ""} ${fullscreen ? "mm-nowplaying-fullscreen" : ""}`}
    >
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
        {canFullscreen && (
          <button
            className="mm-nowplaying-btn"
            onClick={onToggleFullscreen}
            title={fullscreen ? t("nowplaying.exitFullscreen") : t("nowplaying.fullscreen")}
          >
            {fullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        )}
        {!fullscreen && (
          <button
            className="mm-nowplaying-btn"
            onClick={onToggleExpand}
            title={expanded ? t("nowplaying.collapse") : t("nowplaying.expand")}
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        )}
        <button className="mm-nowplaying-btn" onClick={onClose} title={t("nowplaying.close")}>
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
