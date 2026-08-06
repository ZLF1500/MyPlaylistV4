import { useRef, useState, useEffect } from "react";

/**
 * GlowNav — adapted from "Glowing Tab Navigation" (@coding.stella).
 *
 * This is the original single-track version: one rounded pill container
 * with a glowing indicator that slides to whichever tab is active — not
 * per-button borders with a highlight layered on top (that reads busier,
 * since every idle tab still shows its own outline).
 *
 * items: [{ id, label, icon }]
 */
export default function GlowNav({ items, active, onSelect, enabled = true }) {
  const wrapRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!enabled) return;
    const place = () => {
      const btn = wrapRef.current?.querySelector(`[data-id="${active}"]`);
      if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    place();

    // Re-place whenever the nav's own box actually changes size — this is
    // what catches sidebar collapse/expand (which resizes the filter bar
    // even though the browser window itself didn't resize). A plain
    // window "resize" listener alone would miss that entirely.
    const ro = new ResizeObserver(place);
    if (wrapRef.current) ro.observe(wrapRef.current);
    // Kept as a lightweight fallback for viewport-driven layout shifts.
    window.addEventListener("resize", place);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [active, items, enabled]);

  if (!enabled) {
    // Effect toggled off — plain outlined pills, no track/glow.
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            className={`mm-filter-btn ${active === it.id ? "active" : ""}`}
          >
            <it.icon size={11} /> <span>{it.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mm-glow-nav" ref={wrapRef}>
      <span
        className="mm-glow-indicator"
        style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
      />
      {items.map((it) => (
        <button
          key={it.id}
          data-id={it.id}
          onClick={() => onSelect(it.id)}
          className={`mm-glow-tab ${active === it.id ? "active" : ""}`}
        >
          <it.icon size={11} /> <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}