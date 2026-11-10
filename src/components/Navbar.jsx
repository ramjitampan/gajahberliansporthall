import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Menu, Moon, Sun, X, User, LogOut, Shield, LogIn } from "lucide-react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../i18n/I18nContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { lang, toggleLang, t } = useTranslation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    setOpen(false);
    setUserDropdown(false);
  }, [location.pathname, location.hash]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const glassOnScroll = scrolled && !open;
  const navClass = ({ isActive }) =>
    `border-b py-2 text-[11px] font-bold uppercase tracking-[.12em] transition ${
      isActive
        ? "border-sage text-cream"
        : "border-transparent text-cream/65 hover:text-cream"
    }`;

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  const firstName = user?.name ? user.name.trim().split(" ")[0] : "";

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
      <div className="mx-auto flex h-18 w-[min(1280px,calc(100%-36px))] items-center justify-between md:h-20">
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

        {/* ACTIONS: THEME, LANG, & AUTH */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {/* Admin Portal Shortcut if Admin */}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-lg border border-[#c8ae78]/60 bg-[#c8ae78]/15 px-3 py-1.5 text-[11px] font-bold text-[#f7e7c4] transition hover:bg-[#c8ae78]/25"
            >
              <Shield size={13} className="text-[#c8ae78]" />
              <span>{t("nav.adminPortal")}</span>
            </Link>
          )}

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("nav.toggleLang")}
            title={t("nav.toggleLang")}
            className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold text-cream transition hover:border-white/40 hover:bg-white/10"
          >
            <Globe size={13} className="text-sage" />
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
              <Sun size={16} className="text-champagne transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={16} className="text-sage transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* USER PROFILE OR AUTH BUTTONS */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 rounded-lg border border-sage/40 bg-sage/10 px-3 py-1.5 text-xs font-semibold text-cream transition hover:border-sage hover:bg-sage/20"
                aria-expanded={userDropdown}
              >
                <span className="grid size-5.5 place-items-center rounded-full bg-emerald-soft text-[10px] font-black text-[#102a22]">
                  {firstName.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate">{firstName}</span>
              </button>

              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-white/15 bg-[#102a22] p-2 text-xs shadow-2xl backdrop-blur-xl dark:bg-[#0c1c17]"
                  >
                    <div className="border-b border-white/10 px-3 py-2">
                      <p className="font-bold text-cream truncate">{user?.name}</p>
                      <p className="text-[10px] text-cream/50 truncate">{user?.email}</p>
                      <span className="mt-1 inline-block rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sage">
                        {user?.role}
                      </span>
                    </div>

                    <Link
                      to="/booking/riwayat"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-cream/80 hover:bg-white/10 hover:text-cream"
                      onClick={() => setUserDropdown(false)}
                    >
                      <User size={14} />
                      <span>{t("nav.myBookings")}</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-[#e2d2a9] hover:bg-[#c8ae78]/15"
                        onClick={() => setUserDropdown(false)}
                      >
                        <Shield size={14} className="text-[#c8ae78]" />
                        <span>{t("nav.adminPortal")}</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md border-t border-white/10 px-3 py-2 text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut size={14} />
                      <span>{t("nav.logout")}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-xs font-semibold text-cream transition hover:border-white/40 hover:bg-white/5"
              >
                <LogIn size={13} />
                <span>{t("nav.login")}</span>
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-emerald px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-soft dark:bg-sage dark:text-[#102a22]"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
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
            className="absolute inset-x-0 top-full max-h-[calc(100vh-80px)] overflow-y-auto border-b border-white/10 bg-[#102a22] px-5 py-4 shadow-xl dark:bg-[#0c1c17] lg:hidden"
            aria-label="Navigasi mobile"
          >
            {/* User status card on mobile */}
            {isAuthenticated ? (
              <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-cream">{user?.name}</p>
                    <p className="text-[11px] text-cream/60">{user?.email}</p>
                  </div>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-sage">
                    {user?.role}
                  </span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="mt-2.5 flex items-center justify-center gap-1.5 rounded bg-[#c8ae78]/20 py-1.5 text-xs font-bold text-[#f7e7c4]"
                  >
                    <Shield size={13} className="text-[#c8ae78]" />
                    <span>{t("nav.adminPortal")}</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="mb-4 grid grid-cols-2 gap-2 border-b border-white/10 pb-4">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 py-2.5 text-xs font-bold text-cream"
                >
                  <LogIn size={14} />
                  <span>{t("nav.login")}</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-emerald py-2.5 text-xs font-bold text-white dark:bg-sage dark:text-[#102a22]"
                >
                  <span>{t("nav.register")}</span>
                </Link>
              </div>
            )}

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

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-between py-3 text-xs font-bold uppercase tracking-[.12em] text-red-300"
              >
                <span>{t("nav.logout")}</span>
                <LogOut size={14} />
              </button>
            )}

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
