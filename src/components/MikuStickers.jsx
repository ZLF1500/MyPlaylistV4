import { useState, useEffect } from "react";
import { stickerSlots } from "../data/stickers.js";

export default function MikuStickers() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    let hideTimer;
    const cycle = setInterval(() => {
      setShown(false); // fade out first
      hideTimer = setTimeout(() => {
        setActive((a) => (a + 1) % stickerSlots.length);
        setShown(true); // then swap + fade the next one in
      }, 500);
    }, 5000);
    return () => { clearInterval(cycle); clearTimeout(hideTimer); };
  }, []);

  const s = stickerSlots[active];
  return (
    <div className="mm-sticker-layer">
      <div
        className={`mm-sticker-slot mm-drift-${(active % 4) + 1}`}
        style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: shown ? undefined : 0 }}
        title={`Ganti dengan ${s.file}`}
      >
        <img
          src={`/assets/${s.file}`}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain", transform: `rotate(${s.rot}deg)` }}
        />
      </div>
    </div>
  );
}
