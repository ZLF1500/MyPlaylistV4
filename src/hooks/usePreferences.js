import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  User preferences — theme (dark/light) + visual FX toggles, all in  */
/*  one localStorage key so they persist together across a refresh.    */
/*  Replaces the old useFxSettings.js (FX only, no theme) and the      */
/*  plain useState("dark") theme in App.jsx.                           */
/* ------------------------------------------------------------------ */
const PREFS_STORAGE_KEY = "mm-preferences";
// Old key from before theme/fx were merged — read once for migration so
// people who already toggled FX settings don't lose them on upgrade.
const LEGACY_FX_STORAGE_KEY = "mm-fx-settings";

const defaultFx = {
  electricBorder: true, glowTabs: true, heartBurst: true,
  particles: true, stickers: true, equalizer: true,
};
const defaultPrefs = { theme: "dark", fx: defaultFx };

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_STORAGE_KEY) || "null");
    if (saved) {
      return {
        theme: saved.theme === "light" ? "light" : "dark",
        fx: { ...defaultFx, ...(saved.fx || {}) },
      };
    }
  } catch {
    /* fall through to migration / defaults below */
  }

  // No combined prefs yet — check for the legacy FX-only key so existing
  // toggle choices survive the upgrade. Theme wasn't persisted before, so
  // it starts at the default either way.
  try {
    const legacyFx = JSON.parse(localStorage.getItem(LEGACY_FX_STORAGE_KEY) || "null");
    if (legacyFx) return { theme: "dark", fx: { ...defaultFx, ...legacyFx } };
  } catch {
    /* ignore, use defaults */
  }

  return { theme: defaultPrefs.theme, fx: { ...defaultFx } };
}

/**
 * Combined theme + FX-toggle preferences, auto-saved to localStorage.
 *
 * Usage:
 *   const { theme, setTheme, toggleTheme, fx, setFx } = usePreferences();
 */
export function usePreferences() {
  const [prefs, setPrefs] = useState(loadPrefs);

  useEffect(() => {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const setTheme = (theme) => setPrefs((p) => ({ ...p, theme }));
  const toggleTheme = () => setPrefs((p) => ({ ...p, theme: p.theme === "dark" ? "light" : "dark" }));

  // Mirrors the setFx(prev => ({...prev, key: val})) pattern FxPanel already
  // uses, so FxPanel.jsx needs zero changes — it just receives this setFx.
  const setFx = (updater) =>
    setPrefs((p) => ({ ...p, fx: typeof updater === "function" ? updater(p.fx) : updater }));

  return { theme: prefs.theme, setTheme, toggleTheme, fx: prefs.fx, setFx };
}
