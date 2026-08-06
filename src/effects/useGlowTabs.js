import { useRef, useState, useCallback } from "react";

/**
 * useGlowTabs — adapted from "Glowing Tab Navigation" (@coding.stella).
 * The original demo used vanilla DOM + CSS custom properties on a fixed
 * horizontal tab bar; this hook reproduces the same sliding glow-pill
 * behavior for any horizontal row of buttons (here: the filter bar).
 *
 * Usage:
 *   const { containerRef, glowStyle, measure } = useGlowTabs();
 *   <div ref={containerRef} className="mm-glow-tabs" style={glowStyle}>
 *     <button onClick={(e) => { setFilter(x); measure(e.currentTarget); }}>...</button>
 *   </div>
 *
 *   // and once on mount / whenever the active tab changes programmatically:
 *   useEffect(() => { measure(containerRef.current?.querySelector(".active")); }, [filter]);
 */
export function useGlowTabs() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, w: 0 });

  const measure = useCallback((el) => {
    if (!el || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setPos({ x: rect.left - containerRect.left, w: rect.width });
  }, []);

  const glowStyle = { "--glow-x": `${pos.x}px`, "--glow-w": `${pos.w}px` };

  return { containerRef, glowStyle, measure };
}
