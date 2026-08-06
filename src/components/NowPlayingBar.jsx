import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Persistent Now Playing bar — lives OUTSIDE the Home/CollectionPage */
/*  swap, so it never unmounts when you navigate. This is the only way */
/*  a Spotify iframe embed can survive a page switch: the DOM node it  */
/*  lives in has to never be removed.                                  */
/* ------------------------------------------------------------------ */
export default function NowPlayingBar({ nowPlaying, onClose, sidebarCollapsed }) {
  if (!nowPlaying) return null;
  return (
    <div className={`mm-nowplaying ${sidebarCollapsed ? "mm-nowplaying-full" : ""}`}>
      <iframe
        title="now-playing"
        src={`https://open.spotify.com/embed/${nowPlaying.kind}/${nowPlaying.id}?utm_source=generator&theme=0`}
        width="100%" height="80"
        style={{ border: "none", display: "block" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <button className="mm-nowplaying-close" onClick={onClose} title="Tutup player">
        <X size={13} />
      </button>
    </div>
  );
}