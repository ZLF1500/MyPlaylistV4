import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { lang, setLang, t, coreLanguages, extraLanguages, isGoogleTranslated } = useLanguage();
  const [open, setOpen] = useState(false);
  // The extra-language list starts collapsed behind a "+N other languages"
  // row. It auto-expands if the currently active language is one of the
  // extra ones, so the checkmark is never hidden behind a collapsed row.
  const [extraOpen, setExtraOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (open && isGoogleTranslated) setExtraOpen(true);
  }, [open, isGoogleTranslated]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = coreLanguages.find((l) => l.code === lang)
    || extraLanguages.find((l) => l.code === lang)
    || coreLanguages[0];

  const pick = (code) => {
    setOpen(false);
    setExtraOpen(false);
    if (code !== lang) setLang(code);
  };

  return (
    <div className="mm-lang notranslate" ref={rootRef}>
      <button
        type="button"
        className="mm-lang-trigger"
        onClick={() => setOpen((v) => !v)}
        title={t("lang.choose")}
        aria-expanded={open}
      >
        <Globe size={13} className="opacity-70" />
        <span>{active.flag || "🌐"}</span>
        <span className="mm-lang-name">{active.label}</span>
        <ChevronDown size={12} className={`mm-lang-chevron ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="mm-lang-menu">
          {coreLanguages.map((l) => (
            <button key={l.code} className="mm-lang-item" onClick={() => pick(l.code)}>
              <span className="mm-lang-flag">{l.flag}</span>
              <span>{l.label}</span>
              {l.code === lang && !isGoogleTranslated && <Check size={13} className="mm-lang-check" />}
            </button>
          ))}

          <div className="mm-lang-divider" />

          {!extraOpen ? (
            <button
              type="button"
              className="mm-lang-item mm-lang-more"
              onClick={() => setExtraOpen(true)}
            >
              <span className="mm-lang-flag"><Globe size={13} /></span>
              <span>+{extraLanguages.length} {t("lang.otherLanguages")}</span>
              <ChevronRight size={12} className="mm-lang-more-arrow" />
            </button>
          ) : (
            <>
              <div className="mm-lang-group-label">{t("lang.otherLanguages")}</div>
              <div className="mm-lang-extra-list">
                {extraLanguages.map((l) => (
                  <button key={l.code} className="mm-lang-item" onClick={() => pick(l.code)}>
                    <span className="mm-lang-flag">{l.flag}</span>
                    <span>{l.label}</span>
                    {l.code === lang && isGoogleTranslated && <Check size={13} className="mm-lang-check" />}
                  </button>
                ))}
              </div>
              <div className="mm-lang-powered">{t("lang.poweredByGoogle")}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
