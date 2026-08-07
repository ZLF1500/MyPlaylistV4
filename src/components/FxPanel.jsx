import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Visual FX settings panel                                           */
/*                                                                      */
/*  Rendered via a portal into .mm-root (not left inline inside         */
/*  TopBar). Reason: .mm-topbar has position:sticky + z-index, which    */
/*  makes it its own stacking context — so this panel's z-index         */
/*  (var(--mm-z-overlay), meant to be the highest layer per the scale   */
/*  documented above) only ever "wins" *inside* that topbar context.    */
/*  Compared against siblings outside it — e.g. .mm-filterbar, which    */
/*  is deliberately above topbar in the z-index scale — the whole       */
/*  topbar subtree loses, panel included, so the filter bar could       */
/*  paint over the middle of this panel. Portaling into .mm-root        */
/*  escapes that nested context entirely, so the panel's z-index is     */
/*  finally compared on equal footing with everything else and stays    */
/*  on top, as intended. Portaling to .mm-root specifically (rather     */
/*  than document.body) keeps it inside the scope where --text/         */
/*  --surface/--border/etc. are actually defined (inline style in       */
/*  App.jsx) — document.body sits outside that scope and would leave    */
/*  every var(--...) here resolving to nothing.                         */
/*                                                                      */
/*  anchorRef: ref to the ⚙️ button in TopBar, used to position the     */
/*  portaled panel (position: fixed) right under/aligned to it.         */
/* ------------------------------------------------------------------ */
export default function FxPanel({ fx, setFx, onClose, anchorRef }) {
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    const place = () => {
      const btn = anchorRef?.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setPos({ top: r.bottom + 10, right: window.innerWidth - r.right });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchorRef]);

  const toggle = (key) => setFx((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!pos) return null; // wait one layout pass so it never flashes at (0,0)

  const portalTarget = document.querySelector(".mm-root") || document.body;

  return createPortal(
    <div className="mm-fx-panel" style={{ position: "fixed", top: pos.top, right: pos.right }}>
      <div className="mm-fx-panel-head">
        <span>Efek Visual</span>
        <button className="mm-fx-close" onClick={onClose}><X size={13} /></button>
      </div>

      <label className="mm-fx-row">
        <span>Electric border di kartu unggulan</span>
        <input type="checkbox" checked={fx.electricBorder} onChange={() => toggle("electricBorder")} />
      </label>

      <label className="mm-fx-row">
        <span>Glowing tab navigasi</span>
        <input type="checkbox" checked={fx.glowTabs} onChange={() => toggle("glowTabs")} />
      </label>

      <label className="mm-fx-row">
        <span>Heart burst (pink)</span>
        <input type="checkbox" checked={fx.heartBurst} onChange={() => toggle("heartBurst")} />
      </label>

      <div className="mm-fx-divider" />
      <div className="mm-fx-group-label">Background</div>

      <label className="mm-fx-row">
        <span>Partikel bokeh &amp; debu</span>
        <input type="checkbox" checked={fx.particles} onChange={() => toggle("particles")} />
      </label>

      <label className="mm-fx-row">
        <span>Sticker Miku bergantian</span>
        <input type="checkbox" checked={fx.stickers} onChange={() => toggle("stickers")} />
      </label>

      <label className="mm-fx-row">
        <span>Equalizer di hero</span>
        <input type="checkbox" checked={fx.equalizer} onChange={() => toggle("equalizer")} />
      </label>
    </div>,
    portalTarget
  );
}