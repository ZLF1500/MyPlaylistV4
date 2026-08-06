import { useId } from "react";

/**
 * ElectricBorder — adapted from "Animated Electric Card" (@coding.stella).
 * Wraps any children with an animated, turbulent glowing border.
 * Color follows the Miku theme by default via CSS variables, so it re-colors
 * automatically with light/dark theme and per-section accent (accent / accent2 / berry).
 *
 * Usage:
 *   <ElectricBorder color="var(--accent)" radius={20}>
 *     <YourCard />
 *   </ElectricBorder>
 */
export default function ElectricBorder({
  color = "var(--accent)",
  radius = 20,
  className = "",
  style = {},
  children,
}) {
  // Unique id per instance so multiple electric borders on one page
  // don't fight over the same SVG filter id.
  const uid = useId().replace(/[:]/g, "");
  const filterId = `eb-turb-${uid}`;

  return (
    <div
      className={`eb-root ${className}`}
      style={{ "--eb-color": color, "--eb-radius": `${radius}px`, ...style }}
    >
      <svg className="eb-svg" aria-hidden="true">
        <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="6" result="noise1" seed="1" />
          <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
            <animate attributeName="dy" values="700; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="6" result="noise2" seed="1" />
          <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
            <animate attributeName="dy" values="0; -700" dur="8s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="6" result="noise3" seed="2" />
          <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
            <animate attributeName="dx" values="490; 0" dur="8s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="6" result="noise4" seed="2" />
          <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
            <animate attributeName="dx" values="0; -490" dur="8s" repeatCount="indefinite" calcMode="linear" />
          </feOffset>

          <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
          <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
          <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
          <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="16" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      <div className="eb-layers">
        <div className="eb-main" style={{ filter: `url(#${filterId})` }} />
        <div className="eb-glow1" />
        <div className="eb-glow2" />
      </div>
      <div className="eb-overlay1" />
      <div className="eb-overlay2" />
      <div className="eb-bg-glow" />
      <div className="eb-content">{children}</div>
    </div>
  );
}