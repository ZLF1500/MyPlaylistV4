import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { locales, coreLanguages, extraLanguages } from "./languages.js";

/* ------------------------------------------------------------------ */
/*  Language system                                                     */
/*                                                                       */
/*  Two tiers, both reachable from the same dropdown (LanguageSwitcher): │
/*                                                                       */
/*  1. CORE languages (en/id/ms/ja/zh/ko/ar) — hand-written dictionaries │
/*     in ./locales/*.js. Switching between these is instant: just a    │
/*     React state change, no reload, no network call, no risk of       │
/*     fighting with React's own DOM updates.                           │
/*                                                                       │
/*  2. EXTRA languages (anything else) — no dictionary exists, so we     │
/*     hand the whole page to the Google Translate website widget       │
/*     instead. That widget rewrites text nodes in the DOM from OUTSIDE │
/*     React, which is why we do this via the `googtrans` cookie +      │
/*     a full page reload rather than toggling it live: it gives         │
/*     Google Translate a clean, freshly-mounted DOM to work with        │
/*     instead of one React is actively re-rendering, which is the      │
/*     scenario that causes the classic "Failed to execute 'removeChild'│
/*     on 'Node'" crash when an SPA and Google Translate touch the same  │
/*     nodes at the same time.                                          │
/*                                                                       │
/*  Before handing off to Google Translate we always reset our own      │
/*  dictionary language to English first, so Google always translates    │
/*  FROM a known, consistent source ("en") — matches the pageLanguage    │
/*  set in index.html's googleTranslateElementInit().                   │
/* ------------------------------------------------------------------ */

const LANG_STORAGE_KEY = "mm-language";
const GOOGLE_LANG_STORAGE_KEY = "mm-language-google";
const GOOGLE_SOURCE = "en";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function eraseGoogleCookie() {
  const past = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=; path=/; ${past}`;
  document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; ${past}`;
  // Some setups need the leading-dot domain variant too.
  document.cookie = `googtrans=; path=/; domain=.${window.location.hostname}; ${past}`;
}

function setGoogleCookie(target) {
  const value = `/${GOOGLE_SOURCE}/${target}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
}

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && locales[saved]) return saved;
  } catch {
    /* localStorage unavailable — fall back to default below */
  }
  return "en"; // default per product spec
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);
  const [googleTarget, setGoogleTarget] = useState(null);

  // On mount: figure out whether a previous session left the Google
  // Translate cookie active, so the dropdown can show the right selection
  // even though our own dictionary is silently sitting at "en" underneath.
  useEffect(() => {
    const cookie = getCookie("googtrans");
    if (cookie) {
      const parts = cookie.split("/").filter(Boolean); // ["en", "xx"]
      const target = parts[1];
      if (target && target !== GOOGLE_SOURCE) {
        setGoogleTarget(target);
        return;
      }
    }
    // No active Google translation — clear any stale marker from before.
    try { localStorage.removeItem(GOOGLE_LANG_STORAGE_KEY); } catch { /* noop */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch { /* noop */ }
    document.documentElement.lang = googleTarget || lang;
    const isRtl = coreLanguages.find((l) => l.code === lang)?.rtl
      || extraLanguages.find((l) => l.code === googleTarget)?.rtl;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, googleTarget]);

  const setLang = useCallback((code) => {
    const isCore = Boolean(locales[code]);

    if (isCore) {
      if (getCookie("googtrans")) {
        // Coming back from a Google-translated state — reload once so the
        // DOM is clean before our dictionary takes over.
        eraseGoogleCookie();
        try {
          localStorage.setItem(LANG_STORAGE_KEY, code);
          localStorage.removeItem(GOOGLE_LANG_STORAGE_KEY);
        } catch { /* noop */ }
        window.location.reload();
        return;
      }
      setLangState(code);
      setGoogleTarget(null);
      return;
    }

    // Extra language -> hand off to Google Translate.
    setGoogleCookie(code);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, GOOGLE_SOURCE);
      localStorage.setItem(GOOGLE_LANG_STORAGE_KEY, code);
    } catch { /* noop */ }
    window.location.reload();
  }, []);

  const dict = locales[lang] || locales.en;
  const t = useCallback((key, vars) => {
    let str = dict[key] ?? locales.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll(`{${k}}`, v);
      }
    }
    return str;
  }, [dict]);

  const activeCode = googleTarget || lang;
  const value = {
    lang: activeCode,
    isGoogleTranslated: Boolean(googleTarget),
    setLang,
    t,
    dir: document.documentElement.dir || "ltr",
    coreLanguages,
    extraLanguages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a <LanguageProvider>");
  return ctx;
}
