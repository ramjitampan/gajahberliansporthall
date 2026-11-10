import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Globe, History, LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../i18n/I18nContext";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, lang, toggleLang } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const reduceMotion = useReducedMotion();

  const links = [
    { to: "/admin", end: true, label: t("admin.navDashboard"), number: "01", icon: LayoutDashboard },
    { to: "/admin/history", label: t("admin.navHistory"), number: "02", icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f2eb] font-sans text-ink dark:bg-[#0b1512] dark:text-cream">
      <header className="bg-[#102a22] text-[#f7f3ea]">
        <div className="mx-auto flex min-h-[78px] w-[min(1400px,calc(100%-32px))] items-center justify-between gap-5 md:min-h-[90px] md:w-[min(1400px,calc(100%-64px))]">
          <Link to="/admin" className="group inline-flex min-w-0 items-center gap-3.5" aria-label={t("admin.brand")}>
            <span className="grid size-10 shrink-0 place-items-center border border-[#c8ae78]/70 text-[13px] font-black tracking-[-.12em] text-[#dcc898] transition-colors group-hover:bg-[#c8ae78]/10">GB</span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold tracking-[-.035em] md:text-base">Gajah Berlian <span className="font-normal text-white/60">Sport Hall</span></span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-white/45">{t("admin.brandSub")}</span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            {/* Admin identity pill */}
            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-left sm:flex">
              <span className="grid size-6 place-items-center rounded-full bg-[#c8ae78] text-[10px] font-black text-[#102a22]">
                A
              </span>
              <div className="leading-tight">
                <span className="block text-[11px] font-bold text-white max-w-[120px] truncate">{user?.name || "Admin"}</span>
                <span className="block text-[9px] text-white/50">{user?.role}</span>
              </div>
            </div>

            <button type="button" onClick={toggleLang} aria-label={t("admin.toggleLanguage")} title={t("admin.toggleLanguage")} className="inline-flex min-h-10 items-center gap-2 border border-white/20 px-2.5 text-[10px] font-bold text-white/85 transition hover:border-[#c8ae78]/70 hover:text-[#e2d2a9] md:px-3"><Globe size={14} className="text-[#c8ae78]" />{lang.toUpperCase()}</button>
            <button type="button" onClick={toggleTheme} aria-label={isDark ? t("admin.lightTheme") : t("admin.darkTheme")} title={isDark ? t("admin.lightTheme") : t("admin.darkTheme")} className="grid size-10 place-items-center border border-white/20 text-white/85 transition hover:border-[#c8ae78]/70 hover:text-[#e2d2a9]">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
            <Link to="/" className="hidden min-h-10 items-center gap-2 border border-white/20 px-3 text-[11px] font-semibold text-white/75 transition hover:border-white/50 hover:text-white sm:inline-flex">{t("admin.customerSite")}<ArrowUpRight size={13} /></Link>
            <button
              type="button"
              onClick={handleLogout}
              title={t("nav.logout")}
              aria-label={t("nav.logout")}
              className="grid size-10 place-items-center border border-red-500/30 text-red-300 transition hover:bg-red-500/10 hover:border-red-400"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/10">
          <nav aria-label={t("admin.navigation")} className="mx-auto flex w-[min(1400px,calc(100%-32px))] gap-1 md:w-[min(1400px,calc(100%-64px))]">
            {links.map(({ to, end, label, number, icon: Icon }) => (
              <NavLink key={to} to={to} end={end}>
                {({ isActive }) => (
                  <span className={`relative flex min-h-[54px] min-w-0 flex-1 items-center gap-2.5 px-3 text-xs font-semibold transition-colors sm:flex-none sm:gap-3 sm:px-5 md:min-h-[60px] ${isActive ? "text-white" : "text-white/55 hover:text-white/85"}`}>
                    <span className={`hidden text-[9px] font-bold tracking-[.13em] sm:block ${isActive ? "text-[#c8ae78]" : "text-white/30"}`}>{number}</span>
                    <Icon size={15} aria-hidden="true" className={isActive ? "text-[#d8c38f]" : "text-white/45"} />
                    <span className="truncate">{label}</span>
                    {isActive && <motion.span layoutId="admin-nav-marker" className="absolute inset-x-3 bottom-0 h-[2px] bg-[#c8ae78] sm:inset-x-5" transition={{ duration: reduceMotion ? 0 : .18 }} />}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-152px)] w-[min(1400px,calc(100%-32px))] pb-14 pt-7 md:w-[min(1400px,calc(100%-64px))] md:pb-20 md:pt-10">
        <div className="mb-7 flex items-start gap-3 border-l-2 border-[#b49a65] py-1 pl-3.5 text-[11px] leading-5 text-muted dark:text-cream/55 md:mb-9"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#b49a65]" />{t("admin.accessNote")}</div>
        <motion.div key={pathname} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .22, ease: "easeOut" }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
