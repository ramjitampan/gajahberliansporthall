import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe, Home, Moon, RefreshCw, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../i18n/I18nContext";

const definitions = {
  "404": { key: "notFound", code: "404", actions: ["home", "back"] },
  "403": { key: "forbidden", code: "403", actions: ["home"] },
  "500": { key: "serverError", code: "500", actions: ["retry", "home"] },
  "502": { key: "badGateway", code: "502", actions: ["retry", "home"] },
  "503": { key: "unavailable", code: "503", actions: ["retry", "home"] },
  "504": { key: "timeout", code: "504", actions: ["retry", "home"] },
  offline: { key: "offline", code: "—", actions: ["retryConnection", "home"] },
  runtime: { key: "runtime", code: "!", actions: ["reload", "home"] },
};

export default function ErrorExperience({ type = "404", embedded = false, onRetry }) {
  const definition = definitions[type] || definitions.runtime;
  const { t, lang, toggleLang } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [retrying, setRetrying] = useState(false);
  const [retryStatus, setRetryStatus] = useState("");
  const text = (key) => t(`errors.${definition.key}.${key}`);

  const retry = async () => {
    if (onRetry) onRetry();
    else if (type === "offline") {
      setRetrying(true);
      setRetryStatus("");
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(window.location.href, { method: "HEAD", cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Current page could not be reached");
        setRetryStatus("online");
      } catch {
        setRetryStatus("offline");
      } finally {
        window.clearTimeout(timeout);
        setRetrying(false);
      }
    } else window.location.reload();
  };

  const renderAction = (action, index) => {
    const labels = {
      home: t("errors.actions.home"),
      back: t("errors.actions.back"),
      retry: t("errors.actions.retry"),
      retryConnection: t("errors.actions.retryConnection"),
      reload: t("errors.actions.reload"),
    };
    const primary = index === 0;
    const className = `inline-flex min-h-12 items-center justify-center gap-2.5 px-5 text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#b49a65] ${primary ? "bg-[#123d32] text-white hover:bg-[#1d5b47] dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c1d1ba]" : "border border-[#cfcabd] text-ink hover:border-[#123d32] dark:border-white/20 dark:text-cream dark:hover:border-sage"}`;
    if (action === "home") return <Link key={action} to="/" className={className}><Home size={15} />{labels[action]}</Link>;
    if (action === "back") return <button key={action} type="button" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")} className={className}><ArrowLeft size={15} />{labels[action]}</button>;
    return <button key={action} type="button" onClick={retry} disabled={action === "retryConnection" && retrying} className={`${className} disabled:cursor-wait disabled:opacity-60`}>{action === "retry" || action === "retryConnection" ? <RefreshCw size={15} className={action === "retryConnection" && retrying ? "animate-spin" : ""} /> : <ArrowRight size={15} />}{action === "retryConnection" && retrying ? t("network.checking") : labels[action]}</button>;
  };

  return (
    <div className={embedded ? "w-full" : "min-h-screen bg-[#f4f2eb] font-sans text-ink dark:bg-[#0b1512] dark:text-cream"}>
      {!embedded && <header className="bg-[#102a22] text-[#f7f3ea]">
        <div className="mx-auto flex min-h-[76px] w-[min(1280px,calc(100%-32px))] items-center justify-between gap-4 md:min-h-[88px] md:w-[min(1280px,calc(100%-64px))]">
          <Link to="/" className="inline-flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center border border-[#c8ae78]/70 text-[13px] font-black tracking-[-.12em] text-[#dcc898]">GB</span><span className="truncate text-sm font-bold tracking-[-.03em]">Gajah Berlian <span className="font-normal text-white/60">Sport Hall</span></span></Link>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={toggleLang} aria-label={t("errors.accessibility.changeLanguage")} className="inline-flex min-h-10 items-center gap-2 border border-white/20 px-2.5 text-[10px] font-bold text-white/85 transition hover:border-[#c8ae78]/70 hover:text-[#e2d2a9]"><Globe size={14} className="text-[#c8ae78]" />{lang.toUpperCase()}</button>
            <button type="button" onClick={toggleTheme} aria-label={isDark ? t("errors.accessibility.lightTheme") : t("errors.accessibility.darkTheme")} className="grid size-10 place-items-center border border-white/20 text-white/85 transition hover:border-[#c8ae78]/70 hover:text-[#e2d2a9]">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </div>
      </header>}

      <main className={`mx-auto w-[min(1280px,calc(100%-32px))] ${embedded ? "py-10 md:w-[min(1060px,calc(100%-48px))] md:py-16" : "py-10 md:w-[min(1280px,calc(100%-64px))] md:py-16"}`}>
        <motion.article initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .25, ease: "easeOut" }} className="grid overflow-hidden border-y border-[#cfcabd] bg-[#fffefa] dark:border-white/15 dark:bg-[#111f19] lg:grid-cols-[1fr_.82fr]">
          <section className="flex min-h-[390px] flex-col justify-center px-5 py-10 sm:px-9 md:min-h-[470px] md:px-14 md:py-14">
            <p className="mb-5 flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage"><span className="text-[#aa905d]">GB /</span><span className="h-px w-7 bg-[#b49a65]" />{text("eyebrow")}</p>
            <h1 className="max-w-xl font-sans text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[.94] tracking-[-.075em] text-ink dark:text-cream">{text("title")}</h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted dark:text-cream/65 md:text-[15px] md:leading-7">{text("description")}</p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">{definition.actions.map(renderAction)}</div>
            {retryStatus && <p className="mt-4 max-w-lg text-xs leading-5 text-muted dark:text-cream/55" role="status">{retryStatus === "online" ? t("network.reconnectedCopy") : t("network.retryFailed")}</p>}
          </section>

          <aside className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#102a22] p-6 text-[#f7f3ea] sm:p-9 lg:min-h-[470px] lg:p-11">
            <div className="flex items-start justify-between gap-4"><span className="text-[9px] font-bold uppercase tracking-[.2em] text-white/50">{t("errors.visualLabel")}</span><span className="border border-white/20 px-2 py-1 text-[9px] font-bold tracking-[.12em] text-[#d8c38f]">{definition.code}</span></div>
            <CourtIllustration type={type} reduceMotion={reduceMotion} label={t("errors.accessibility.visualDescription")} />
            <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4"><p className="max-w-[220px] text-[10px] leading-5 text-white/55">{text("recovery")}</p><ArrowUpRight size={16} className="shrink-0 text-[#c8ae78]" /></div>
          </aside>
        </motion.article>
      </main>
    </div>
  );
}

