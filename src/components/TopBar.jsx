import { useRef } from "react";
import { Moon, Sun, ChevronLeft, ChevronRight, Settings, Menu } from "lucide-react";
import FxPanel from "./FxPanel.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function TopBar({
  onToggleSidebar, sidebarCollapsed,
  onBack, canGoBack,
  onForward, canGoForward,
  showFxPanel, onToggleFxPanel, onCloseFxPanel, fx, setFx,
  theme, onToggleTheme,
}) {
  const { t, dir } = useLanguage();
  const fxBtnRef = useRef(null);
  const isRtl = dir === "rtl";
  return (
    <header className="mm-topbar flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
      <div className="flex items-center gap-2">
        <button
          className="mm-icon-btn mm-hamburger"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? t("topbar.showSidebar") : t("topbar.hideSidebar")}
        >
          <Menu size={15} />
        </button>
        <button onClick={onBack} disabled={!canGoBack} className="mm-icon-btn" title={t("topbar.back")}>
          {isRtl ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
        <button onClick={onForward} disabled={!canGoForward} className="mm-icon-btn" title={t("topbar.forward")}>
          {isRtl ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
        </button>
      </div>
      <div className="relative flex gap-2">
        <button ref={fxBtnRef} className="mm-icon-btn" onClick={onToggleFxPanel} title={t("topbar.fx")}>
          <Settings size={15} />
        </button>
        <button className="mm-icon-btn mm-theme-toggle" onClick={onToggleTheme} title={t("topbar.theme")}>
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        {showFxPanel && <FxPanel fx={fx} setFx={setFx} onClose={onCloseFxPanel} anchorRef={fxBtnRef} />}
      </div>
    </header>
  );
}
