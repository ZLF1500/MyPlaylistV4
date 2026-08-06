import { useCallback, useRef, useEffect } from "react";

/**
 * useHeartBurst — inspired by "Heart and Start Animation" (@coding.stella).
 *
 * NOTE on adaptation: the original is a fullscreen Three.js scene with
 * ~10,000 particles morphing between a heart and a star, bloom
 * post-processing, and its own theme/orbit-control panel. That's built to
 * be the whole page background — mounting it as-is here would fight with
 * the site's existing particle field (ParticleField/FloatingNotes) and
 * add a heavy WebGL scene just for a button tap.
 *
 * This keeps the *idea* (bursting hearts + stars, glowing, theme-colored)
 * but as a cheap 2D canvas burst you can fire from any click — a much
 * better fit for "like this song" / "favorite this" moments.
 */
function drawHeart(ctx, size) {
  const s = size;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.35);
  ctx.bezierCurveTo(-s, s * 0.7, 0, s * 0.9, 0, s * 1.2);
  ctx.bezierCurveTo(0, s * 0.9, s, s * 0.7, s, s * 0.35);
  ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
  ctx.closePath();
}

export function useHeartBurst(colors = ["var(--berry)", "#ff5fa3", "#ffb3d1"]) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvasRef.current?.remove();
    };
  }, []);

  const resolveColors = () => {
    // Resolve CSS variables (var(--accent) etc.) to real colors so canvas can use them.
    // IMPORTANT: the probe must live *inside* the themed root (.mm-root), since that's
    // where --accent/--accent2/--berry are actually defined (inline style on mm-root).
    // Appending it to document.body directly means the vars are undefined there and
    // resolve to black.
    const themeRoot = document.querySelector(".mm-root") || document.body;
    const probe = document.createElement("span");
    probe.style.display = "none";
    themeRoot.appendChild(probe);
    const resolved = colors.map((c) => {
      probe.style.color = c;
      const computed = getComputedStyle(probe).color;
      return computed;
    });
    probe.remove();
    return resolved;
  };

  const burst = useCallback((x, y) => {
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9998";
      document.body.appendChild(canvas);
      canvasRef.current = canvas;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = resolveColors();
    const particles = Array.from({ length: 20 }).map(() => ({
      x, y,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 6 - 2,
      size: 7 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 1,
    }));

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.vy += 0.15;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.018;
        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(p.life, 0);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 22;
          drawHeart(ctx, p.size);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      }
      if (alive) rafRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    tick();
  }, [colors]);

  return burst;
}