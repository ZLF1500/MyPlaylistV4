import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Visual FX settings — persisted so preferences survive a refresh    */
/* ------------------------------------------------------------------ */
const FX_STORAGE_KEY = "mm-fx-settings";
const defaultFx = { electricBorder: true, glowTabs: true, heartBurst: true };

function loadFx() {
  try {
    const saved = JSON.parse(localStorage.getItem(FX_STORAGE_KEY) || "{}");
    return { ...defaultFx, ...saved };
  } catch {
    return { ...defaultFx };
  }
}

/** Visual FX toggle state (electric border / glow tabs / heart burst), auto-saved to localStorage. */
export function useFxSettings() {
  const [fx, setFx] = useState(loadFx);

  useEffect(() => {
    localStorage.setItem(FX_STORAGE_KEY, JSON.stringify(fx));
  }, [fx]);

  return [fx, setFx];
}
