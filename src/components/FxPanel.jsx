import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Visual FX settings panel                                           */
/* ------------------------------------------------------------------ */
export default function FxPanel({ fx, setFx, onClose }) {
  const toggle = (key) => setFx((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mm-fx-panel">
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
    </div>
  );
}
