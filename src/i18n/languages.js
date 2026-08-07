import en from "./locales/en.js";
import id from "./locales/id.js";
import ms from "./locales/ms.js";
import ja from "./locales/ja.js";
import zh from "./locales/zh.js";
import ko from "./locales/ko.js";
import ar from "./locales/ar.js";

/* ------------------------------------------------------------------ */
/*  Core languages — each has a hand-written dictionary in ./locales.  */
/*  Switching between these is instant (no reload, no network call).   */
/* ------------------------------------------------------------------ */
export const locales = { en, id, ms, ja, zh, ko, ar };

export const coreLanguages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦", rtl: true },
];

/* ------------------------------------------------------------------ */
/*  Extra languages — no hand-written dictionary. Picking one of these  */
/*  hands the whole page off to the Google Translate widget instead     */
/*  (see LanguageContext.jsx). Add/remove freely; these don't need a    */
/*  matching locales/*.js file. Each has a real country flag (not a     */
/*  generic 🌐) so the list reads the same as the core languages above. │
/* ------------------------------------------------------------------ */
export const extraLanguages = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "ur", label: "اردو", flag: "🇵🇰", rtl: true },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "he", label: "עברית", flag: "🇮🇱", rtl: true },
  { code: "fa", label: "فارسی", flag: "🇮🇷", rtl: true },
];
