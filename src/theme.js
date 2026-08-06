/* ------------------------------------------------------------------ */
/*  Theme tokens — Hatsune Miku palette                                */
/* ------------------------------------------------------------------ */
export const themes = {
  dark: {
    bg: "#0A1820", surface: "#0F2731", surface2: "#153542", border: "#1F4B57",
    borderStrong: "#2E6672", text: "#EAFBFC", muted: "#82ADB4",
    accent: "#39C5BB", accent2: "#7CF0E6", spark: "#FF9ED2", amber: "#FFC15E", espresso: "#04141B",
    glow1: "#39C5BB", glow2: "#7CF0E6", glow3: "#EAFBFC",
  },
  light: {
    bg: "#EFFBFB", surface: "#FFFFFF", surface2: "#DEF3F2", border: "#BFE7E5",
    borderStrong: "#8FD4D0", text: "#07262C", muted: "#4C7A80",
    accent: "#0EA99D", accent2: "#0C8B94", spark: "#E85CA6", amber: "#E29A2E", espresso: "#FFFFFF",
    // Particle "glow" colors need to stay bright & saturated even in light mode —
    // the regular accent/accent2 are deliberately darkened there for text contrast,
    // which made floating particles read as dark ink dots instead of light. These
    // are a separate, vivid set used only for the particle field.
    glow1: "#2FD9C7", glow2: "#7CE8DC", glow3: "#FF8FC7",
  },
};
