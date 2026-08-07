import { Disc3, X, Home, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

export default function Sidebar({ page, sections, onNavigate, onHeart, mobileNavOpen, onCloseMobileNav, collapsed }) {
  const { t } = useLanguage();
  return (
    <aside
      className={`mm-sidebar flex w-60 shrink-0 flex-col justify-between px-6 py-7 ${mobileNavOpen ? "mm-sidebar-open" : ""}`}
      style={collapsed ? { width: 0, minWidth: 0, padding: 0, opacity: 0, borderRightWidth: 0, pointerEvents: "none" } : undefined}
    >
      <div>
        <div className="mb-8 flex items-center gap-2.5">
          <div className="mm-logo-badge flex h-8 w-8 items-center justify-center rounded-full">
            <Disc3 size={17} strokeWidth={2.2} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Zoe Library</span>
          <span className="mm-cv01" title="Character Vocal Series 01 ✨">CV01</span>
          <button className="mm-sidebar-close" onClick={onCloseMobileNav} title={t("sidebar.closeMenu")}>
            <X size={16} />
          </button>
        </div>

        <nav className="mb-8 flex flex-col gap-1">
          <button onClick={() => onNavigate("home")} className={`mm-nav-item ${page === "home" ? "active" : ""}`}>
            <Home size={15} /> <span>{t("nav.home")}</span>
          </button>
        </nav>

        <h3 className="mm-eyebrow mb-2">{t("nav.collection")}</h3>
        <nav className="mb-8 flex flex-col gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={(e) => { onNavigate(s.id); if (s.id === "favorite-songs") onHeart?.(e); }}
              className={`mm-nav-item ${page === s.id ? "active" : ""}`}
            >
              <s.icon size={15} /> <span>{s.title}</span>
            </button>
          ))}
        </nav>

        {page === "home" && (
          <div className="mb-6 animate-fadeUp">
            <h3 className="mm-eyebrow mb-2">{t("nav.quickLinks")}</h3>
            <a href="#featured" className="mm-link"><Star size={13} /> <span>{t("nav.featured")}</span></a>
            <a href="#stats" className="mm-link"><TrendingUp size={13} /> <span>{t("nav.stats")}</span></a>
          </div>
        )}

        <LanguageSwitcher />
      </div>

      <div className="mm-sidebar-footer pt-4">
        <div className="flex items-center gap-3">
          <div className="mm-avatar">
            <span>ZK</span>
            <img
              src="/assets/profile.jpg"
              alt="Zoe曇りー"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium">Zoe曇りー</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
