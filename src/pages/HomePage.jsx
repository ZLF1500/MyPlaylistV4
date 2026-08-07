import { Heart, ListMusic, User, TrendingUp, Crown, Flame, Sparkles, Play, Star } from "lucide-react";
import ElectricBorder from "../effects/ElectricBorder.jsx";
import Equalizer from "../components/Equalizer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function HomePage({ T, onNavigate, fx, onHeart }) {
  const { t } = useLanguage();

  const stats = [
    { icon: ListMusic, num: "2", label: t("home.stats.playlist"), c: "accent" },
    { icon: User, num: "2", label: t("home.stats.artists"), c: "accent2" },
    { icon: TrendingUp, num: "4", label: t("home.stats.topChart"), c: "berry" },
    { icon: Heart, num: "28", label: t("home.stats.favSongs"), c: "accent" },
  ];
  const featured = [
    { icon: Flame, title: t("home.featured.topHits.title"), desc: t("home.featured.topHits.desc"), c: "accent", img: "cover-top-hits.jpg", page: "playlist-hub", filterTag: "top", key: "topHits" },
    { icon: Heart, title: t("home.featured.myFavorites.title"), desc: t("home.featured.myFavorites.desc"), c: "berry", img: "cover-favorit-saya.jpg", page: "favorite-songs", filterTag: null, key: "myFavorites" },
    { icon: Sparkles, title: t("home.featured.vocaloidVibes.title"), desc: t("home.featured.vocaloidVibes.desc"), c: "accent2", img: "cover-vocaloid-vibes.jpg", page: "playlist-hub", filterTag: "dailymix", key: "vocaloidVibes" },
  ];
  const colorVar = { accent: "var(--accent)", accent2: "var(--accent2)", berry: "var(--berry)" };
  return (
    <>
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-16 sm:pb-24">
        {fx?.equalizer && <Equalizer />}
        <div className="relative max-w-2xl animate-fadeUp">
          <div className="mm-badge mb-5">
            <Crown size={12} /> <span>{t("home.badge")}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-semibold italic leading-[1.12] tracking-tight">
            {t("home.titleLine1")}<br />{t("home.titleLine2")}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed mm-muted">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => onNavigate("favorite-songs")} className="mm-btn-primary">
              <Play size={12} /> {t("home.exploreBtn")}
            </button>
            <a href="#featured" className="mm-btn-secondary">
              <Star size={12} /> {t("home.featuredBtn")}
            </a>
          </div>
        </div>
      </section>

      <section id="stats" className="grid grid-cols-2 gap-4 px-4 sm:px-6 md:px-10 pb-4 pt-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="mm-card p-5 mm-hover-lift" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={`mm-stat-icon mm-${s.c}-soft mb-3`}><s.icon size={15} /></div>
            <div className="font-display text-2xl font-semibold">{s.num}</div>
            <div className="text-xs mm-muted">{s.label}</div>
          </div>
        ))}
      </section>

      <section id="featured" className="px-4 sm:px-6 md:px-10 py-12">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold">{t("home.featuredTitle")}</h2>
          <p className="mt-1 text-sm mm-muted">{t("home.featuredSubtitle")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((f, i) => {
            const card = (
              <div
                className={`mm-featured-card mm-hover-lift mm-featured-${f.c}`}
                onClick={(e) => { onNavigate(f.page, f.filterTag); if (f.key === "myFavorites") onHeart?.(e); }}
              >
                <img
                  src={`/assets/${f.img}`}
                  alt=""
                  className="mm-featured-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="mm-featured-scrim" />
                <div className="mm-featured-icon"><f.icon size={15} /></div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm mm-muted">{f.desc}</p>
                <div className="mm-featured-play"><Play size={12} /></div>
              </div>
            );
            return fx?.electricBorder ? (
              <ElectricBorder key={f.key} color={colorVar[f.c]} radius={20} style={{ animationDelay: `${i * 60}ms` }}>
                {card}
              </ElectricBorder>
            ) : (
              <div key={f.key}>{card}</div>
            );
          })}
        </div>
      </section>
    </>
  );
}
