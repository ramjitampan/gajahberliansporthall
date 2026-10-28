import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../i18n/I18nContext";

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const { lang, toggleLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/booking", label: t("nav.booking"), end: true },
    { to: "/tentang", label: t("nav.about") },
    { to: "/daftar-harga", label: t("nav.pricing") },
    { to: "/fasilitas", label: t("nav.facilities") },
    { to: "/lokasi", label: t("nav.location") },
    { to: "/booking/riwayat", label: t("nav.history") },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const glassOnScroll = scrolled && !open;
  const navClass = ({ isActive }) =>
    `border-b py-2 text-[11px] font-bold uppercase tracking-[.12em] transition ${
      isActive
        ? "border-sage text-cream"
        : "border-transparent text-cream/65 hover:text-cream"
    }`;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b text-cream transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out ${
        glassOnScroll
          ? "border-white/20 bg-[#102a22]/85 shadow-[0_5px_22px_rgba(10,24,19,.18)] backdrop-blur-xl dark:bg-[#091914]/90 dark:border-white/10"
          : "border-white/10 bg-[#102a22] shadow-[0_5px_22px_rgba(10,24,19,.18)] dark:bg-[#0b1c17]"
      }`}
      animate={{
        backgroundColor: glassOnScroll
          ? isDark
            ? "rgba(9,25,20,0.88)"
            : "rgba(16,42,34,0.85)"
          : isDark
          ? "rgba(11,28,23,1)"
          : "rgba(16,42,34,1)",
      }}
    >
      <div className="mx-auto flex h-18 w-[min(1240px,calc(100%-36px))] items-center justify-between md:h-20">
        <NavLink to="/" aria-label="GajahBerlianSportsHall Beranda" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg border border-champagne/65 font-display text-lg text-champagne">
            B
          </span>
          <span className="text-[17px] font-extrabold tracking-[-.05em]">
            GajahBerlianSportsHall
          </span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Navigasi utama">
          {items.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS: THEME & LANG SWITCHER */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("nav.toggleLang")}
            title={t("nav.toggleLang")}
            className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold text-cream transition hover:border-white/40 hover:bg-white/10"
          >
            <Globe size={14} className="text-sage" />
            <span className={lang === "id" ? "text-champagne font-extrabold" : "text-cream/50"}>ID</span>
            <span className="text-white/30">/</span>
            <span className={lang === "en" ? "text-champagne font-extrabold" : "text-cream/50"}>EN</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
            title={isDark ? t("nav.lightMode") : t("nav.darkMode")}
            className="grid size-9 place-items-center rounded-lg border border-white/20 bg-white/5 text-cream transition hover:border-white/40 hover:bg-white/10"
          >
            {isDark ? (
              <Sun size={17} className="text-champagne transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={17} className="text-sage transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
            className="grid size-10 place-items-center rounded-lg border border-white/20 text-cream"
          >
            {isDark ? <Sun size={18} className="text-champagne" /> : <Moon size={18} className="text-sage" />}
          </button>

          <button
            type="button"
            aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-lg border border-white/20 text-cream"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full border-b border-white/10 bg-[#102a22] px-5 py-3 shadow-xl dark:bg-[#0c1c17] lg:hidden"
            aria-label="Navigasi mobile"
          >
            {items.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-white/10 py-3.5 text-xs font-bold uppercase tracking-[.12em] last:border-0 ${
                    isActive ? "text-sage" : "text-cream/70"
                  }`
                }
              >
                <span>{label}</span>
                <ArrowUpRight size={14} />
              </NavLink>
            ))}

            {/* Mobile Language Switcher Row */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4 pb-2">
              <span className="text-xs uppercase tracking-wider text-cream/60">
                {t("nav.toggleLang")}
              </span>
              <button
                type="button"
                onClick={toggleLang}
                className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-cream"
              >
                <Globe size={14} className="text-sage" />
                <span className={lang === "id" ? "text-champagne font-extrabold" : "text-cream/50"}>ID</span>
                <span className="text-white/30">/</span>
                <span className={lang === "en" ? "text-champagne font-extrabold" : "text-cream/50"}>EN</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