function CourtIllustration({ type, reduceMotion, label }) {
  const subdued = type === "503";
  const line = subdued ? "#a9915f" : "#c8ae78";
  const animatePath = reduceMotion ? false : { pathLength: 1 };
  const trailTransition = { duration: 0.85, ease: "easeOut" };

  return (
    <svg
      role="img"
      aria-label={label}
      focusable="false"
      viewBox="0 0 500 368"
      preserveAspectRatio="xMidYMid meet"
      className="mx-auto my-5 block h-auto w-full max-w-[410px] overflow-visible"
    >
      <defs>
        <linearGradient id="court-surface" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#183a2e" />
          <stop offset="100%" stopColor="#102a22" />
        </linearGradient>
        <radialGradient id="court-light" cx="50%" cy="46%" r="68%">
          <stop offset="0%" stopColor="#c8ae78" stopOpacity=".11" />
          <stop offset="100%" stopColor="#c8ae78" stopOpacity="0" />
        </radialGradient>
        <filter id="court-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <ellipse cx="250" cy="194" rx="204" ry="126" fill="url(#court-light)" />
      <path d="M145 53 355 53 462 302 38 302Z" fill="#020b08" opacity=".28" filter="url(#court-shadow)" transform="translate(0 7)" />
      <path d="M145 53 355 53 462 302 38 302Z" fill="url(#court-surface)" stroke={line} strokeOpacity={subdued ? ".4" : ".72"} strokeWidth="1.5" />

      <g
        key={type}
        fill="none"
        stroke={line}
        strokeLinecap="square"
        strokeLinejoin="round"
        opacity={subdued ? ".48" : ".82"}
      >
        {/* outer limits and singles sidelines */}
        <path d="M145 53 38 302M355 53 462 302" strokeOpacity=".86" strokeWidth="1.4" />
        <path d="M174 53 91 302M326 53 409 302" strokeOpacity=".48" strokeWidth=".9" />

        {/* short service lines, doubles long service lines and centre marks */}
        <path d="M123 104H377M67 270H433" strokeOpacity=".52" strokeWidth=".95" />
        <path d="M250 53V104M250 270V302" strokeOpacity=".5" strokeWidth=".85" />
        <path d="M145 53H355M38 302H462" strokeOpacity=".8" strokeWidth="1.45" />

        {/* net and posts: 502 deliberately breaks the connection at centre */}
        {type === "502" ? (
          <>
            <path d="M96 177H226M274 177H404" strokeWidth="1.55" />
            <path d="M226 171V183M274 171V183" strokeOpacity=".6" strokeWidth="1" />
            <circle cx="226" cy="177" r="2.2" fill={line} stroke="none" />
            <circle cx="274" cy="177" r="2.2" fill={line} stroke="none" />
          </>
        ) : (
          <path d="M96 177H404" strokeWidth="1.55" />
        )}
        <path d="M96 168V186M404 168V186" strokeOpacity=".72" strokeWidth="1" />

        {/* fine net cords */}
        {type !== "502" && <path d="M124 174H376M155 171H345M187 168H313" strokeOpacity=".16" strokeWidth=".55" />}

        {/* 403: a restrained closed boundary across the court */}
        {type === "403" && <g stroke="#d8c38f" strokeOpacity=".9"><path d="M186 177H314M188 169V185M312 169V185" strokeWidth="1.5" /><path d="M198 171 205 183M218 171 225 183M238 171 245 183M258 171 265 183M278 171 285 183" strokeOpacity=".55" strokeWidth=".75" /></g>}

        {/* 500/runtime: a tiny misregistration at the court centre */}
        {type === "500" && <g stroke="#e0cc98" strokeOpacity=".95"><path d="M239 177H247L251 173 255 181 260 177H268" strokeWidth="1.45" /><path d="M250 169V162M250 192V185" strokeOpacity=".58" strokeWidth=".8" /></g>}
        {type === "runtime" && <g stroke="#e0cc98" strokeOpacity=".88"><circle cx="250" cy="177" r="15" strokeDasharray="2 4" strokeWidth=".9" /><path d="M241 177H247M254 177H260" strokeWidth="1.4" /><circle cx="250" cy="177" r="2" fill="#e0cc98" stroke="none" /></g>}

        {/* 404/504: a shuttle trajectory that stops short of its target */}
        {type === "404" && <g stroke="#e0cc98"><motion.path d="M119 247C147 226 169 215 196 207" initial={reduceMotion ? false : { pathLength: 0 }} animate={animatePath} transition={trailTransition} strokeOpacity=".82" strokeWidth="1.25" strokeDasharray="3 5" /><circle cx="196" cy="207" r="3" fill="#e0cc98" stroke="none" /><circle cx="375" cy="105" r="4" strokeOpacity=".45" strokeWidth=".9" /></g>}
        {type === "504" && <g stroke="#e0cc98"><motion.path d="M119 247C168 210 219 184 288 153" initial={reduceMotion ? false : { pathLength: 0 }} animate={animatePath} transition={trailTransition} strokeOpacity=".82" strokeWidth="1.25" strokeDasharray="3 5" /><circle cx="288" cy="153" r="3" fill="#e0cc98" stroke="none" /><circle cx="375" cy="105" r="4" strokeOpacity=".45" strokeWidth=".9" /></g>}

        {/* Offline: separated signal points with a broken link */}
        {type === "offline" && <g stroke="#e0cc98"><path d="M155 222H220M280 222H345" strokeOpacity=".75" strokeWidth="1.1" strokeDasharray="3 5" /><circle cx="145" cy="222" r="5" fill="#102a22" strokeWidth="1.4" /><circle cx="355" cy="222" r="5" fill="#102a22" strokeWidth="1.4" /><path d="M238 217 246 227M254 217 262 227" strokeOpacity=".75" strokeWidth="1" /></g>}
      </g>
    </svg>
  );
}
